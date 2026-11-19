import { NextRequest, NextResponse } from "next/server";
import { proSupabaseAdmin } from "@/lib/proSupabase";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ── Gemini Key & Model Configuration ─────────────────────────────────────
let keyIndex = 0;

function getAllGeminiKeys(): string[] {
  const geminiKeysRaw =
    process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
  return geminiKeysRaw
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 20);
}

function getNextGeminiKey(keys: string[]): string | null {
  if (keys.length === 0) return null;
  const key = keys[keyIndex % keys.length];
  keyIndex++;
  return key;
}

const GEMINI_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

// ── Company Knowledge (baked-in context for the AI) ──────────────────────
const COMPANY_KNOWLEDGE = `
=== UVICON TECHNOLOGIES — OFFICIAL COMPANY PROFILE ===

IDENTITY:
- Company Name: Uvicon Technologies
- Legal Name: Uvicon Technologies Private Studio
- Founded: 2023
- Type: Premium Indian Software Engineering Studio
- AI Assistant Name: UVIC (you)

LOCATION & CONTACT:
- Head Office: Behind Climax Academy, Panna Naka, Chhatarpur, Madhya Pradesh (MP), India - 471001
- Service Coverage: Pan-India (Indore, Bhopal, Delhi, Mumbai, Bengaluru, Pune, Hyderabad, Jaipur) & International
- Phone & WhatsApp: +91 88890 07424
- Email: uvicontechnologies@gmail.com / info@uvicon.in
- Website: https://uvicon.in

TEAM:
- 25+ highly skilled software engineers, quant developers, and tech architects
- Specialized squads: Full-Stack Web, Mobile App, Quant & Algo, Cloud DevOps, UI/UX Design
- Sprint-based agile delivery with bi-weekly live demos

CORE SERVICES & PRICING:
1. Website Development (Next.js 15, React 19, Tailwind CSS):
   - Starter: ₹9,999 (3-7 days delivery)
   - Growth: ₹24,999
   - Enterprise: ₹49,999+
   
2. Mobile App Development (Flutter, Swift, Kotlin, React Native):
   - Starter MVP: ₹29,999 (3-5 weeks)
   - Growth: ₹59,999
   - Enterprise: ₹1,19,999
   
3. Algorithmic Trading Software (<0.1ms execution):
   - Brokers: Angel One, Zerodha Kite, Fyers, Dhan, Upstox, Finvasia, Alice Blue
   - Basic: ₹11,999 (30 Days)
   - Standard: ₹29,999 (90 Days)
   - Premium: ₹89,999 (365 Days)
   - Flagship Platform: Uvicon Pro (https://pro.uvicon.in)
   
4. Enterprise Software & CRM/ERP:
   - Custom modules starting ₹24,999
   - Hotel management, sales portals, business automation

5. AI Agents & Voice Assistants:
   - Custom AI chatbots, conversational voice systems, autonomous automation

ECOSYSTEM:
- Uvicon Pro (https://pro.uvicon.in) — Automated Algo Trading & Strategy Engine
- Uvicon Desk (https://desk.uvicon.in) — Central Operations & Admin Dashboard
- Uvicon Marketplace — Ready-made applications, scripts & algorithmic indicators

GUARANTEES:
- 100% Source Code & Intellectual Property (IP) ownership legally transferred under signed mutual NDA
- 90-Day Post-Launch SLA Warranty: proactive bug fixes, server monitoring & security updates at zero extra cost
- Sprint-based milestones with bi-weekly live staging demos for complete transparency

DELIVERY TIMELINES:
- Landing Page / Website: 3-7 days
- Web SaaS / Portal: 2-4 weeks
- Mobile App MVP: 3-5 weeks
- Custom Algo Strategy: 2-5 days
- Enterprise CRM/ERP: 4-8 weeks
`;

