"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, ChevronDown, Home, Layers, CreditCard, BookOpen, Grid, LogIn, UserPlus } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { 
    name: "Products", href: "/softwares",
    icon: Layers,
    subItems: [
      { name: "Software", href: "/softwares" },
      { name: "Application", href: "/application" },
      { name: "Websites", href: "/websites" },
      { name: "Games", href: "/games" }
    ]
  },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
  { 
    name: "Resources", href: "/resources",
    icon: BookOpen,
    subItems: [
      { name: "About us", href: "/about-us" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Refund Policy", href: "/refund-policy" }
    ]
  },
  { 
    name: "More", href: "/more",
    icon: Grid,
    subItems: [
      { name: "Why Choose us ?", href: "/why-choose-us" },
      { name: "Faq's & Tutorials", href: "/faqs" },
      { name: "Our Visions & Values", href: "/visions" }
    ]
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path === '/') return 'TECHNOLOGIES';
    if (path === '/faqs') return 'TUTORIALS';
    if (path === '/visions') return 'VISION';
    // flatten all links and sublinks
    const allLinks = navLinks.flatMap(n => n.subItems ? [n, ...n.subItems] : [n]);
    const activeLink = allLinks.find(n => n.href === path);
    return activeLink ? activeLink.name.toUpperCase() : 'TECHNOLOGIES';
  };

  const pageTitle = getPageTitle(pathname);

  const isLinkActive = (link: any) => {
    if (pathname === link.href) return true;
    if (link.subItems && link.subItems.some((sub: any) => pathname === sub.href)) return true;
    return false;
  };

  const toggleSubmenu = (name: string) => {
    if (openSubmenu === name) {
      setOpenSubmenu(null); // close if already open
    } else {
      setOpenSubmenu(name); // open new one
    }
  };

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <>
      {/* Full-width Deep Teal Background Bar */}
      <div 
        className="fixed left-0 right-0 top-0 w-full z-40"
        style={{
          height: '5vh',
          background: 'rgba(0, 61, 63, 0.65)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      ></div>

      {/* Floating Glass Header Container */}
      {/* Mobile/Tablet margins: 20px sides, 10px top. Desktop (lg): 50px sides, 15px top */}
      <header className="fixed left-[20px] right-[20px] top-[10px] lg:left-[50px] lg:right-[50px] lg:top-[15px] z-50 transition-all duration-300">
        
        {/* Glass Background Layer */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          }}
        ></div>

        {/* Header Content */}
        <div className="relative w-full px-4 sm:px-6">
          <div className="flex items-center h-[8vh]">
            
            {/* Logo and Dynamic Title (Left Side) */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/assets/icons/uvicon-technologies-logo.webp"
                  alt="Uvicon Technologies"
                  width={60}
                  height={60}
                  className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                />
                {/* Text is hidden on mobile (<600px) and visible on tablet (600px) and up */}
                <div className="hidden min-[600px]:flex items-center gap-2 font-[family-name:var(--font-heading-main)]">
                  <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-[#FFC050] to-[#FFF] bg-clip-text text-transparent">
                    UVICON
                  </span>
                  <span className="text-xl font-medium tracking-widest text-white mt-1">
                    {pageTitle}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu (Center - Static) */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1 font-[family-name:var(--font-body)]">
                {navLinks.map((link) => {
                  const active = isLinkActive(link);
                  return (
                    <li key={link.name} className="relative group">
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1.5 transition-all text-[1.05rem] font-medium tracking-wide mx-1 ${
                          active 
                            ? 'px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                            : 'px-2 py-2 text-gray-200 hover:text-white'
                        }`}
                      >
                        {active && <link.icon className="w-4 h-4 text-[#FFC050]" />}
                        {link.name}
                        {link.subItems && <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                      </Link>

                    {/* Dropdown Submenu */}
                    {link.subItems && (
                      <div className="absolute left-1/2 -translate-x-1/2 pt-6 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                        <div 
                          className="p-2 flex flex-col gap-1"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '16px',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {link.subItems.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link 
                                key={sub.name} 
                                href={sub.href} 
                                className={`px-4 py-2.5 text-base rounded-xl transition-colors whitespace-nowrap text-center font-medium ${
                                  isSubActive ? 'bg-white/10 text-white font-semibold' : 'text-gray-200 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                )})}
              </ul>
            </nav>

            {/* Action Buttons (Right Side Desktop) */}
            <div className="hidden lg:flex flex-1 items-center justify-end gap-3 font-[family-name:var(--font-body)]">
              <a href="https://marketplace.uvicon.in" target="_blank" rel="noopener noreferrer" className="h-[38px] w-[38px] flex items-center justify-center rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
                <ShoppingCart className="w-5 h-5 text-white" />
              </a>
              <Link href="/login" className="h-[38px] px-5 rounded-xl font-semibold text-white bg-white/5 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md tracking-wide flex items-center justify-center">
                Login
              </Link>
              <Link href="/signup" className="h-[38px] px-5 rounded-xl font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md tracking-wide flex items-center justify-center">
                Sign Up
              </Link>
            </div>

            {/* Mobile & Tablet Right Side (Login + Hamburger) */}
            <div className="lg:hidden flex items-center justify-end flex-1 gap-3 font-[family-name:var(--font-body)]">
              <Link href="/login" className="h-[38px] px-4 rounded-xl font-semibold text-white bg-white/5 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md tracking-wide flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-[38px] w-[38px] flex items-center justify-center text-white hover:text-gray-300 focus:outline-none bg-white/5 border border-white/20 rounded-xl transition-all backdrop-blur-md"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-[100%] left-0 w-full mt-2 lg:hidden">
              <div 
                className="p-5 rounded-2xl flex flex-col gap-2 font-[family-name:var(--font-body)]"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              >
                {navLinks.map((link) => {
                  const active = isLinkActive(link);
                  return (
                    <div key={link.name}>
                      
                      {/* Main Link or Submenu Toggle */}
                      <button
                        onClick={() => {
                          if (link.subItems) {
                            toggleSubmenu(link.name);
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={`w-full flex items-center justify-between font-medium py-3 px-4 rounded-xl transition-all text-lg ${
                          active
                            ? 'bg-white/10 border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                            : 'text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {active && <link.icon className="w-5 h-5 text-[#FFC050]" />}
                          {!link.subItems ? (
                            <Link href={link.href} className="w-full text-left">{link.name}</Link>
                          ) : (
                            <span>{link.name}</span>
                          )}
                        </div>

                        {link.subItems && (
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSubmenu === link.name ? 'rotate-180 text-[#FFC050]' : 'opacity-70'}`} />
                        )}
                      </button>

                    {/* Accordion Submenu Items */}
                    {link.subItems && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${openSubmenu === link.name ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="border-l-2 border-white/10 ml-5 pl-4 flex flex-col gap-1 mt-1 mb-2">
                          {link.subItems.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className={`text-[1.05rem] font-medium py-2.5 transition-colors flex items-center gap-2 ${
                                  isSubActive ? 'text-[#FFC050]' : 'text-gray-300 hover:text-white'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-[#FFC050]' : 'bg-white/30'}`}></span>
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )})}
                
                {/* Bottom Action Buttons */}
                <div className="pt-4 flex gap-3 border-t border-white/10 mt-2">
                  <Link href="/signup" className="flex-1 h-[42px] rounded-xl font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md tracking-wide flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                  <a href="https://marketplace.uvicon.in" target="_blank" rel="noopener noreferrer" className="h-[42px] w-[50px] flex items-center justify-center rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
