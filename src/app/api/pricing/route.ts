import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET: Fetch live pricing categories from Supabase
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_metrics")
      .select("page_counts, updated_at")
      .eq("date", "2099-01-01")
      .maybeSingle();

    if (error) {
      console.error("Error fetching pricing from Supabase:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const categories = data?.page_counts?.categories || null;

    return NextResponse.json(
      {
        success: true,
        categories,
        updated_at: data?.updated_at || null
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        }
      }
    );
  } catch (err: any) {
    console.error("Pricing API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Update live pricing categories in Supabase
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { categories, categoryKey, tierIndex, tierData } = body;

    // Fetch existing categories first
    const { data: existingRow } = await supabaseAdmin
      .from("site_metrics")
      .select("page_counts")
      .eq("date", "2099-01-01")
      .maybeSingle();

    let currentCategories = existingRow?.page_counts?.categories || {};

    if (categories && typeof categories === "object") {
      // Full categories object update
      currentCategories = { ...currentCategories, ...categories };
    } else if (categoryKey && typeof tierIndex === "number" && tierData) {
      // Single tier update within a category
      if (!currentCategories[categoryKey]) {
        currentCategories[categoryKey] = { tiers: [] };
      }
      if (!Array.isArray(currentCategories[categoryKey].tiers)) {
        currentCategories[categoryKey].tiers = [];
      }
      currentCategories[categoryKey].tiers[tierIndex] = {
        ...currentCategories[categoryKey].tiers[tierIndex],
        ...tierData
      };
    } else if (categoryKey && body.categoryData) {
      // Single category full object update
      currentCategories[categoryKey] = {
        ...currentCategories[categoryKey],
        ...body.categoryData
      };
    } else {
      return NextResponse.json({ success: false, error: "Invalid payload parameters" }, { status: 400 });
    }

    const payload = {
      date: "2099-01-01",
      total_views: 0,
      unique_visitors: 0,
      page_counts: { categories: currentCategories },
      top_page: "pricing_config",
      updated_at: new Date().toISOString()
    };

    const { error: upsertErr } = await supabaseAdmin
      .from("site_metrics")
      .upsert(payload, { onConflict: "date" });

    if (upsertErr) throw upsertErr;

    return NextResponse.json({
      success: true,
      message: "Pricing updated successfully",
      categories: currentCategories
    });
  } catch (err: any) {
    console.error("Pricing POST API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

