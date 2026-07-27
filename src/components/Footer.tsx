"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on authentication pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <footer className="w-full relative z-30 -mt-20 sm:-mt-24 lg:-mt-32 font-[family-name:var(--font-body)]">
      
      {/* Floating CTA Section */}
      <div className="w-full px-4 sm:px-6 lg:px-16 relative z-40 -mb-24 sm:-mb-16">
        <div className="max-w-6xl mx-auto relative rounded-[2.5rem] md:rounded-[4rem] py-10 px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Glass Background Layer (Matching Header Style) */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[#003D3F]/85 dark:bg-[#003D3F]/60 backdrop-blur-[16px] backdrop-saturate-[180%] border border-white/10 border-t-white/30 rounded-[2.5rem] md:rounded-[4rem] shadow-lg"
            style={{ zIndex: -1 }}
          ></div>

          <div className="flex flex-col gap-2 text-center lg:text-left relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-white tracking-wide font-[family-name:var(--font-heading-main)] drop-shadow-md">
              "Have a Question? <span className="text-[#FFC050]">Let's Talk.</span>"
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-[19px] font-medium font-[family-name:var(--font-body)] italic mt-1">
              "We are here to help you grow."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto shrink-0 relative z-10">
            <input 
              type="text" 
              placeholder="Enter Email or Phone No." 
              className="w-full sm:w-72 md:w-[340px] px-5 py-4 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC050] text-[15px] shadow-inner"
            />
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#002829] hover:bg-black text-white font-bold tracking-wider transition-colors shadow-lg shrink-0 text-[14px] uppercase border border-white/10">
              Request Call
            </button>
          </div>

        </div>
      </div>

      <div className="bg-text-primary/5 backdrop-blur-[24px] backdrop-saturate-[180%] border-t border-border/50 border-t-border/80 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] pt-36 sm:pt-32 pb-6 px-4 sm:px-6 lg:px-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Section - Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-8">
            
            {/* Column 1: Brand Info */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col gap-3">
              <Link href="/" className="flex items-center gap-3 w-fit lg:-mt-2">
                <Image
                  src="/assets/icons/uvicon-technologies-logo.webp"
                  alt="Uvicon Technologies"
                  width={64}
                  height={64}
                  className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                />
                <div className="flex items-center gap-2.5 font-[family-name:var(--font-heading-main)]">
                  <span className="text-2xl lg:text-3xl font-extrabold tracking-wider text-[#FFC050] drop-shadow-md">
                    UVICON
                  </span>
                  <span className="text-xl lg:text-2xl font-bold tracking-widest text-[#003D3F] dark:text-white mt-1">
                    TECHNOLOGIES
                  </span>
                </div>
              </Link>
              <p className="text-text-secondary leading-relaxed max-w-sm text-sm lg:text-[15px] font-[family-name:var(--font-body)]">
                Building high-performance custom websites, mobile applications, games, and advanced algorithm trading solutions with modern, premium aesthetics.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-text-primary/5 border border-border/50 flex items-center justify-center text-text-secondary hover:text-brand-accent hover:bg-text-primary/10 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-text-primary/5 border border-border/50 flex items-center justify-center text-text-secondary hover:text-brand-accent hover:bg-text-primary/10 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-text-primary/5 border border-border/50 flex items-center justify-center text-text-secondary hover:text-brand-accent hover:bg-text-primary/10 transition-all shadow-sm">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-text-primary/5 border border-border/50 flex items-center justify-center text-text-secondary hover:text-brand-accent hover:bg-text-primary/10 transition-all shadow-sm">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Products */}
            <nav className="flex flex-col gap-4 col-span-1 lg:col-span-2" aria-label="Footer Products Navigation">
              <h4 className="text-base font-semibold tracking-wider text-text-primary uppercase font-[family-name:var(--font-heading-section)]">
                Products
              </h4>
              <ul className="flex flex-col gap-3 text-sm lg:text-[15px] font-[family-name:var(--font-body)]">
                <li><Link href="/softwares" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Software</Link></li>
                <li><Link href="/application" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Application</Link></li>
                <li><Link href="/websites" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Websites</Link></li>
                <li><Link href="/games" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Games</Link></li>
              </ul>
            </nav>

            {/* Column 3: Resources */}
            <nav className="flex flex-col gap-4 col-span-1 lg:col-span-2" aria-label="Footer Resources Navigation">
              <h4 className="text-base font-semibold tracking-wider text-text-primary uppercase font-[family-name:var(--font-heading-section)]">
                Resources
              </h4>
              <ul className="flex flex-col gap-3 text-sm lg:text-[15px] font-[family-name:var(--font-body)]">
                <li><Link href="/pricing" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Pricing</Link></li>
                <li><Link href="/about-us" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> About Us</Link></li>
                <li><Link href="/faqs" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> FAQ & Tutorials</Link></li>
                <li><Link href="/why-choose-us" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Why Choose Us?</Link></li>
              </ul>
            </nav>

            {/* Column 4: Legal */}
            <nav className="flex flex-col gap-4 col-span-1 lg:col-span-2" aria-label="Footer Legal Navigation">
              <h4 className="text-base font-semibold tracking-wider text-text-primary uppercase font-[family-name:var(--font-heading-section)]">
                Legal
              </h4>
              <ul className="flex flex-col gap-3 text-sm lg:text-[15px] font-[family-name:var(--font-body)]">
                <li><Link href="/privacy-policy" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Privacy Policy</Link></li>
                <li><Link href="/refund-policy" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Refund Policy</Link></li>
                <li><Link href="/visions" className="text-text-secondary hover:text-brand-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50"></span> Our Vision & Values</Link></li>
              </ul>
            </nav>

            {/* Column 5: Contact Us */}
            <address className="flex flex-col gap-4 col-span-1 sm:col-span-2 lg:col-span-2 not-italic">
              <h4 className="text-base font-semibold tracking-wider text-text-primary uppercase font-[family-name:var(--font-heading-section)]">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm lg:text-[15px] font-[family-name:var(--font-body)] text-text-secondary">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed">123 Tech Park, Innovation Drive, Cyber City, IN 400001</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="tel:+919876543210" className="hover:text-brand-accent transition-colors">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-brand-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:contact@uvicon.in" className="hover:text-brand-accent transition-colors">contact@uvicon.in</a>
                </li>
              </ul>
            </address>

          </div>

          {/* Compliance Disclaimer Section (Crucial for Algo/Trading rules) */}
          <div className="border-t border-border/50 pt-6">
            <p className="text-xs text-text-secondary/70 leading-relaxed font-[family-name:var(--font-body)] text-justify max-w-5xl">
              <strong>Risk Warning & Disclaimer:</strong> Uvicon Technologies provides software development services and algorithmic tools for educational and technical purposes only. We do not provide financial advice, and our tools do not guarantee returns, assured profit, or risk-free trading. Trading in financial markets involves substantial risk of loss and is not suitable for every investor. Past performance is not indicative of future results. The user assumes full responsibility for any trading decisions made based on our software or strategies.
            </p>
          </div>
          
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#003D3F]/80 dark:bg-[#001f20]/80 backdrop-blur-[24px] backdrop-saturate-[180%] w-full py-4 px-4 sm:px-6 lg:px-16 border-t border-white/10 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/90">
          <p className="text-sm font-[family-name:var(--font-body)] tracking-wide">
            &copy; {new Date().getFullYear()} Uvicon Technologies. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-[family-name:var(--font-body)] tracking-wide">
            <span>Designed with Precision</span>
            <span className="w-1 h-1 rounded-full bg-white/50"></span>
            <span>Built for Performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
