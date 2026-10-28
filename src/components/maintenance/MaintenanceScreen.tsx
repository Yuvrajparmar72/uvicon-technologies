"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Wrench,
  ShieldCheck,
  Cpu,
  Server,
  RefreshCw,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Zap,
  Activity,
  Globe
} from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";

export default function MaintenanceScreen() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(88);
  const [countdown, setCountdown] = useState({
    hours: "02",
    minutes: "45",
    seconds: "18"
  });

  // Countdown timer simulation for realistic tech feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let sec = parseInt(prev.seconds, 10) - 1;
        let min = parseInt(prev.minutes, 10);
        let hr = parseInt(prev.hours, 10);

        if (sec < 0) {
          sec = 59;
          min -= 1;
        }
        if (min < 0) {
          min = 59;
          hr = Math.max(0, hr - 1);
        }

        return {
          hours: String(hr).padStart(2, "0"),
          minutes: String(min).padStart(2, "0"),
          seconds: String(sec).padStart(2, "0")
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <main className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden bg-[#000B0C] text-[#E0E0E0] selection:bg-[#FFC050] selection:text-[#000B0C] font-[family-name:var(--font-body)]">
      {/* Dynamic Background Cyber Gradients & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, #2BA8A0 0%, #003D3F 60%, transparent 100%)"
          }}
        />
        <div
          className="absolute -bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, #FFC050 0%, #003D3F 70%, transparent 100%)"
          }}
        />
        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      {/* Top Navigation Bar with Logo and Live Status Pill */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between border-b border-[#1D3634]/60">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#003D3F] to-[#001E20] border border-[#2BA8A0]/30 p-2 shadow-lg flex items-center justify-center">
            <Image
              src="/assets/icons/uvicon-technologies-logo.webp"
              alt="Uvicon Technologies"
              width={40}
              height={40}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div>
            <span className="font-[family-name:var(--font-heading-main)] text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center gap-1.5">
              UVICON
              <span className="text-[#FFC050] text-sm tracking-widest font-normal">
                TECHNOLOGIES
              </span>
            </span>
            <p className="text-[11px] text-[#A0AAB2] tracking-wider uppercase font-medium">
              Enterprise Software & Next-Gen Cloud Solutions
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#001E20]/80 border border-[#2BA8A0]/40 backdrop-blur-md shadow-[0_0_15px_rgba(43,168,160,0.15)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC050] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFC050]"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider text-[#FFC050] uppercase font-mono">
            System Maintenance Active
          </span>
        </div>
      </header>

      {/* Main Hero & Maintenance Notice */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2BA8A0]/15 via-[#003D3F]/30 to-[#FFC050]/15 border border-[#2BA8A0]/30 backdrop-blur-md mb-6 shadow-sm">
          <Wrench className="w-4 h-4 text-[#FFC050] animate-spin" style={{ animationDuration: "8s" }} />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-white">
            Scheduled Upgrade & Infrastructure Maintenance
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2BA8A0]" />
          <span className="text-xs font-mono text-[#2BA8A0] font-medium">v2.4 Platform Deploy</span>
        </div>

        {/* Visual Animation Container */}
        <div className="w-48 h-48 sm:w-60 sm:h-60 relative mx-auto my-2 filter drop-shadow-[0_10px_25px_rgba(43,168,160,0.25)]">
          <LottiePlayer
            animationPath="/assets/lottie/uvicon-teal-computer.json"
            className="w-full h-full"
          />
        </div>

        {/* Main Headings */}
        <h1 className="font-[family-name:var(--font-heading-main)] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-white leading-tight mt-4">
          WE ARE UPGRADING <br />
          <span className="bg-gradient-to-r from-[#2BA8A0] via-[#5EEAD4] to-[#FFC050] bg-clip-text text-transparent">
            OUR PLATFORM EXPERIENCE
          </span>
        </h1>

        <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-[#A0AAB2] leading-relaxed font-[family-name:var(--font-body)]">
          Uvicon Technologies is currently performing scheduled hardware optimization, security protocol verification, and core engine upgrades. All public web portals and services are temporarily paused and will resume shortly.
        </p>

        {/* Real-Time Progress Bar & Countdown Card */}
        <div className="w-full max-w-2xl mt-8 p-5 sm:p-6 rounded-2xl bg-[#001517]/80 backdrop-blur-xl border border-[#1D3634] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#1D3634]/60">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs text-[#A0AAB2] uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#2BA8A0]" />
                Upgrade Progress
              </span>
              <div className="text-xl font-bold font-mono text-white mt-0.5">
                {progress}% Completed
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1 text-center font-mono">
                <div className="px-2.5 py-1.5 rounded-lg bg-[#00282A] border border-[#2BA8A0]/30 text-white font-bold text-sm">
                  {countdown.hours}
                  <span className="block text-[9px] text-[#A0AAB2] font-normal">HRS</span>
                </div>
                <span className="text-white font-bold">:</span>
                <div className="px-2.5 py-1.5 rounded-lg bg-[#00282A] border border-[#2BA8A0]/30 text-white font-bold text-sm">
                  {countdown.minutes}
                  <span className="block text-[9px] text-[#A0AAB2] font-normal">MIN</span>
                </div>
                <span className="text-white font-bold">:</span>
                <div className="px-2.5 py-1.5 rounded-lg bg-[#00282A] border border-[#FFC050]/40 text-[#FFC050] font-bold text-sm">
                  {countdown.seconds}
                  <span className="block text-[9px] text-[#FFC050]/80 font-normal">SEC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#00282A] rounded-full overflow-hidden mt-4 p-[1px] border border-[#2BA8A0]/20">
            <div
              className="h-full bg-gradient-to-r from-[#2BA8A0] via-[#5EEAD4] to-[#FFC050] rounded-full transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute inset-0 bg-white/25 animate-pulse" />
            </div>
          </div>

          {/* Infrastructure Health Sub-items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-left">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#001E20]/60 border border-[#1D3634]/60">
              <Server className="w-4 h-4 text-[#2BA8A0] shrink-0" />
              <div>
                <p className="text-[11px] text-[#A0AAB2]">Cloud Infrastructure</p>
                <p className="text-xs font-semibold text-white flex items-center gap-1">
                  Optimized <CheckCircle2 className="w-3 h-3 text-[#34C77D]" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#001E20]/60 border border-[#1D3634]/60">
              <Lock className="w-4 h-4 text-[#FFC050] shrink-0" />
              <div>
                <p className="text-[11px] text-[#A0AAB2]">Security Protocols</p>
                <p className="text-xs font-semibold text-white flex items-center gap-1">
                  Active Testing <span className="w-1.5 h-1.5 rounded-full bg-[#FFC050] animate-ping" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#001E20]/60 border border-[#1D3634]/60">
              <Cpu className="w-4 h-4 text-[#2BA8A0] shrink-0" />
              <div>
                <p className="text-[11px] text-[#A0AAB2]">Latency Tuning</p>
                <p className="text-xs font-semibold text-white">99.9% Readiness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification & Status Refresh */}
        <div className="w-full max-w-xl mt-8">
          {!isSubscribed ? (
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2.5 items-center">
              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB2]" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email for live notification..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#001E20]/90 border border-[#1D3634] text-sm text-white placeholder:text-[#A0AAB2]/70 focus:outline-none focus:border-[#2BA8A0] focus:ring-1 focus:ring-[#2BA8A0] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-[#2BA8A0] to-[#00595C] hover:from-[#3FC1B8] hover:to-[#003D3F] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(43,168,160,0.3)] shrink-0 cursor-pointer"
              >
                Notify Me <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-[#00282A] border border-[#2BA8A0]/40 flex items-center justify-center gap-2.5 text-[#34C77D] text-sm font-medium animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thank you! We will email you the moment systems are fully online.</span>
            </div>
          )}

          {/* Manual Refresh / Retry Button */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#A0AAB2]">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 text-xs text-[#2BA8A0] hover:text-[#5EEAD4] font-medium transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-[#001E20]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Checking system status..." : "Check System Status (Refresh)"}
            </button>
          </div>
        </div>

        {/* Emergency Assistance Direct Links */}
        <div className="mt-10 pt-6 border-t border-[#1D3634]/50 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0AAB2]">
          <span className="flex items-center gap-1.5 text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
            Need urgent project consultation or support?
          </span>

          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@uvicon.in"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FFC050] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#2BA8A0]" />
              contact@uvicon.in
            </a>
            <span className="text-[#1D3634]">•</span>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FFC050] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2BA8A0]" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Footer Information */}
      <footer className="relative z-10 w-full border-t border-[#1D3634]/60 py-4 px-4 sm:px-8 text-center text-xs text-[#A0AAB2]/70 font-mono">
        <p>
          &copy; {new Date().getFullYear()} Uvicon Technologies Pvt. Ltd. All systems monitored 24/7.
        </p>
      </footer>
    </main>
  );
}
