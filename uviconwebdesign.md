# UVICON TECHNOLOGIES — Website Design & Content System
**Version 1.0 — Single source of truth for all pages**

---

## 0. HOW TO USE THIS FILE (read this first, every time)

This file is the permanent design + content contract for the Uvicon marketing website. Any AI agent (Gemini 3.1 Pro, Claude, or any other model inside Antigravity) building or editing a page on this site **must read this entire file before writing any code**, and every decision about color, type, spacing, animation, and copy must trace back to a rule here — not to the model's default instincts.

**Prompt template to use every time you ask the AI to build/edit a page:**
> "Read DESIGN_SYSTEM.md completely first. Then build/edit [page name] following every rule in it exactly — colors, type scale, spacing, breakpoints, animation limits, SEO/GEO structure, and the relevant page template in Section 11. Do not introduce new colors, fonts, or layout patterns that aren't defined in this file. If something is genuinely not covered, flag it to me instead of improvising."

If the AI ever starts a fresh session with no memory of past pages, this file alone should be enough for it to produce a page that looks and reads like it was built by the same person who built every other page.

Keep this file at the project root as `DESIGN_SYSTEM.md`. If your Antigravity setup supports a project-level Skills folder, you can additionally copy it into `skills/uvicon-design-system/SKILL.md`, but always reference it by name in your prompt too — don't rely on silent auto-loading.

---

## 1. PROJECT SCOPE — what this codebase is and isn't

**This repo is ONLY the public marketing/content website** — the pages a visitor sees before they log in: Home, Products, Pricing, About, FAQ, Blog, Contact, Legal pages, and the individual product pages (including the Algo product page).

**Out of scope — do not rebuild, redesign, or touch these:**
- Login / Signup flows → live at `auth.uvicon.in`
- The Algo trading web app / dashboard → live at `pro.uvicon.in`
- Any other product's logged-in application screens

This codebase should only ever **link out** to those subdomains (e.g., a "Login" button that points to `https://auth.uvicon.in/login`, a "Sign Up" button that points to `https://auth.uvicon.in/signup`). Never attempt to recreate app functionality here.

**Stack:**
- Framework: Next.js (React), deployed on Vercel
- Styling: CSS variables (tokens defined in Section 2–4) + utility classes or CSS Modules — pick one approach and stay consistent across the whole project
- Animation: Framer Motion (component/page transitions), GSAP (scroll-triggered sequences), native CSS transitions (hover/micro-interactions)
- Theme: Light mode by default, with a dark mode toggle (see Section 2)

**Preserve existing URLs.** The current site already has indexed pages at `/websites/`, `/softwares/`, `/applications/`, `/games/`, `/pricing/`, `/about-us/`, `/why-choose-us/`, `/faqs-tutorials/`, `/our-vision-values/`, `/privacy-policy/`, `/refund-policy/`. Keep these exact slugs in the rebuild so existing search rankings and backlinks aren't lost. Only add new slugs for genuinely new pages (e.g. a dedicated Algo product page, a `/blog/` section).

---

## 2. COLOR SYSTEM

Brand primary is the existing Uvicon teal — **do not change this value.**

### Light mode (default)
```css
--color-bg:              #FDFBF7;   /* Cream White */
--color-surface:         #FFFFFF;   /* Pure White */
--color-surface-alt:     #F4F1EA;   /* Slightly darker cream */
--color-text-primary:    #333333;   /* Dark Grey */
--color-text-secondary:  #555555;   /* Medium Grey */
--color-primary:         #003D3F;   /* Deep Teal */
--color-primary-hover:   #00595C;
--color-accent:          #FFC050;   /* Golden */
--color-accent-hover:    #E6A639;
--color-border:          #E3E7E6;
--color-success:         #1E8E5A;   
--color-danger:          #C1443B;   
```

