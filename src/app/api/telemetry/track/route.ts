import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Standard regional buckets matching business operations
function resolveGeoBucket(city: string, regionCode: string, country: string, clientTz: string): string {
  const normCity = (city || "").toLowerCase().trim();
  const normRegion = (regionCode || "").toLowerCase().trim();
  const normCountry = (country || "").toUpperCase().trim();

  // 1. Check International
  if (normCountry && normCountry !== "IN") {
    if (["AE", "SA", "QA", "OM"].includes(normCountry)) return "Gulf & Middle East";
    if (["US", "CA"].includes(normCountry)) return "North America";
    if (["GB", "DE", "FR", "NL"].includes(normCountry)) return "UK & Europe";
    return `International (${normCountry})`;
  }

  // 2. Northern Region & Delhi NCR
  if (
    normCity.includes("delhi") ||
    normCity.includes("noida") ||
    normCity.includes("gurgaon") ||
    normCity.includes("gurugram") ||
    normCity.includes("ghaziabad") ||
    normCity.includes("faridabad") ||
    normCity.includes("chandigarh") ||
    ["dl", "hr", "pb", "hp", "uk", "jk"].includes(normRegion)
  ) {
    return "Delhi NCR & Northern Region";
  }

  // 3. Maharashtra & Mumbai Metro
  if (
    normCity.includes("mumbai") ||
    normCity.includes("pune") ||
    normCity.includes("nagpur") ||
    normCity.includes("thane") ||
    normCity.includes("nashik") ||
    normRegion === "mh"
  ) {
    return "Maharashtra & Mumbai Metro";
  }

  // 4. Karnataka & Bengaluru Hub
  if (
    normCity.includes("bengaluru") ||
    normCity.includes("bangalore") ||
    normCity.includes("mysuru") ||
    normRegion === "ka"
  ) {
    return "Karnataka & Bengaluru Hub";
  }

  // 5. Central India (MP, UP, Rajasthan)
  if (
    normCity.includes("indore") ||
    normCity.includes("bhopal") ||
    normCity.includes("jaipur") ||
    normCity.includes("lucknow") ||
    normCity.includes("kanpur") ||
    normCity.includes("agra") ||
    ["mp", "up", "rj"].includes(normRegion)
  ) {
    return "Central India (MP, UP, Rajasthan)";
  }

  // 6. Gujarat & Western Region
  if (
    normCity.includes("ahmedabad") ||
    normCity.includes("surat") ||
    normCity.includes("vadodara") ||
    normCity.includes("rajkot") ||
    normRegion === "gj"
  ) {
    return "Gujarat & Western Region";
  }

  // 7. Southern India (Telangana, Tamil Nadu, Kerala)
  if (
    normCity.includes("hyderabad") ||
    normCity.includes("chennai") ||
    normCity.includes("kochi") ||
    normCity.includes("coimbatore") ||
    ["tg", "ts", "tn", "kl", "ap"].includes(normRegion)
  ) {
    return "Southern India (Hyd, Chennai, Kochi)";
  }

  // 8. Eastern India (WB, Bihar, Odisha)
  if (
    normCity.includes("kolkata") ||
    normCity.includes("patna") ||
    normCity.includes("bhubaneswar") ||
    ["wb", "br", "or", "jh"].includes(normRegion)
  ) {
    return "Eastern India (Kolkata & Metro)";
  }

  // Fallback based on client timezone
  if (clientTz) {
    if (clientTz.includes("Calcutta") || clientTz.includes("Kolkata") || clientTz.includes("India")) {
      return "Delhi NCR & Northern Region";
    }
  }

  return "Delhi NCR & Northern Region";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawPath = body.path || "/";
    const cleanPath = rawPath === "" ? "/" : rawPath;
    const isNewSession = Boolean(body.isNewSession);
    const clientTz = body.timezone || "";

    // 1. Detect user geolocation from Edge / Proxy headers
    const city = req.headers.get("x-vercel-ip-city") || "";
    const regionCode = req.headers.get("x-vercel-ip-country-region") || "";
    const country = req.headers.get("x-vercel-ip-country") || "IN";
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";

    const geoBucket = resolveGeoBucket(city, regionCode, country, clientTz);
    const geoKey = `geo:${geoBucket}`;

    const today = new Date().toISOString().split("T")[0];

    // 2. Atomic lightweight fetch & update of today's single-row metrics
    const { data: current } = await supabaseAdmin
      .from("site_metrics")
      .select("*")
      .eq("date", today)
      .maybeSingle();

    if (current) {
      const pageCounts = (current.page_counts || {}) as Record<string, number>;
      pageCounts[cleanPath] = (pageCounts[cleanPath] || 0) + 1;
      pageCounts[geoKey] = (pageCounts[geoKey] || 0) + 1;

      // Determine top_page excluding geo markers
      let topPage = current.top_page || "/";
      let maxViews = 0;
      Object.entries(pageCounts).forEach(([k, v]) => {
        if (!k.startsWith("geo:") && v > maxViews) {
          maxViews = v;
          topPage = k;
        }
      });

      await supabaseAdmin
        .from("site_metrics")
        .update({
          total_views: (current.total_views || 0) + 1,
          unique_visitors: (current.unique_visitors || 0) + (isNewSession ? 1 : 0),
          page_counts: pageCounts,
          top_page: topPage,
          updated_at: new Date().toISOString(),
        })
        .eq("date", today);
    } else {
      await supabaseAdmin.from("site_metrics").insert({
        date: today,
        total_views: 1,
        unique_visitors: isNewSession ? 1 : 0,
        page_counts: {
          [cleanPath]: 1,
          [geoKey]: 1,
        },
        top_page: cleanPath,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      region: geoBucket,
      city: city || geoBucket.split(" ")[0],
      ip: ip.includes(":") ? "IPv6" : ip.split(".").slice(0, 2).join(".") + ".x.x",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Error";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}

