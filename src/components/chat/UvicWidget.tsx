"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  PhoneCall,
  Loader2,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import "@/styles/uvic-widget.css";

interface ChatMessage {
  id: string;
  sender_type: "user" | "bot";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "⚡ Algo Software Price?", query: "What is your pricing for Algo Trading Software?" },
  { label: "📱 Mobile App Cost?", query: "How much does a Mobile App development cost?" },
  { label: "🌐 Website Packages", query: "What are your Website Development packages?" },
  { label: "🔗 Connect Broker", query: "Can you connect with Zerodha or Angel One?" },
  { label: "📞 Request Callback", query: "I would like to request a callback from your team." },
];

export default function UvicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [transcript, setTranscript] = useState("");
  const [spokenResponse, setSpokenResponse] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [audioMuted, setAudioMuted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const isVoiceModeActiveRef = useRef(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Session ID & Load History from localStorage
  useEffect(() => {
    let sid = localStorage.getItem("uvicon_web_chat_session");
    if (!sid) {
      sid = "uvic_web_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      localStorage.setItem("uvicon_web_chat_session", sid);
    }
    setSessionId(sid);

    // Initial greeting message if no history
    const saved = localStorage.getItem("uvicon_web_chat_messages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch (e) {
        /* ignore */
      }
    }

    const initialGreeting: ChatMessage = {
      id: "init_1",
      sender_type: "bot",
      content:
        "Namaste! 🙏 I am UVIC, your AI assistant at Uvicon Technologies.\n\nI can help you explore our Custom Software, Mobile Apps (iOS & Android), High-Performance Websites, and Algorithmic Trading Systems.\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([initialGreeting]);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("uvicon_web_chat_messages", JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen && !voiceMode) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, voiceMode]);

  // Keep ref synchronized with state
  useEffect(() => {
    isVoiceModeActiveRef.current = voiceMode;
  }, [voiceMode]);

  // Speech Recognition Setup
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === "undefined") return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return null;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = true;
    recog.lang = "en-IN"; // English (India) / Hinglish friendly

    recog.onstart = () => {
      setVoiceState("listening");
    };

    recog.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const finalTranscript = event.results[i][0].transcript.trim();
          setTranscript(finalTranscript);
          handleVoiceSubmit(finalTranscript);
          return;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(interim);

      // Auto submit after pause of silence
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (interim.trim().length > 3) {
          recog.stop();
          handleVoiceSubmit(interim.trim());
        }
      }, 1800);
    };

    recog.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (isVoiceModeActiveRef.current) {
        setVoiceState("idle");
      }
    };

    recog.onend = () => {
      if (isVoiceModeActiveRef.current && voiceState === "listening") {
        setVoiceState("idle");
      }
    };

    return recog;
  }, [voiceState]);

  // Voice Mode Start
  const startVoiceListening = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setTranscript("");
    setVoiceState("listening");

    try {
      if (!recognitionRef.current) {
        recognitionRef.current = initSpeechRecognition();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current.start();
      }
    } catch (e) {
      console.error("Failed to start voice recognition:", e);
      setVoiceState("idle");
    }
  }, [initSpeechRecognition]);

  // Speak response out loud using Browser TTS
  const speakText = useCallback(
    (text: string) => {
      if (audioMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
        setVoiceState("idle");
        return;
      }

      window.speechSynthesis.cancel();
      const clean = text
        .replace(/[*_#`[\]()]/g, "")
        .replace(/(https?:\/\/[^\s]+)/g, "")
        .trim();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Select natural voice (Indian English or Hindi if available)
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(
        (v) =>
          v.lang.includes("hi") ||
          v.name.includes("India") ||
          v.name.includes("Hindi") ||
          v.name.includes("Google हिन्दी")
      );
      const indianVoice = voices.find((v) => v.lang.includes("en-IN") || v.name.includes("India"));

      if (hindiVoice) utterance.voice = hindiVoice;
      else if (indianVoice) utterance.voice = indianVoice;

      utterance.onstart = () => {
        setVoiceState("speaking");
      };

      utterance.onend = () => {
        if (isVoiceModeActiveRef.current) {
          setVoiceState("idle");
          // Re-listen after speaking in voice mode
          setTimeout(() => {
            if (isVoiceModeActiveRef.current) {
              startVoiceListening();
            }
          }, 600);
        } else {
          setVoiceState("idle");
        }
      };

      utterance.onerror = () => {
        setVoiceState("idle");
      };

      window.speechSynthesis.speak(utterance);
    },
    [audioMuted, startVoiceListening]
  );

  // Play High-Fidelity Audio from Gemini TTS
  const playDirectAudio = useCallback(
    (base64WavAudio: string, fallbackText: string) => {
      if (audioMuted || typeof window === "undefined") {
        setVoiceState("idle");
        return;
      }

      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      try {
        const audioUrl = `data:audio/wav;base64,${base64WavAudio}`;
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;

        audio.onplay = () => {
          setVoiceState("speaking");
        };

        audio.onended = () => {
          audioPlayerRef.current = null;
          if (isVoiceModeActiveRef.current) {
            setVoiceState("idle");
            setTimeout(() => {
              if (isVoiceModeActiveRef.current) {
                startVoiceListening();
              }
            }, 600);
          } else {
            setVoiceState("idle");
          }
        };

        audio.onerror = () => {
          audioPlayerRef.current = null;
          speakText(fallbackText);
        };

        audio.play().catch((playErr) => {
          console.warn("Direct audio play prevented, falling back to TTS:", playErr);
          speakText(fallbackText);
        });
      } catch {
        speakText(fallbackText);
      }
    },
    [audioMuted, speakText, startVoiceListening]
  );

  // Send Message API
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    setInput("");
    const userMsg: ChatMessage = {
      id: "u_" + Date.now(),
      sender_type: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/uvic-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || "uvic_web_guest",
          voiceMode: false,
          history: messages.slice(-10).map((m) => ({
            role: m.sender_type === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const botReply = data?.reply || "Namaste! I am currently processing your request.";

      const botMsg: ChatMessage = {
        id: "b_" + Date.now(),
        sender_type: "bot",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          sender_type: "bot",
          content:
            "Connection interrupted. You can call or WhatsApp our engineering team directly at +91 88890 07424 or visit /contact.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice Submit
  const handleVoiceSubmit = async (voiceText: string) => {
    if (!voiceText.trim()) return;

    setVoiceState("processing");
    const userMsg: ChatMessage = {
      id: "v_u_" + Date.now(),
      sender_type: "user",
      content: voiceText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/uvic-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: voiceText,
          sessionId: sessionId || "uvic_web_guest",
          voiceMode: true,
          history: messages.slice(-10).map((m) => ({
            role: m.sender_type === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const reply = data?.reply || "I am ready to assist you.";
      const spoken = data?.spokenText || reply;

      setSpokenResponse(reply);

      const botMsg: ChatMessage = {
        id: "v_b_" + Date.now(),
        sender_type: "bot",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);

      // Play natural Gemini TTS audio if available, else fallback to browser TTS
      if (data?.audio) {
        playDirectAudio(data.audio, spoken);
      } else {
        speakText(spoken);
      }
    } catch (e) {
      console.error("Voice chat error:", e);
      setVoiceState("idle");
    }
  };

  // Switch to Voice Mode
  const toggleVoiceMode = () => {
    if (!voiceMode) {
      setVoiceMode(true);
      startVoiceListening();
    } else {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setVoiceState("idle");
      setVoiceMode(false);
    }
  };

  // Reset / Clear chat
  const handleClearChat = () => {
    if (confirm("Reset conversation with UVIC?")) {
      const initialGreeting: ChatMessage = {
        id: "init_" + Date.now(),
        sender_type: "bot",
        content:
          "Namaste! 🙏 Conversation restarted. Ask me anything about Uvicon Technologies services, pricing, or algo software!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([initialGreeting]);
      localStorage.removeItem("uvicon_web_chat_messages");
    }
  };

  return (
    <div className="uvic-widget-container">
      {/* ── 1. Floating CSS Robot Launcher ── */}
      {!isOpen && (
        <button
          className="uvic-launcher-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Talk to UVIC AI Assistant"
          title="Talk with UVIC AI"
        >
          {/* Signature Uvicon 3D CSS Robot Character */}
          <div className="uvic-robot-stage">
            <div className="css-robot">
              <div className="head-group">
                <div className="ear left"></div>
                <div className="ear right"></div>
                <div className="head-shape">
                  <div className="face-screen">
                    <div className="eyes-container">
                      <div className="eye"></div>
                      <div className="eye"></div>
                    </div>
                    <div className="cheek left"></div>
                    <div className="cheek right"></div>
                  </div>
                </div>
              </div>
              <div className="neck"></div>
              <div className="torso">
                {/* Uvicon Technologies Brand Logo on Torso */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.95,
                    filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))",
                  }}
                >
                  <Image
                    src="/assets/logo/uvicontechnologies.png"
                    alt="Uvicon Technologies"
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <div className="glow-strip"></div>
              </div>
              <div className="arm left"></div>
              <div className="arm right"></div>
              <div className="shadow-g"></div>
            </div>
          </div>

          {/* Talk to UVIC Pill Badge Under Robot */}
          <div className="uvic-launcher-pill">
            <span className="uvic-badge-dot"></span>
            <span className="uvic-pill-text">Talk to UVIC</span>
          </div>
        </button>
      )}

      {/* ── 2. Interactive Chat & Voice Window ── */}
      {isOpen && (
        <div className="uvic-chat-modal">
          {/* Header */}
          <div className="uvic-chat-header">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#003D3F] to-[#001D1E] border border-[#2BA8A0]/40 flex items-center justify-center shadow-md p-1">
                <Image
                  src="/assets/logo/uvicontechnologies.png"
                  alt="UVIC AI"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#1DE9B6] border-2 border-[#001416]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold tracking-wide text-white font-mono">
                    UVIC AI
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2BA8A0]/20 text-[#1DE9B6] font-semibold border border-[#2BA8A0]/30">
                    Copilot
                  </span>
                </div>
                <p className="text-[11px] text-[#A0AAB2] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DE9B6] animate-pulse"></span>
                  Online • Uvicon Technologies
                </p>
              </div>
            </div>

            {/* Actions: Voice Mode Toggle, Reset, Close */}
            <div className="flex items-center gap-1">
              {/* Voice Mode Toggle */}
              <button
                onClick={toggleVoiceMode}
                className={`p-2 rounded-xl transition-all ${
                  voiceMode
                    ? "bg-[#1DE9B6] text-[#001D1E] shadow-lg shadow-[#1DE9B6]/30 font-bold"
                    : "text-[#A0AAB2] hover:text-white hover:bg-white/10"
                }`}
                title={voiceMode ? "Switch to Text Chat" : "Switch to Live Voice Mode"}
              >
                {voiceMode ? <MessageSquare size={16} /> : <Mic size={16} />}
              </button>

              {/* Clear */}
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl text-[#A0AAB2] hover:text-white hover:bg-white/10 transition-all"
                title="Restart Chat"
              >
                <RotateCcw size={15} />
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (audioPlayerRef.current) {
                    audioPlayerRef.current.pause();
                    audioPlayerRef.current = null;
                  }
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  if (recognitionRef.current) {
                    recognitionRef.current.abort();
                  }
                }}
                className="p-2 rounded-xl text-[#A0AAB2] hover:text-white hover:bg-white/10 transition-all"
                title="Close UVIC"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* ── Content: Voice Panel OR Text Message Stream ── */}
          {voiceMode ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-radial from-[#002B2D]/80 to-[#001011] relative overflow-hidden">
              {/* Concentric Animated Voice Orb */}
              <div className="relative w-36 h-36 mb-6">
                <div className={`uvic-voice-ring uvic-voice-ring-1 ${voiceState}`} />
                <div className={`uvic-voice-ring uvic-voice-ring-2 ${voiceState}`} />
                <div className={`uvic-voice-ring uvic-voice-ring-3 ${voiceState}`} />

                <button
                  onClick={() => {
                    if (voiceState === "listening") {
                      if (recognitionRef.current) recognitionRef.current.stop();
                      setVoiceState("idle");
                    } else {
                      startVoiceListening();
                    }
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl"
                  style={{
                    background:
                      voiceState === "listening"
                        ? "radial-gradient(circle, #1de9b6, #00bfa5)"
                        : voiceState === "speaking"
                        ? "radial-gradient(circle, #7c4dff, #651fff)"
                        : voiceState === "processing"
                        ? "radial-gradient(circle, #ffd54f, #ffab00)"
                        : "radial-gradient(circle, #004d40, #00251a)",
                    boxShadow:
                      voiceState === "listening"
                        ? "0 0 40px rgba(29, 233, 182, 0.6)"
                        : voiceState === "speaking"
                        ? "0 0 40px rgba(124, 77, 255, 0.6)"
                        : voiceState === "processing"
                        ? "0 0 40px rgba(255, 171, 0, 0.5)"
                        : "0 0 20px rgba(43, 168, 160, 0.3)",
                  }}
                >
                  {voiceState === "listening" && <Mic size={26} className="text-[#00251a]" />}
                  {voiceState === "processing" && (
                    <Loader2 size={26} className="text-white animate-spin" />
                  )}
                  {voiceState === "speaking" && <Volume2 size={26} className="text-white" />}
                  {voiceState === "idle" && <Mic size={26} className="text-white/60" />}
                </button>
              </div>

              {/* Status Indicator */}
              <div
                className="text-[12px] font-bold tracking-widest uppercase mb-4 transition-colors"
                style={{
                  color:
                    voiceState === "listening"
                      ? "#1de9b6"
                      : voiceState === "speaking"
                      ? "#b388ff"
                      : voiceState === "processing"
                      ? "#ffd54f"
                      : "#78909c",
                }}
              >
                {voiceState === "listening" && "🎙️ Sun raha hu... (Listening)"}
                {voiceState === "processing" && "⏳ Soch raha hu... (Thinking)"}
                {voiceState === "speaking" && "🔊 Bol raha hu... (Speaking)"}
                {voiceState === "idle" && "Tap orb to speak"}
              </div>

              {/* Live transcript or spoken response */}
              <div className="w-full max-h-44 overflow-y-auto uvic-scroll flex flex-col gap-2.5 px-2">
                {transcript && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-[13px] text-teal-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
                      You said
                    </span>
                    {transcript}
                  </div>
                )}
                {spokenResponse && (
                  <div className="bg-[#7c4dff]/15 border border-[#7c4dff]/30 rounded-2xl p-3 text-[13px] text-purple-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 block mb-1">
                      UVIC
                    </span>
                    {spokenResponse}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setAudioMuted(!audioMuted)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] text-white/80 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  {audioMuted ? "Unmute" : "Mute Sound"}
                </button>
                <button
                  onClick={() => setVoiceMode(false)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] text-white/80 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare size={14} /> Text Mode
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Quick suggestion pills (scrollable horizontally) */}
              <div className="px-4 py-2.5 bg-black/20 border-b border-white/5 flex gap-2 overflow-x-auto uvic-scroll shrink-0">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt.query)}
                    className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium bg-[#003D3F]/40 hover:bg-[#2BA8A0]/30 text-[#E0F2F1] border border-[#2BA8A0]/30 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              {/* Message Feed */}
              <div className="flex-1 p-4 overflow-y-auto uvic-scroll flex flex-col gap-3">
                {messages.map((msg) => {
                  const isUser = msg.sender_type === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed rounded-2xl whitespace-pre-wrap break-words ${
                          isUser
                            ? "bg-gradient-to-r from-[#00595C] to-[#2BA8A0] text-white rounded-br-xs shadow-md shadow-[#2BA8A0]/15"
                            : "bg-[#002224] text-[#E0E0E0] border border-[#2BA8A0]/25 rounded-bl-xs shadow-sm"
                        }`}
                      >
                        {msg.content}
                        <div
                          className={`text-[9px] mt-1.5 font-mono text-right ${
                            isUser ? "text-white/60" : "text-white/40"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing dots */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 bg-[#002224] border border-[#2BA8A0]/25 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
                      <div className="uvic-typing-dot" style={{ animationDelay: "0s" }} />
                      <div className="uvic-typing-dot" style={{ animationDelay: "0.2s" }} />
                      <div className="uvic-typing-dot" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* ── Input Bar ── */}
          {!voiceMode && (
            <div className="p-3 bg-[#001D1E] border-t border-[#2BA8A0]/20 flex flex-col gap-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask UVIC anything (Hinglish / English)..."
                  className="flex-1 bg-black/40 border border-[#2BA8A0]/30 focus:border-[#1DE9B6] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/35 outline-none transition-all"
                />

                {/* Mic quick button */}
                <button
                  type="button"
                  onClick={toggleVoiceMode}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-[#2BA8A0]/20 text-[#1DE9B6] border border-[#2BA8A0]/30 transition-all cursor-pointer"
                  title="Voice Mode"
                >
                  <Mic size={16} />
                </button>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#2BA8A0] to-[#1DE9B6] text-[#00251a] font-bold disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90 transition-all cursor-pointer shadow-md"
                  title="Send Message"
                >
                  <Send size={16} />
                </button>
              </form>

              {/* Bottom direct actions: Call, Pricing, Services */}
              <div className="flex items-center justify-between text-[11px] text-[#A0AAB2] px-1 pt-1 border-t border-white/5">
                <a
                  href="tel:+918889007424"
                  className="flex items-center gap-1 hover:text-[#1DE9B6] transition-colors"
                >
                  <PhoneCall size={11} /> +91 88890 07424
                </a>
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#FFC050] transition-colors"
                  >
                    Pricing
                  </Link>
                  <span>•</span>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#1DE9B6] transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

