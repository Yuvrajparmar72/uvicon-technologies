"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

/* ── Navigation Data ── */
interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    children: [
      { label: "Websites", href: "/websites" },
      { label: "Softwares", href: "/softwares" },
      { label: "Applications", href: "/applications" },
      { label: "Games", href: "/games" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Why Choose Us?", href: "/why-choose-us" },
      { label: "FAQs & Tutorials", href: "/faqs-tutorials" },
      { label: "Our Vision & Values", href: "/our-vision-values" },
    ],
  },
];

/* ── SVG Icons ── */
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

/* ── Desktop Dropdown ── */
function DesktopDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isChildActive = item.children?.some((c) => pathname === c.href);

  return (
    <div className={styles.dropdownWrapper}>
      <button
        className={`${styles.navLink} ${isChildActive ? styles.active : ""}`}
        aria-haspopup="true"
        aria-expanded="false"
        type="button"
      >
        {item.label}
        <ChevronDown className={styles.chevron} />
      </button>

      <div className={styles.dropdownMenu} role="menu">
        {item.children!.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className={`${styles.dropdownItem} ${
              pathname === child.href ? styles.active : ""
            }`}
            role="menuitem"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile Accordion Item ── */
function MobileAccordion({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isChildActive = item.children?.some((c) => pathname === c.href);

  return (
    <li>
      <button
        className={`${styles.mobileNavLink} ${
          isChildActive ? styles.active : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        type="button"
      >
        {item.label}
        <ChevronDown
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      <div
        className={`${styles.mobileSubMenu} ${
          open ? styles.subMenuOpen : ""
        }`}
      >
        {item.children!.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className={`${styles.mobileSubItem} ${
              pathname === child.href ? styles.active : ""
            }`}
            onClick={onNavigate}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

/* ══════════════════════════════════════════════
   HEADER COMPONENT
   ══════════════════════════════════════════════ */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close drawer on route change ── */
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        id="site-header"
      >
        {/* Front layer — Floating glassmorphism bar */}
        <div className={styles.headerFloat}>
          <div className={styles.headerInner}>
            {/* Logo (left) */}
            <Link
              href="/"
              className={styles.logo}
              aria-label="Uvicon Technologies — Home"
            >
              <Image
                src="/assets/icons/uvicon-technologies-logo.webp"
                alt="Uvicon Technologies logo"
                width={200}
                height={48}
                className={styles.logoImage}
                unoptimized
              />
            </Link>

            {/* Desktop Navigation — Pill-shaped center menu */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              <div className={styles.navPill}>
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <DesktopDropdown
                      key={item.label}
                      item={item}
                      pathname={pathname}
                    />
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      className={`${styles.navLink} ${
                        pathname === item.href ? styles.active : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </nav>

            {/* Right Actions */}
            <div className={styles.headerActions}>
              {/* Cart icon — visible on tablet+ */}
              <a
                href="#"
                className={styles.cartIcon}
                aria-label="Shopping cart"
              >
                <CartIcon />
              </a>

              {/* Login — visible on all */}
              <a
                href="https://auth.uvicon.in/login"
                className={styles.loginLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </a>

              {/* Get Started — visible on desktop only */}
              <a
                href="https://auth.uvicon.in/signup"
                className={styles.ctaButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>

              {/* Hamburger — visible on mobile/tablet */}
              <button
                className={`${styles.hamburger} ${
                  drawerOpen ? styles.hamburgerOpen : ""
                }`}
                onClick={toggleDrawer}
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
                aria-expanded={drawerOpen}
                type="button"
              >
                <span className={styles.hamburgerIcon}>
                  <span className={styles.hamburgerLine} />
                  <span className={styles.hamburgerLine} />
                  <span className={styles.hamburgerLine} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        className={`${styles.mobileDrawer} ${
          drawerOpen ? styles.drawerOpen : ""
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <ul className={styles.mobileNavList}>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <MobileAccordion
                key={item.label}
                item={item}
                pathname={pathname}
                onNavigate={closeDrawer}
              />
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  className={`${styles.mobileNavLink} ${
                    pathname === item.href ? styles.active : ""
                  }`}
                  onClick={closeDrawer}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className={styles.mobileActions}>
          <a
            href="https://auth.uvicon.in/login"
            className={styles.mobileLoginLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <a
            href="https://auth.uvicon.in/signup"
            className={styles.mobileCtaButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${
          drawerOpen ? styles.overlayVisible : ""
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
    </>
  );
}