// ── Hinglish Detection ───────────────────────────────────────────────────
function isHindiOrHinglish(text: string): boolean {
  if (/[\u0900-\u097F]/.test(text)) return true;
  const lower = text.toLowerCase();
  const patterns = [
    /\b(kya|kaise|kaha|kahan|kidhar|kitna|kitne|kitni|kab|kyu|kyun|kaun|kis|kisko|kise|konsa|konsi)\b/i,
    /\b(tum|tumhara|tumhari|tumhare|aap|aapka|aapki|aapke|mera|meri|mere|hum|hamara|hamari|hamare|mujhe|hume|apna|apni|apne)\b/i,
    /\b(hai|he|ho|hu|hoon|hoga|hogi|honge|tha|thi|the|raha|rahi|rahe|sakte|sakta|sakti|karega|karegi|karenge)\b/i,
    /\b(batao|bataiye|bolo|boliye|puchha|pucha|pucho|karo|karna|karwana|bana|banwana|chahiye|dekhna|dena|chalta|doge|rakhoge|milega)\b/i,
    /\b(bhai|dost|sir|madam|namaste|pranam|shukriya|dhanyawad|accha|theek|thik|sahi|galat|arre|ji)\b/i,
    /\b(paisa|rupaye|kharcha|dam|daam|lagta|banega|hona|denge|loge|mein|pass|pehle|baad|sath)\b/i,
  ];
  return patterns.some((p) => p.test(lower));
}

// ── Build Gemini System Prompt ───────────────────────────────────────────
function buildSystemPrompt(
  knowledgeDocs: Array<{ title: string; content: string }>,
  isHindi: boolean,
  voiceMode: boolean
): string {
  let prompt = `You are UVIC, the official AI Copilot for Uvicon Technologies (https://uvicon.in).
You are a smart, friendly, and knowledgeable assistant who helps prospective clients, traders, and visitors.

CRITICAL RULES:
1. ALWAYS answer the user's SPECIFIC question directly. Do NOT give generic company overviews unless asked.
2. If asked about location → answer about location. If asked about employees → answer about employees. If asked about pricing → answer about pricing. NEVER mix up topics.
3. Keep answers concise (2-5 sentences for simple questions, more for detailed ones).
4. Be warm, professional, and conversational — not robotic.
5. Use the company knowledge below as your primary source, but you can also use your general AI knowledge to answer questions outside of company info.
6. If you don't know something specific about the company, say so honestly and suggest contacting the team.
7. At the end of relevant answers, you can suggest the user explore /pricing or contact +91 88890 07424 — but DON'T force it into every answer.

`;

  if (isHindi) {
    prompt += `LANGUAGE: The user is speaking in Hindi/Hinglish. Reply in natural, conversational Hinglish (Hindi written in English alphabet with common English tech terms). Keep it friendly like chatting with a friend. DO NOT use complex/shuddh Hindi.\n\n`;
  } else {
    prompt += `LANGUAGE: Reply in professional but friendly English.\n\n`;
  }

  if (voiceMode) {
    prompt += `VOICE MODE: You MUST respond with a JSON object containing exactly two keys:
- "display_text": The answer in Hinglish/English to show on screen
- "spoken_text": The SAME answer written in DEVANAGARI HINDI script (mixed with English technical terms) for TTS. Example: "नमस्ते! मैं UVIC हूँ।"
Do NOT include any text outside this JSON object.\n\n`;
  }

  prompt += COMPANY_KNOWLEDGE;

  if (knowledgeDocs.length > 0) {
    prompt += `\n\n=== ADDITIONAL KNOWLEDGE BASE (from Admin) ===\n`;
    for (const doc of knowledgeDocs) {
      prompt += `\n${doc.title}:\n${doc.content}\n`;
    }
  }

  return prompt;
}

