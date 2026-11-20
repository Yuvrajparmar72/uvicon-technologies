import { NextRequest, NextResponse } from "next/server";
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

// Optimized model order: gemini-3.5-flash-lite is the fastest (~600ms) and highly reliable
const GEMINI_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
  "gemini-3.8-flash",
];

// ── Official Uvicon Technologies Knowledge Base ──────────────────────────
const COMPANY_KNOWLEDGE = `
=== UVICON TECHNOLOGIES — OFFICIAL COMPANY ARCHITECTURE & KNOWLEDGE ===

COMPANY IDENTITY:
- Name: Uvicon Technologies (Uvicon Technologies Private Studio)
- Founded: 2023
- Nature: Full-Stack Software Engineering, Cloud Architecture & Fintech Development Studio
- Head Office: Behind Climax Academy, Panna Naka, Chhatarpur, Madhya Pradesh (MP), India - 471001
- Phone & WhatsApp: +91 88890 07424
- Official Emails: uvicontechnologies@gmail.com / info@uvicon.in
- Website: https://uvicon.in
- Service Reach: Pan-India (Indore, Bhopal, Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, Jaipur) & International Clients (USA, UAE, UK)

TEAM & SQUADS:
- 25+ Senior Software Architects, Full-Stack Engineers, Quant Developers & UI/UX Designers
- Specialized Squads:
  1. Full-Stack Web Squad (Next.js 15, React 19, TypeScript, Tailwind CSS, SSR, GraphQL)
  2. Mobile Applications Squad (Flutter, React Native, Swift iOS, Kotlin Android)
  3. Enterprise & Cloud Squad (Node.js, Go, Python, PostgreSQL, Redis, Docker, AWS/GCP)
  4. Quant & Algo Trading Squad (Ultra-low latency C++/Python, WebSocket FIX protocols, broker APIs)
  5. UI/UX & Product Design Squad (Figma, Design Systems, High-conversion Prototypes)

CORE SERVICES & PRICING:

1. CUSTOM WEBSITE DEVELOPMENT (Next.js 15, React 19, Tailwind CSS, 95+ Lighthouse Score):
   - Starter (₹9,999): Up to 5 pages, responsive design, basic SEO, contact form, SSL certificate, 3-7 days delivery.
   - Growth (₹24,999): Up to 15 pages, custom high-end UI/UX, CMS integration, dynamic blog, analytics, 3 months support.
   - Enterprise (Custom Scope): Unlimited pages, custom web portals, e-commerce, multi-language, advanced security, micro-frontends.

2. MOBILE APPLICATION DEVELOPMENT (iOS & Android):
   - Technologies: Flutter, React Native, Native Swift, Kotlin
   - Starter MVP (₹29,999): Single platform (iOS or Android), up to 8 core screens, essential API integration, 3-5 weeks delivery.
   - Growth Dual-Platform (₹69,999): Cross-platform (iOS + Android), unlimited screens, custom animations, offline sync, push notifications, analytics dashboard, 4 weeks post-launch support.
   - Enterprise Mobile (Custom Scope): Biometric authentication, MDM integration, real-time audio/video, custom SDKs, 24/7 SLA.

3. CUSTOM ENTERPRISE SOFTWARE, CRM & ERP:
   - Starter (₹24,999): Single custom module, secure backend API, cloud deployment, source code ownership.
   - Growth (₹59,999): Full-stack custom business management system, advanced UI/UX, custom database architecture, CI/CD setup, 4 weeks support.
   - Enterprise (Custom Scope): Microservices architecture, event-driven design, role-based access control (RBAC), legacy migration, SLA guarantees.

4. ALGORITHMIC TRADING SOFTWARE & STRATEGY AUTOMATION:
   - Ultra-low execution latency (<0.1ms), real-time WebSocket market streams, backtesting engine.
   - Multi-broker connectivity: Angel One, Zerodha Kite, Fyers, Dhan, Upstox, Finvasia, Alice Blue.
   - Basic Plan: ₹11,999 (30 Days access, paper + live trading, single broker, live signals).
   - Standard Plan: ₹29,999 (90 Days access, multi-broker, custom strategy slots).
   - Premium Plan: ₹89,999 (365 Days access, ultra-low latency, institutional features, priority quant support).
   - Custom Strategy Coding: Custom indicators, Pine Script to Python conversion, multi-leg options execution.

5. AI AGENTS & CONVERSATIONAL COPILOTS:
   - Custom LLM fine-tuning, RAG enterprise search, voice-enabled AI assistants, WhatsApp/CRM automated bots.

FLAGSHIP PRODUCTS DEVELOPED BY UVICON TECHNOLOGIES:
1. Uvicon Connect (CRM): Intelligent lead distribution, Kanban sales pipelines, real-time team analytics (10k+ leads managed).
2. Uvicon Pro (https://pro.uvicon.in): Institutional-grade algo trading software, strategy tester & backtesting engine (<0.1ms latency).
3. Uvicon HMS: Comprehensive Hotel Management SaaS (room allocation, guest check-in, staff shifts, automated billing, income analytics).
4. Uvicon Desk (https://desk.uvicon.in): Central operations, client management, and administrative portal.

OUR GUARANTEES & CLIENT TERMS:
- 100% IP & Source Code Ownership: Legally transferred to client upon milestone completion under a signed mutual NDA.
- 90-Day Post-Launch SLA Warranty: Proactive bug fixes, server uptime monitoring, and security maintenance at zero extra cost.
- Sprint-Based Agile Milestones: Bi-weekly live staging demos so clients can test progress before every milestone payment.
- Transparent Milestone Payments: Pay as features get delivered, no hidden surprises.

CUSTOM SOFTWARE INQUIRIES WE SPECIALIZE IN:
- E-commerce & Grocery delivery apps (similar to Blinkit, Zepto, Amazon)
- Food delivery & Restaurant POS systems (similar to Swiggy, Zomato)
- Ride-hailing & Logistics apps (similar to Uber, Porter)
- Healthcare, Clinic & Hospital Management Systems
- EdTech & Online Learning Management Portals
- Real Estate & Property Listing Portals
- Hotel, Resort & Homestay Booking Engines
- FinTech, Investment Tracking, Algo Bots & Crypto Dashboards
- Custom ERPs for Manufacturing, Inventory & Retail
`;

