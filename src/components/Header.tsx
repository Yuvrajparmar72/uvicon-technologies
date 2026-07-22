"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, ChevronDown, Home, Layers, CreditCard, BookOpen, Grid, LogIn, UserPlus, Code2, Cpu, Globe, Smartphone, Cloud, Database, Monitor, Zap, Shield, Wifi, Server, Settings, Lock, Network, Share2, Key, BarChart3, Binary, Blocks, Infinity, Terminal, Code, HardDrive, Compass, Focus, CircuitBoard, Activity, Bluetooth, Fingerprint } from "lucide-react";

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
      {/* Full-width Semantic Theme Background Bar */}
      <div 
        className="fixed left-0 right-0 top-0 w-full z-40 bg-brand-primary/65 backdrop-blur-md border-b border-border/20"
        style={{ height: '5vh' }}
      ></div>

      {/* Floating Glass Header Container */}
      {/* Mobile/Tablet margins: 20px sides, 10px top. Desktop (lg): 50px sides, 15px top */}
      <header className="fixed left-[20px] right-[20px] top-[10px] lg:left-[50px] lg:right-[50px] lg:top-[15px] z-50 transition-all duration-300">
        
        {/* Glass Background Layer */}
        <div 
          className="absolute inset-0 pointer-events-none bg-text-primary/5 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 rounded-2xl shadow-lg"
          style={{ zIndex: -2 }}
        ></div>

        {/* Decorative Background Icons (Inside Header, perfectly even distribution) */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-25 blur-[2px]" style={{ zIndex: -1 }}>
          <Code2 className="absolute top-[15%] left-[1%] w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white rotate-12" />
          <Cloud className="absolute bottom-[10%] left-[4%] hidden md:block md:w-7 md:h-7 lg:w-9 lg:h-9 text-white -rotate-12" />
          <Globe className="absolute top-[45%] left-[7%] w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white rotate-45" />
          <Monitor className="absolute top-[5%] left-[10%] hidden md:block md:w-5 md:h-5 lg:w-6 lg:h-6 text-white rotate-[15deg]" />
          <Binary className="absolute bottom-[20%] left-[13%] w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white -rotate-6" />
          <Shield className="absolute top-[30%] left-[16%] hidden md:block md:w-6 md:h-6 lg:w-8 lg:h-8 text-white rotate-45" />
          <Key className="absolute bottom-[5%] left-[19%] w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white -rotate-[45deg]" />
          <Blocks className="absolute top-[60%] left-[22%] hidden md:block md:w-7 md:h-7 lg:w-9 lg:h-9 text-white rotate-12" />
          <Network className="absolute top-[10%] left-[25%] w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white -rotate-[20deg]" />
          <Cpu className="absolute bottom-[15%] left-[28%] hidden md:block md:w-8 md:h-8 lg:w-10 lg:h-10 text-white -rotate-12" />
          <Server className="absolute top-[40%] left-[31%] w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white rotate-[15deg]" />
          <Zap className="absolute top-[5%] left-[34%] hidden md:block md:w-6 md:h-6 lg:w-8 lg:h-8 text-white -rotate-12" />
          <Smartphone className="absolute bottom-[10%] left-[37%] w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white -rotate-6" />
          <Lock className="absolute top-[70%] left-[40%] hidden md:block md:w-5 md:h-5 lg:w-7 lg:h-7 text-white rotate-[10deg]" />
          <Database className="absolute top-[20%] left-[43%] w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white -rotate-45" />
          <Wifi className="absolute bottom-[5%] left-[46%] hidden md:block md:w-6 md:h-6 lg:w-8 lg:h-8 text-white -rotate-12" />
          <Terminal className="absolute top-[45%] left-[49%] w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white rotate-45" />
          <Code className="absolute top-[10%] left-[52%] hidden md:block md:w-4 md:h-4 lg:w-6 lg:h-6 text-white -rotate-[30deg]" />
          <HardDrive className="absolute bottom-[25%] left-[55%] w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white rotate-12" />
          <Compass className="absolute top-[35%] left-[58%] hidden md:block md:w-5 md:h-5 lg:w-6 lg:h-6 text-white -rotate-45" />
          <Focus className="absolute bottom-[5%] left-[61%] w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white rotate-[20deg]" />
          <CircuitBoard className="absolute top-[60%] left-[64%] hidden md:block md:w-6 md:h-6 lg:w-8 lg:h-8 text-white -rotate-12" />
          <Activity className="absolute top-[15%] left-[67%] w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white rotate-45" />
          <Bluetooth className="absolute bottom-[10%] left-[70%] hidden md:block md:w-4 md:h-4 lg:w-5 lg:h-5 text-white -rotate-[15deg]" />
          <Fingerprint className="absolute top-[45%] left-[73%] w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white -rotate-12" />
          <Blocks className="absolute top-[5%] left-[76%] hidden md:block md:w-4 md:h-4 lg:w-6 lg:h-6 text-white rotate-[35deg]" />
          <Key className="absolute bottom-[20%] left-[79%] w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white rotate-45" />
          <Globe className="absolute top-[30%] left-[82%] hidden md:block md:w-5 md:h-5 lg:w-6 lg:h-6 text-white -rotate-[20deg]" />
          <Terminal className="absolute bottom-[5%] left-[85%] w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white rotate-12" />
          <Database className="absolute top-[70%] left-[88%] hidden md:block md:w-5 md:h-5 lg:w-7 lg:h-7 text-white -rotate-45" />
          <Code2 className="absolute top-[15%] left-[91%] w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white rotate-[15deg]" />
          <Wifi className="absolute bottom-[10%] left-[94%] hidden md:block md:w-5 md:h-5 lg:w-6 lg:h-6 text-white -rotate-12" />
          <Cloud className="absolute top-[40%] left-[97%] w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white rotate-[10deg]" />
        </div>

        {/* Header Content */}
        <div className="relative w-full px-4 sm:px-6 z-10">
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
                <div className="hidden min-[600px]:flex items-center gap-2 font-[family-name:var(--font-heading-main)]">
                  <span className="text-[26px] md:text-3xl font-extrabold tracking-wider text-[#FFC050] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    UVICON
                  </span>
                  <span className="text-xl font-bold tracking-widest text-[#003D3F] dark:text-white mt-1">
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
                        className={`flex items-center gap-1.5 transition-all text-[1.05rem] font-semibold tracking-wide mx-1 ${
                          active 
                            ? 'px-4 py-2 rounded-xl bg-text-primary/10 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 text-text-primary shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
                            : 'px-2 py-2 text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {active && <link.icon className="w-4 h-4 text-brand-accent" />}
                        {link.name}
                        {link.subItems && <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                      </Link>

                    {/* Dropdown Submenu */}
                    {link.subItems && (
                      <div className="absolute left-1/2 -translate-x-1/2 pt-6 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                        <div 
                          className="p-2 flex flex-col gap-1 bg-surface-alt/90 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 rounded-2xl shadow-lg"
                        >
                          {link.subItems.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link 
                                key={sub.name} 
                                href={sub.href} 
                                className={`px-4 py-2.5 text-base rounded-xl transition-all whitespace-nowrap text-center font-medium ${
                                  isSubActive ? 'bg-text-primary/10 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 text-text-primary font-semibold shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-text-primary/5 border border-transparent'
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
              <a href="https://marketplace.uvicon.in" target="_blank" rel="noopener noreferrer" className="h-[38px] w-[38px] flex items-center justify-center rounded-xl bg-text-primary/5 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 hover:bg-text-primary/10 transition-all shadow-sm">
                <ShoppingCart className="w-5 h-5 text-text-primary" />
              </a>
              <Link href="/login" className="h-[38px] px-5 rounded-xl font-semibold text-text-primary bg-text-primary/5 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 hover:bg-text-primary/10 transition-all tracking-wide flex items-center justify-center shadow-sm">
                Login
              </Link>
              <Link href="/signup" className="h-[38px] px-5 rounded-xl font-semibold text-text-primary bg-text-primary/10 backdrop-blur-[16px] backdrop-saturate-[180%] border border-brand-accent/30 border-t-brand-accent/50 hover:bg-brand-accent hover:text-[#021213] hover:border-transparent transition-all tracking-wide flex items-center justify-center shadow-[0_0_15px_rgba(255,192,80,0.15)]">
                Sign Up
              </Link>
            </div>

            {/* Mobile & Tablet Right Side (Login + Hamburger) */}
            <div className="lg:hidden flex items-center justify-end flex-1 gap-3 font-[family-name:var(--font-body)]">
              <Link href="/login" className="h-[38px] px-4 rounded-xl font-semibold text-text-primary bg-text-primary/5 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 hover:bg-text-primary/10 transition-all tracking-wide flex items-center justify-center gap-2 shadow-sm">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-[38px] w-[38px] flex items-center justify-center text-text-primary hover:text-brand-accent focus:outline-none bg-text-primary/5 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 rounded-xl transition-all shadow-sm"
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
                className="p-5 rounded-2xl flex flex-col gap-2 font-[family-name:var(--font-body)] bg-text-primary/5 backdrop-blur-[24px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 shadow-2xl"
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
                            ? 'bg-text-primary/10 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 text-text-primary shadow-sm'
                            : 'text-text-primary hover:bg-text-primary/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {active && <link.icon className="w-5 h-5 text-brand-accent" />}
                          {!link.subItems ? (
                            <Link href={link.href} className="w-full text-left">{link.name}</Link>
                          ) : (
                            <span>{link.name}</span>
                          )}
                        </div>

                        {link.subItems && (
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSubmenu === link.name ? 'rotate-180 text-brand-accent' : 'opacity-70 text-text-secondary'}`} />
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
                                  isSubActive ? 'text-brand-accent' : 'text-text-secondary hover:text-text-primary'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-brand-accent' : 'bg-text-primary/30'}`}></span>
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
                <div className="pt-4 flex gap-3 border-t border-border mt-2">
                  <Link href="/signup" className="flex-1 h-[42px] rounded-xl font-semibold text-text-primary bg-text-primary/10 backdrop-blur-[16px] backdrop-saturate-[180%] border border-brand-accent/30 border-t-brand-accent/50 hover:bg-brand-accent hover:text-[#021213] hover:border-transparent transition-all tracking-wide flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,192,80,0.15)]" onClick={() => setIsMobileMenuOpen(false)}>
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                  <a href="https://marketplace.uvicon.in" target="_blank" rel="noopener noreferrer" className="h-[42px] w-[50px] flex items-center justify-center rounded-xl bg-text-primary/5 backdrop-blur-[16px] backdrop-saturate-[180%] border border-border/50 border-t-border/80 hover:bg-text-primary/10 transition-all shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart className="w-5 h-5 text-text-primary" />
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