// ── Fallback Intent Engine (used ONLY when Gemini is unavailable) ────────
function getFallbackResponse(
  cleanMsg: string,
  isHindi: boolean
): { reply: string; spokenText: string } {
  const lower = cleanMsg.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|namaste|pranam|hola|good\s*(morning|evening|afternoon)|kaise ho|kya haal)/i.test(lower)) {
    return isHindi
      ? {
          reply: "Namaste! 🙏 Mai UVIC hu — Uvicon Technologies ka official AI assistant. Aap kis service ke baare me janna chahte hai?",
          spokenText: "नमस्ते! मैं UVIC हूँ, युविकॉन टेक्नोलॉजीज का AI असिस्टेंट। मैं आपकी किस तरह मदद कर सकता हूँ?",
        }
      : {
          reply: "Hello! I am UVIC, the official AI Copilot at Uvicon Technologies. How can I assist you today?",
          spokenText: "Hello! I am UVIC, your AI assistant at Uvicon Technologies. How can I help you today?",
        };
  }

  // Location
  if (/\b(kaha|kahan|kidhar|location|address|headquarter|office|chhatarpur|panna naka)\b/i.test(lower)) {
    return isHindi
      ? {
          reply: "Uvicon Technologies ka head office **Panna Naka, Chhatarpur (Madhya Pradesh), India - 471001** me hai! 📍 Hum pure India aur internationally bhi serve karte hai. Direct call: **+91 88890 07424**",
          spokenText: "युविकॉन टेक्नोलॉजीज का हेड ऑफिस पन्ना नाका, छतरपुर, मध्य प्रदेश में है।",
        }
      : {
          reply: "Uvicon Technologies is headquartered at **Panna Naka, Chhatarpur, Madhya Pradesh (India) - 471001**. We serve clients across India and globally. Reach us at **+91 88890 07424**.",
          spokenText: "Uvicon Technologies is headquartered in Chhatarpur, Madhya Pradesh, India.",
        };
  }

  // Employees / Team
  if (/\b(employee|staff|team|kitne log|kitne member|developer|engineer)\b/i.test(lower)) {
    return isHindi
      ? {
          reply: "Uvicon Technologies me **25+ skilled engineers** ki team hai! Web, Mobile, Algo Trading, Cloud DevOps aur UI/UX design ke dedicated squads hai. 🚀",
          spokenText: "युविकॉन टेक्नोलॉजीज में 25 से अधिक स्किल्ड इंजीनियर्स की टीम है।",
        }
      : {
          reply: "Uvicon Technologies has a core team of **25+ skilled software architects, engineers, and designers** across web, mobile, algo trading, and cloud operations.",
          spokenText: "Uvicon Technologies has over 25 skilled software engineers and architects.",
        };
  }

  // Pricing
  if (/\b(price|pricing|cost|charge|rate|kitna|plan|fees|kharcha|paisa|budget)\b/i.test(lower)) {
    return isHindi
      ? {
          reply: "Hamari pricing: **Websites** ₹9,999 se | **Mobile Apps** ₹29,999 se | **Algo Trading** ₹11,999 se | **CRM/Enterprise** ₹24,999 se. Sabhi me 100% source code ownership + 90-day warranty! Details: uvicon.in/pricing",
          spokenText: "वेबसाइट 9,999 रुपये से, मोबाइल ऍप्स 29,999 रुपये से, और अल्गो ट्रेडिंग 11,999 रुपये से शुरू होता है।",
        }
      : {
          reply: "Our pricing: **Websites** from ₹9,999 | **Mobile Apps** from ₹29,999 | **Algo Trading** from ₹11,999 | **Enterprise/CRM** from ₹24,999. All include 100% IP ownership + 90-day SLA warranty. See uvicon.in/pricing",
          spokenText: "Website packages start at 9,999 rupees, mobile apps at 29,999 rupees, and algo trading at 11,999 rupees.",
        };
  }

  // Default fallback
  return isHindi
    ? {
        reply: `Aapke sawaal ke baare me — Uvicon Technologies custom Websites, Mobile Apps, Algo Trading Systems aur Enterprise Software banati hai. Zyada details ke liye aap hume **+91 88890 07424** par call/WhatsApp kar sakte hai ya uvicon.in/contact visit kar sakte hai!`,
        spokenText: "युविकॉन टेक्नोलॉजीज कस्टम वेबसाइट्स, मोबाइल ऍप्स और अल्गो ट्रेडिंग सिस्टम्स बनाती है। अधिक जानकारी के लिए 88890 07424 पर संपर्क करें।",
      }
    : {
        reply: `At Uvicon Technologies, we build custom Websites, Mobile Apps, Algo Trading Systems, and Enterprise Software. For more details, reach us at **+91 88890 07424** or visit uvicon.in/contact!`,
        spokenText: "Uvicon Technologies builds custom websites, mobile apps, and algo trading systems. Contact us at +91 88890 07424.",
      };
}