// ── Hinglish & Language Detection ────────────────────────────────────────
function isHindiOrHinglish(text: string): boolean {
  if (/[\u0900-\u097F]/.test(text)) return true;
  const lower = text.toLowerCase();
  const patterns = [
    /\b(kya|kaise|kaha|kahan|kidhar|kitna|kitne|kitni|kab|kyu|kyun|kaun|kis|kisko|kise|konsa|konsi)\b/i,
    /\b(tum|tumhara|tumhari|tumhare|aap|aapka|aapki|aapke|mera|meri|mere|hum|hamara|hamari|hamare|mujhe|hume|apna|apni|apne)\b/i,
    /\b(hai|he|ho|hu|hoon|hoga|hogi|honge|tha|thi|the|raha|rahi|rahe|sakte|sakta|sakti|karega|karegi|karenge)\b/i,
    /\b(batao|bataiye|bolo|boliye|puchha|pucha|pucho|karo|karna|karwana|bana|banwana|chahiye|dekhna|dena|chalta|doge|rakhoge|milega)\b/i,
    /\b(bhai|dost|sir|madam|namaste|pranam|shukriya|dhanyawad|accha|theek|thik|sahi|galat|arre|ji)\b/i,
    /\b(paisa|rupaye|kharcha|dam|daam|lagta|banega|hona|denge|loge|mein|pass|pehle|baad|sath|kuch|zyada)\b/i,
  ];
  return patterns.some((p) => p.test(lower));
}