### Dark mode
```css
--color-bg:              #021213;   /* Very Dark Teal */
--color-surface:         #062325;   /* Dark Teal Surface */
--color-surface-alt:     #0A3437;   
--color-text-primary:    #E0E0E0;   /* Light Grey */
--color-text-secondary:  #A0AAB2;   
--color-primary:         #2BA8A0;   /* Lightened Teal */
--color-primary-hover:   #3FC1B8;
--color-accent:          #FFC050;   /* Golden */
--color-accent-hover:    #F0C685;
--color-border:          #1D3634;
--color-success:         #34C77D;
--color-danger:          #E5645A;
```

### Color rules
- `--color-success` (green) and `--color-danger` (red) are **reserved exclusively for real trading data** (gains/losses in screenshots, live stats, chart demos). Never use them as decorative brand accents anywhere else — this keeps the site from looking like it's making implicit performance promises.
- The gold accent (`--color-accent`) is the only color allowed for CTA buttons and highlighted UI states. Don't introduce a second accent color.
- Every text/background pairing must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text). Check this for both light and dark mode.

---

## 3. TYPOGRAPHY SYSTEM

Three-font system, all free on Google Fonts:

| Role | Font | Why |
|---|---|---|
| Main Headings (H1) | **Alegreya Sans SC** | Distinctive, elegant small-caps look for the most prominent titles |
| Section Headings (H2/H3) | **Tourney** | Bold and highly stylized for separating sections visually |
| Body & Data | **Open Sans** | Highly legible, clean, and reliable across all devices for paragraphs and numbers |

Load only the weights actually used (400, 500, 600, 700) with `font-display: swap`.

### Responsive type scale

| Element | Mobile (<640px) | Tablet (640–1023px) | Desktop (≥1024px) | Weight | Font |
|---|---|---|---|---|---|
| H1 | 32px / 1.15 | 44px / 1.15 | 56px / 1.1 | 700 | Alegreya Sans SC |
| H2 | 26px / 1.2 | 32px / 1.2 | 40px / 1.15 | 700 | Tourney |
| H3 | 22px / 1.3 | 26px / 1.3 | 30px / 1.25 | 600 | Tourney |
| H4 | 18px / 1.4 | 20px / 1.4 | 22px / 1.35 | 600 | Open Sans |
| Body large (intro paragraphs) | 16px / 1.6 | 17px / 1.6 | 18px / 1.6 | 400 | Open Sans |
| Body (default) | 15px / 1.6 | 16px / 1.6 | 16px / 1.6 | 400 | Open Sans |
| Small / caption | 13px / 1.5 | 13px / 1.5 | 14px / 1.5 | 400 | Open Sans |
| Button label | 15px | 15px | 16px | 600 | Open Sans |
| Data / stat number | 14px | 15px | 16px | 600 | Open Sans |
| Nav link | 14px | 15px | 15px | 600 | Open Sans |