// ── Main API Handler ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId, voiceMode, history = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const cleanMsg = message.trim();
    const isHindi = isHindiOrHinglish(cleanMsg);

    // 1. Lead capture (Phone or Email detection)
    const phoneMatch = cleanMsg.match(/(?:\+91[\s-]?)?[6789]\d{9}/);
    const emailMatch = cleanMsg.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    if (phoneMatch || emailMatch) {
      try {
        const contactInfo = phoneMatch ? phoneMatch[0] : emailMatch![0];
        await supabaseAdmin.from("callback_requests").insert({
          contact_info: contactInfo,
          source_url: "uvicon.in/uvic-chat",
          status: "pending",
          admin_notes: `Captured via UVIC AI Chat: "${cleanMsg.slice(0, 200)}"`,
        });
      } catch (leadErr) {
        console.warn("Lead capture error:", leadErr);
      }
    }

    // 2. Fetch live knowledge docs from Uvicon Pro database
    let knowledgeDocs: Array<{ title: string; content: string }> = [];
    try {
      const { data } = await proSupabaseAdmin
        .from("uvic_bot_knowledge")
        .select("title, content")
        .not("title", "like", "__CONFIG_%")
        .limit(10);
      if (data && data.length > 0) {
        knowledgeDocs = data;
      }
    } catch (e) {
      // Non-fatal — continue without knowledge docs
    }

    // 3. PRIMARY: Call Gemini AI for intelligent response
    const geminiKeys = getAllGeminiKeys();
    if (geminiKeys.length > 0) {
      const systemPrompt = buildSystemPrompt(
        knowledgeDocs,
        isHindi,
        Boolean(voiceMode)
      );

      // Build chat history for multi-turn context
      const geminiHistory = (history || [])
        .slice(-8)
        .map((h: { role: string; content: string }) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        }));

      const requestBody: Record<string, unknown> = {
        contents: [
          ...geminiHistory,
          { role: "user", parts: [{ text: cleanMsg }] },
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        generationConfig: voiceMode
          ? {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  display_text: { type: "STRING" },
                  spoken_text: { type: "STRING" },
                },
                required: ["display_text", "spoken_text"],
              },
              temperature: 0.7,
              maxOutputTokens: 600,
            }
          : {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
      };

      // Try with key rotation and fallback models
      for (let attempt = 0; attempt < Math.min(geminiKeys.length, 3); attempt++) {
        const geminiKey = getNextGeminiKey(geminiKeys);
        if (!geminiKey) break;

        for (const model of GEMINI_MODELS) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const candidateText =
                geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

              if (candidateText) {
                if (voiceMode) {
                  try {
                    const parsed = JSON.parse(candidateText);
                    return NextResponse.json({
                      success: true,
                      reply: parsed.display_text || candidateText,
                      spokenText:
                        parsed.spoken_text || parsed.display_text || candidateText,
                      voiceMode: true,
                      source: "gemini",
                      model,
                      timestamp: new Date().toISOString(),
                    });
                  } catch {
                    // JSON parse failed — return as plain text
                  }
                }

                return NextResponse.json({
                  success: true,
                  reply: candidateText,
                  spokenText: candidateText,
                  voiceMode: Boolean(voiceMode),
                  source: "gemini",
                  model,
                  timestamp: new Date().toISOString(),
                });
              }
            } else {
              const errBody = await geminiRes.text();
              console.warn(
                `Gemini error (${model}, status ${geminiRes.status}):`,
                errBody.slice(0, 160)
              );
              // If model not found or deprecated, try next model immediately
              if (geminiRes.status === 404) continue;
              // If rate limited or quota, break to next key
              if (geminiRes.status === 429 || geminiRes.status === 403) break;
            }
          } catch (modelErr) {
            console.warn(`Gemini fetch exception with ${model}:`, modelErr);
          }
        }
      }
    }

    // 4. FALLBACK: Simple intent engine (only used when Gemini is unavailable)
    console.info("Using fallback intent engine (Gemini unavailable)");
    const fallback = getFallbackResponse(cleanMsg, isHindi);

    return NextResponse.json({
      success: true,
      reply: fallback.reply,
      spokenText: fallback.spokenText,
      voiceMode: Boolean(voiceMode),
      source: "fallback",
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to process chat";
    console.error("UVIC Website Chat API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: errMsg,
        reply:
          "Namaste! Mai UVIC hu. Technical connectivity check chal raha hai. Aap hume direct call/WhatsApp (+91 88890 07424) par connect kar sakte hai!",
      },
      { status: 500 }
    );
  }
}