// ── Build Gemini System Prompt ───────────────────────────────────────────
function buildSystemPrompt(isHindi: boolean, voiceMode: boolean): string {
  let prompt = `You are UVIC, the official AI Copilot and Lead Tech Consultant for Uvicon Technologies (https://uvicon.in).
You are smart, articulate, highly knowledgeable, empathetic, and human-like — just like an experienced technology architect chatting with a client on WhatsApp.

CRITICAL IDENTITY RULES:
1. You represent UVICON TECHNOLOGIES, a premier Indian software engineering and digital studio. We build custom Websites, Mobile Apps (iOS & Android), Enterprise CRM/ERP systems, and Algorithmic Trading Software.
2. IMPORTANT DISTINCTION:
   - Uvicon Technologies is our parent software company (studio).
   - Uvicon Pro (https://pro.uvicon.in) is our flagship Algorithmic Trading platform product.
   - Do NOT assume a client is only asking about trading. If someone asks "Aap kya kaam karte ho?" or asks about grocery apps, websites, mobile apps, or enterprise software, answer enthusiastically about our custom software engineering services!
3. ANSWER DIRECTLY & ACCURATELY:
   - Always answer the user's specific question first.
   - Keep answers concise and crisp (2 to 4 sentences for direct questions; clean bullet points if asked for features, tech stack, or steps).
   - Never give robotic disclaimers. Sound natural, confident, and professional.
   - If asked for estimates: Mention realistic ballpark timelines (e.g. Website 3-7 days, Mobile App 3-5 weeks) and starter pricing.
   - Provide our direct team contact (+91 88890 07424 / info@uvicon.in) when the user wants to discuss project requirements, get a quote, or schedule a demo.

`;

  if (isHindi) {
    prompt += `LANGUAGE & TONE INSTRUCTION:
- The user is speaking in Hindi or Hinglish.
- Reply in very natural, friendly, conversational Hinglish (Hindi written in the English alphabet, with standard English technical terms like app, website, features, timeline, delivery, pricing, deployment, server).
- DO NOT use archaic, overly complex, or pure Sanskritized Hindi. Keep it warm, polite, and conversational like chatting with a respected tech partner.
- Example: "Haan bilkul! Hum custom grocery aur e-commerce apps dono iOS aur Android ke liye develop karte hain. Isme live order tracking, payment gateway, aur admin dashboard sab included rehta hai."\n\n`;
  } else {
    prompt += `LANGUAGE & TONE INSTRUCTION:
- Reply in professional, warm, and engaging modern English.\n\n`;
  }

  if (voiceMode) {
    prompt += `VOICE MODE REQUIREMENT:
You MUST respond with a strict JSON object containing exactly two keys:
- "display_text": A concise Hinglish/English text answer to show on the user's screen.
- "spoken_text": The SAME answer written in DEVANAGARI HINDI script (with common English technical words like ऍप, वेबसाइट, सर्वर, फीचर्स) so our Indian speech synthesis engine speaks with natural warmth and clarity. Example: "नमस्ते! हाँ बिल्कुल, हम कस्टम मोबाइल ऍप्स और वेबसाइट्स डेवलप करते हैं।"
Do NOT output any markdown backticks or text outside the JSON object.\n\n`;
  }

  prompt += COMPANY_KNOWLEDGE;

  return prompt;
}