### Rules
- Exactly **one H1 per page.**
- Never skip heading levels (don't go H2 → H4).
- Body text line length: keep to 60–75 characters per line on desktop for readability — constrain paragraph width even inside a wider container.

---

## 4. LAYOUT, SPACING & BREAKPOINTS

### Breakpoints
```css
/* Mobile:  0–639px   (default, mobile-first) */
/* Tablet:  640–1023px */
/* Desktop: 1024–1439px */
/* Wide:    1440px+ */
```

### Container widths
- Max content width: 1200px, centered
- Side padding: 20px mobile / 40px tablet / 64px desktop

### Spacing scale (use only these values — no arbitrary spacing)
```
4px  8px  12px  16px  24px  32px  48px  64px  96px  128px
```
- Section vertical padding: 64px mobile / 96px tablet / 128px desktop
- Card internal padding: 16px mobile / 24px desktop
- Gap between grid items: 16px mobile / 24px desktop

---

## 5. COMPONENTS (core tokens)

- **Buttons:** Primary (filled, `--color-accent` background, dark text), Secondary (outlined, `--color-primary` border), Ghost (text-only, underline on hover). Minimum tap target 44×44px on mobile. Every interactive element needs a visible focus ring (`2px solid var(--color-accent)`, offset 2px) for keyboard users.
- **Cards:** `--color-surface` background (semi-transparent where possible), 1px `--color-border`, 12px border-radius, subtle shadow on hover only. **Use Glassmorphism:** Apply a frosted glass effect using `backdrop-filter: blur(10px)` with a semi-transparent background color (especially in dark mode) for a premium, modern look.
- **Nav bar:** Sticky, Glassmorphism applied (translucent background with background-blur) with a 1px bottom border once scrolled.
- **Expandable Sections (Accordions/Tabs/Read More):** Use heavily for "Progressive Disclosure." Keep the default view minimalist, but allow users to click/expand to read deep technical details.
- **Forms:** Label above field always (never placeholder-only labels), visible error state in `--color-danger` with a specific message, not just a red border.
- Respect `prefers-reduced-motion`: when set, disable scroll-triggered and looping animations; keep only essential state-change transitions.

---

## 6. MOTION & ANIMATION GUIDELINES

- **One bold animation moment per page** (usually the hero) — everything else should be quiet and short. Scattered animation everywhere reads as generic/AI-templated, not premium.
- **Hero section:** a single orchestrated load-in sequence (e.g., an animated chart/strategy line drawing itself, or a staged text+visual reveal) built with Framer Motion or GSAP. Duration 600–1200ms, easing `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo feel) for a precise, confident motion — avoid bouncy/elastic easing, it undercuts the trust/precision positioning.
- **Scroll-triggered reveals:** fine for section entrances (fade + 16px upward translate, 400–500ms), but don't animate every single element individually — group related elements into one animation trigger.
- **Micro-interactions:** button hover/press states use simple 150–200ms CSS transitions, nothing elaborate.
- **Avoid:** heavy autoplay video backgrounds (bandwidth cost), parallax effects that cause layout jank on low-end phones, animated gradients/blobs as filler decoration.
- No animation should block or delay a user from reading content or taking an action.

---

## 7. CONTENT & WRITING STYLE

- **Tone:** Direct, confident, plain-spoken. Short sentences. No hype words ("revolutionary," "game-changing," "unbeatable"). No filler ("in today's fast-paced digital world...").
- **Progressive Disclosure (Minimalist + Expandable):** Keep the initial visible text minimal, punchy, and scannable. Do not overwhelm the user with walls of text. For users who want deep technical details, place that extra information inside expandable sections (Accordions, Modals, or "Read More" toggles).
- **Write from the reader's side of the screen.** Say what they get and what they do, not how the system works internally. "Build your strategy in minutes," not "Our proprietary engine leverages advanced logic."
- **Active voice, consistent verbs.** If a button says "Start Free Trial," the confirmation should say "Trial started" — never rename the same action mid-flow.
- **Headings should be specific, not clever.** A heading's job is to let someone scanning the page know exactly what the section contains.
- **CTAs describe the actual next step:** "Book a Free Consultation," "See Pricing," "Start Building" — never a bare "Learn More" or "Submit."

### Mandatory compliance language rules — Algo / trading-related pages only
These rules apply to any page describing the Algo product, its strategies, or trading results:
- **Never use:** "guaranteed returns," "assured profit," "risk-free," "no-loss strategy," or any wording implying certain outcomes.
- **Never state or imply specific profit figures or win-rates as a promise** — real user testimonials with specific numbers are fine to quote, but marketing copy itself must not assert them as expected outcomes.
- Describe the "copy admin strategy" feature (if shown at all) in **understated, factual terms** — as an optional feature, not a headline sales pitch — per the separate compliance discussion already had about this feature's current regulatory status.
- Keep the existing footer disclaimer text (or equivalent) on every page that mentions the Algo product, not just the homepage.
- Prefer showing the "build your own strategy + backtest" capability as the lead value proposition over the auto-copy-trade feature.

---

## 8. SEO REQUIREMENTS (every page)

- **Title tag:** 50–60 characters, primary keyword near the front, brand name at the end (`Algo Trading Software India | Uvicon`).
- **Meta description:** 140–160 characters, includes primary keyword, states the concrete benefit, ends with an implicit reason to click.
- **URL slugs:** lowercase, hyphenated, short, keyword-relevant. Preserve all existing slugs listed in Section 1.
- **One H1 per page**, containing the primary keyword naturally.
- **Image alt text:** describes the image content and includes relevant keywords only where genuinely accurate — never keyword-stuff alt text.
- **Internal linking:** every product page links to at least 2 related pages (e.g., Algo page links to Pricing and FAQ).
- **Core Web Vitals target:** LCP under 2.5s, CLS under 0.1, INP under 200ms — test every new page against this before considering it done.

---

## 9. GEO / AI-SEARCH REQUIREMENTS (every page)

("GEO" = Generative Engine Optimization — being cited by ChatGPT, Perplexity, Google AI Overviews, Gemini)

- **Answer-first structure:** the first 2–3 sentences of any content block must directly and completely answer the question the section title implies, before adding supporting detail. Don't build up to the answer.
- **FAQ block on every major page** (product pages, pricing, home), with real, specific questions — mark these up with `FAQPage` schema (JSON-LD).
- **Schema markup to include site-wide:** `Organization` schema on every page (sitewide), `Article` schema on blog posts, `FAQPage` schema wherever an FAQ block exists, `Product` schema on product pages where applicable.
- **Clear heading hierarchy with one topic per section** — AI systems extract content section-by-section, so each section must stand alone and make sense out of context.
- **Author/expertise signals:** blog posts should show a real author name and a one-line credential.
- **Freshness:** show a visible "Last updated" date on evergreen pages (guides, comparison pages, FAQ) and actually revisit/update that content at least once a quarter — this measurably affects whether AI systems keep citing it.
- **Don't rely on gimmicks:** skip exotic "llms.txt" files or artificial content "chunking" — Google's own guidance says solid structured content and technical SEO fundamentals matter far more than these.

---

## 10. RESPONSIVE CONTENT ADAPTATION

- **Headlines:** can shorten on mobile if the desktop version is long — write a mobile-safe shorter alternative rather than letting a long headline wrap awkwardly across 4 lines.
- **Body copy:** don't hide meaningful content on mobile "to save space" — collapse into accordions/tabs instead if a section is genuinely long.
- **Images:** art-direct hero images per breakpoint where needed (a wide banner image on desktop may need a cropped, more vertical version on mobile) rather than just scaling the same image down.
- **Navigation:** collapse to a hamburger/drawer menu under 1024px; keep primary CTA (e.g. "Get Started") visible even in the collapsed mobile nav bar, not just inside the drawer.
- **Tables/comparisons:** convert to stacked cards on mobile rather than forcing horizontal scroll on a data table.

---

## 11. IMAGE STORAGE & OPTIMIZATION (HYBRID APPROACH)

To guarantee the best User Experience (UX), SEO, and fast loading (Core Web Vitals), we use a Hybrid Approach for all images:

1. **Local Storage (`public/assets/images`)**: Use ONLY for structural, permanent images that are critical for First Contentful Paint (e.g., Company Logo, navigation icons, fixed background patterns, main hero image if static). Next.js will serve these instantly.
2. **Supabase Storage (Cloud)**: Use for ALL content-heavy and dynamic images (e.g., Blog post covers, team photos, user avatars, extensive product screenshots). This keeps the Github repo small and build times fast.
3. **Next.js `<Image>` Component**: No matter where the image is stored, ALWAYS use the Next.js `<Image>` component. 
   - Ensure `sizes` prop is used for responsive auto-resizing.
   - Use `placeholder="blur"` wherever possible for perceived performance.
   - **Never load raw 5-10MB images directly.** Rely on Next.js auto-optimization to serve WebP/AVIF formats dynamically.

---

## 12. PAGE TEMPLATES

Use these as the structural starting point for each page type, so new pages stay consistent with existing ones.

### Home page
1. Nav bar (sticky)
2. Hero — one clear headline stating what Uvicon does, one sentence of support copy, one primary CTA, one signature animation/visual
3. Core expertise grid (Web Dev / Software / Game Dev / AI Agents / Algo — short card each, icon + 2 lines + link)
4. Proof section (stats: projects delivered, experience, retention rate, users — mono font for numbers)
5. Featured product spotlight (Algo, following the compliance language rules in Section 7)
6. Testimonials/reviews carousel
7. FAQ block (GEO requirement)
8. Final CTA band
9. Footer

### Product page (e.g. Websites, Software, Applications, Games, or the dedicated Algo page)
1. Nav bar
2. Hero — specific to that product, answer-first headline ("Custom websites built for speed and conversion" not "Welcome to our Web Development service")
3. What's included (concrete feature list, not vague claims)
4. How it works (numbered steps — only use numbering here because it's genuinely sequential)
5. Pricing preview or link to `/pricing/`
6. Relevant testimonials (filtered to this product where possible)
7. FAQ block specific to this product (schema-marked)
8. CTA band linking to Contact or, for Algo, to `auth.uvicon.in/signup`

### Pricing page
1. Nav bar
2. Headline + one-line explanation of pricing philosophy
3. Plan comparison (stacked cards on mobile, table on desktop)
4. FAQ block (billing, refunds — link to Refund Policy)
5. CTA band

### Blog / article page
1. Nav bar
2. Title, author name + one-line credential, published date, "last updated" date
3. 2–3 sentence direct-answer opening paragraph
4. Body content with H2/H3 hierarchy, one topic per section
5. FAQ block if relevant to topic
6. Related articles (internal linking)
7. Article schema + Organization schema

### About / Company page
1. Nav bar
2. Mission statement (direct, not generic corporate-speak)
3. Stats/proof
4. Team or values section
5. CTA to Contact

---

## 13. PRE-PUBLISH CHECKLIST (AI must self-check before calling any page done)

- [ ] Exactly one H1, correct heading hierarchy, no skipped levels
- [ ] All colors used are from Section 2 token list — no new hex values introduced
- [ ] All type sizes match Section 3 scale at all three breakpoints
- [ ] Spacing values are all from the Section 4 scale
- [ ] Title tag and meta description written and within character limits
- [ ] FAQ block present with FAQPage schema (if page type requires it per Section 11)
- [ ] Answer-first paragraph structure used in every content section
- [ ] Images have accurate alt text, are compressed/next-gen format, lazy-loaded below the fold
- [ ] Page tested visually at mobile/tablet/desktop breakpoints
- [ ] Dark mode toggle checked — contrast still passes in dark mode
- [ ] Keyboard focus states visible on every interactive element
- [ ] `prefers-reduced-motion` respected
- [ ] If page mentions Algo/trading: compliance language rules from Section 7 followed, disclaimer present
- [ ] Existing URL slug preserved if this is a rebuild of an existing page

---

## 14. QUICK REFERENCE — copy-paste for prompts

> "Before building this page, read DESIGN_SYSTEM.md. Use the [Home / Product / Pricing / Blog / About] template from Section 11. Follow the color tokens from Section 2, type scale from Section 3, and spacing scale from Section 4 exactly. Apply the SEO rules from Section 8 and GEO rules from Section 9. Run through the Section 12 checklist before telling me it's done."

---

*This document should evolve. When a real design decision gets made that isn't covered here (a new component, a new page type, a new content pattern), add it back into this file immediately so it stays the single source of truth.*