// ── Smart Context-Aware Fallback Engine ───────────────────────────────────
function getFallbackResponse(
  cleanMsg: string,
  isHindi: boolean
): { reply: string; spokenText: string } {
  const lower = cleanMsg.toLowerCase();

  // Greetings
  if (
    /^(hi|hello|hey|namaste|pranam|hola|good\s*(morning|evening|afternoon)|kaise ho|kya haal)/i.test(
      lower
    )
  ) {
    return isHindi
      ? {
          reply:
            "Namaste! 🙏 Main UVIC hoon — Uvicon Technologies ka official AI Copilot. Hum custom Websites, Mobile Apps (iOS & Android), Enterprise Software aur Algo Trading Systems banate hain. Aaj aap kis project ke baare mein baat karna chahte hain?",
          spokenText:
            "नमस्ते! मैं UVIC हूँ, युविकॉन टेक्नोलॉजीज का AI असिस्टेंट। हम कस्टम वेबसाइट्स, मोबाइल ऍप्स और अल्गो सॉफ्टवेयर बनाते हैं। बताइए, मैं आपकी क्या मदद कर सकता हूँ?",
        }
      : {
          reply:
            "Hello! I am UVIC, the official AI Copilot at Uvicon Technologies. We build high-performance Websites, Mobile Apps, Enterprise CRM/ERP, and Algorithmic Trading Systems. What project can I assist you with today?",
          spokenText:
            "Hello! I am UVIC, your AI assistant at Uvicon Technologies. How can I help you with your software project today?",
        };
  }

  // Location / Office / Address
  if (
    /\b(kaha|kahan|kidhar|address|headquarter|office|chhatarpur|panna naka)\b/i.test(
      lower
    )
  ) {
    return isHindi
      ? {
          reply:
            "Uvicon Technologies ka Head Office **Behind Climax Academy, Panna Naka, Chhatarpur (Madhya Pradesh), India - 471001** mein hai. 📍 Hum poore India aur globally clients ko serve karte hain. Direct contact: **+91 88890 07424**.",
          spokenText:
            "युविकॉन टेक्नोलॉजीज का हेड ऑफिस पन्ना नाका, छतरपुर, मध्य प्रदेश में स्थित है।",
        }
      : {
          reply:
            "Uvicon Technologies is headquartered at **Behind Climax Academy, Panna Naka, Chhatarpur, Madhya Pradesh (India) - 471001**. We serve clients across India and internationally. Reach our desk at **+91 88890 07424**.",
          spokenText:
            "Uvicon Technologies is headquartered in Chhatarpur, Madhya Pradesh, India.",
        };
  }

  // Team / Experience / Engineers
  if (
    /\b(kitne log|kitne member|team size|company size|developer|engineer|staff)\b/i.test(
      lower
    )
  ) {
    return isHindi
      ? {
          reply:
            "Uvicon Technologies mein **25+ skilled software engineers, architects aur quant developers** ki team hai. Humare dedicated squads Web, Mobile Apps, Enterprise Systems aur Algo Trading mein sprint-based delivery karte hain.",
          spokenText:
            "युविकॉन टेक्नोलॉजीज में 25 से अधिक स्किल्ड सॉफ्टवेयर इंजीनियर्स और आर्किटेक्ट्स की टीम है।",
        }
      : {
          reply:
            "Uvicon Technologies has a core squad of **25+ software architects, engineers, quant developers, and designers** delivering projects across Web, Mobile, Cloud, and Algo Trading.",
          spokenText:
            "Uvicon Technologies has a core squad of over 25 skilled engineers and software architects.",
        };
  }

  // Mobile App Inquiry
  if (
    /\b(mobile app|android app|ios app|flutter|react native|app banwana|application)\b/i.test(
      lower
    )
  ) {
    return isHindi
      ? {
          reply:
            "Haan bilkul! Hum Flutter aur React Native par high-performance iOS aur Android apps banate hain. MVP packages ₹29,999 se start hote hain aur full dual-platform app ₹69,999 se. Saath mein 100% source code ownership aur 90 days warranty milti hai. Aap kis type ka app plan kar rahe hain?",
          spokenText:
            "हाँ बिल्कुल! हम आईओएस और एंड्रॉइड के लिए कस्टम मोबाइल ऍप्स बनाते हैं। अधिक जानकारी के लिए 88890 07424 पर संपर्क करें।",
        }
      : {
          reply:
            "Yes! We build high-performance iOS and Android mobile apps using Flutter and React Native. MVP packages start at ₹29,999, and dual-platform apps at ₹69,999 with 100% source code ownership and 90-day SLA warranty. What kind of app are you planning?",
          spokenText:
            "Yes, we build high performance iOS and Android mobile applications. Packages start at 29,999 rupees.",
        };
  }

  // Website Development Inquiry
  if (
    /\b(website|web design|landing page|nextjs|react website|portal)\b/i.test(
      lower
    )
  ) {
    return isHindi
      ? {
          reply:
            "Hum Next.js 15 aur React 19 par ultra-fast, SEO-optimized websites banate hain (95+ Core Web Vitals). Starter website packages ₹9,999 se shuru hote hain (3-7 days delivery) aur Growth dynamic portals ₹24,999 se. Kya aap ek naya web project start karna chahte hain?",
          spokenText:
            "हम नेक्स्ट जेएस पर हाई स्पीड वेबसाइट्स बनाते हैं। वेबसाइट पैकेज 9,999 रुपये से शुरू होते हैं।",
        }
      : {
          reply:
            "We build blazing-fast, SEO-optimized websites using Next.js 15 and React 19 (scoring 95+ on Core Web Vitals). Starter business packages start at ₹9,999 (3-7 days delivery), and Growth dynamic portals at ₹24,999. Are you looking to launch a new web project?",
          spokenText:
            "We build high speed Next.js websites starting at 9,999 rupees with full SEO optimization.",
        };
  }

  // Algo Trading Inquiry
  if (
    /\b(algo|trading software|angel one|zerodha|broker|backtest|quant|strategy)\b/i.test(
      lower
    )
  ) {
    return isHindi
      ? {
          reply:
            "Hum institutional-grade Algorithmic Trading systems develop karte hain (<0.1ms execution latency). Hum Angel One, Zerodha Kite, Fyers, Dhan, aur Upstox connect karte hain. Humara flagship platform Uvicon Pro (https://pro.uvicon.in) hai. Algo packages ₹11,999/month se start hote hain.",
          spokenText:
            "हम अल्गो ट्रेडिंग सॉफ्टवेयर और स्ट्रेटेजी ऑटोमेशन बनाते हैं। अल्गो पैकेजेस 11,999 रुपये से शुरू होते हैं।",
        }
      : {
          reply:
            "We engineer institutional-grade Algorithmic Trading software (<0.1ms latency) with multi-broker connectivity for Angel One, Zerodha Kite, Fyers, Dhan, and Upstox. Our flagship platform is Uvicon Pro (https://pro.uvicon.in). Algo plans start at ₹11,999.",
          spokenText:
            "We engineer institutional algo trading software with sub millisecond execution and multi broker integration.",
        };
  }

  // Default intelligent fallback
  return isHindi
    ? {
        reply:
          "Uvicon Technologies custom Websites, Mobile Apps (iOS/Android), Enterprise CRM/ERP aur Algo Trading Software design aur develop karti hai. Hum 100% source code ownership aur 90-day warranty dete hain. Aapke project ke scope par direct discussion ke liye hume **+91 88890 07424** par Call/WhatsApp karein ya info@uvicon.in par likhein!",
        spokenText:
          "युविकॉन टेक्नोलॉजीज कस्टम वेबसाइट्स, मोबाइल ऍप्स और एंटरप्राइज सॉफ्टवेयर बनाती है। अधिक जानकारी के लिए 88890 07424 पर संपर्क करें।",
      }
    : {
        reply:
          "At Uvicon Technologies, we engineer custom Websites, Mobile Apps (iOS/Android), Enterprise CRM/ERP, and Algorithmic Trading Systems with 100% IP ownership and 90-day post-launch warranty. Reach our engineering team at **+91 88890 07424** or email info@uvicon.in!",
        spokenText:
          "At Uvicon Technologies, we engineer custom websites, mobile applications, and enterprise software. Contact us at +91 88890 07424.",
      };
}

// ── Convert raw 24000Hz 16-bit Mono PCM to standard WAV ──────────────────
function pcmToWav(pcmBase64: string, sampleRate = 24000): string {
  try {
    const pcmBytes = Buffer.from(pcmBase64, "base64");
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = pcmBytes.length;
    const header = Buffer.alloc(44);

    header.write("RIFF", 0);
    header.writeUInt32LE(36 + dataSize, 4);
    header.write("WAVE", 8);
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16); // SubChunk1Size (16 for PCM)
    header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
    header.writeUInt16LE(numChannels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write("data", 36);
    header.writeUInt32LE(dataSize, 40);

    return Buffer.concat([header, pcmBytes]).toString("base64");
  } catch {
    return pcmBase64;
  }
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

    // 2. PRIMARY: Call Gemini AI for intelligent, accurate response
    const geminiKeys = getAllGeminiKeys();
    if (geminiKeys.length > 0) {
      const systemPrompt = buildSystemPrompt(isHindi, Boolean(voiceMode));

      // Build clean chat history:
      // - Skip initial model greetings so the first item is always a user turn
      // - Merge consecutive messages of the same role
      const rawHistory = history || [];
      const formattedHistory: Array<{
        role: "user" | "model";
        parts: [{ text: string }];
      }> = [];

      for (const h of rawHistory) {
        const role = h.role === "user" ? "user" : "model";
        if (formattedHistory.length === 0 && role === "model") {
          continue;
        }
        if (
          formattedHistory.length > 0 &&
          formattedHistory[formattedHistory.length - 1].role === role
        ) {
          formattedHistory[formattedHistory.length - 1].parts[0].text += `\n\n${h.content}`;
        } else {
          formattedHistory.push({
            role,
            parts: [{ text: h.content }],
          });
        }
      }

      const requestBody: Record<string, unknown> = {
        contents: [
          ...formattedHistory.slice(-10),
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
              temperature: 0.6,
              maxOutputTokens: 600,
            }
          : {
              temperature: 0.6,
              maxOutputTokens: 600,
            },
      };

      // Try with key rotation and smart model fallbacks
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
                signal: AbortSignal.timeout(9000),
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const candidateText =
                geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

              if (candidateText) {
                let displayText = candidateText;
                let spokenText = candidateText;

                if (voiceMode) {
                  try {
                    const parsed = JSON.parse(candidateText);
                    displayText = parsed.display_text || candidateText;
                    spokenText = parsed.spoken_text || displayText;
                  } catch {
                    // Plain text response fallback
                  }

                  // Generate high-fidelity Gemini TTS audio
                  let audioWavBase64: string | null = null;
                  try {
                    const ttsRes = await fetch(
                      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${geminiKey}`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          contents: [
                            { parts: [{ text: spokenText.slice(0, 1500) }] },
                          ],
                          generationConfig: {
                            responseModalities: ["AUDIO"],
                            speechConfig: {
                              voiceConfig: {
                                prebuiltVoiceConfig: { voiceName: "aoede" },
                              },
                            },
                          },
                        }),
                        signal: AbortSignal.timeout(6000),
                      }
                    );

                    if (ttsRes.ok) {
                      const ttsJson = await ttsRes.json();
                      const rawPcm =
                        ttsJson?.candidates?.[0]?.content?.parts?.[0]?.inlineData
                          ?.data;
                      if (rawPcm) {
                        audioWavBase64 = pcmToWav(rawPcm, 24000);
                      }
                    }
                  } catch (ttsErr) {
                    console.warn("TTS generation exception:", ttsErr);
                  }

                  return NextResponse.json({
                    success: true,
                    reply: displayText,
                    spokenText,
                    audio: audioWavBase64,
                    mimeType: "audio/wav",
                    voiceMode: true,
                    source: "gemini",
                    model,
                    timestamp: new Date().toISOString(),
                  });
                }

                return NextResponse.json({
                  success: true,
                  reply: displayText,
                  spokenText: displayText,
                  voiceMode: false,
                  source: "gemini",
                  model,
                  timestamp: new Date().toISOString(),
                });
              }
            } else {
              const status = geminiRes.status;
              console.warn(
                `Gemini error (${model}, status ${status}) - trying next model.`
              );
              if (status === 429 || status === 403) {
                // Rate limited or invalid key, break to next key immediately
                break;
              }
              // For 503 or 404, continue to next model in list
              continue;
            }
          } catch (modelErr) {
            console.warn(`Gemini exception with ${model}:`, modelErr);
          }
        }
      }
    }

    // 3. FALLBACK: Smart context-aware fallback (used only if network/AI is completely unavailable)
    console.info("Using smart context-aware fallback engine");
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
          "Namaste! Main UVIC hoon. Technical connectivity check chal raha hai. Aap humari engineering team se direct Call/WhatsApp (+91 88890 07424) par connect kar sakte hain!",
      },
      { status: 500 }
    );
  }
}
