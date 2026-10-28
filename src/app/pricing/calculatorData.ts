/* ==========================================================================
   COST CALCULATOR — DATA, TYPES & CALCULATION ENGINE
   Ported from uvicon-technologies_-cost-calculator with updated structure
   ========================================================================== */

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type ProjectType = "website" | "app" | "software" | "saas";
export type DesignLevel = "basic" | "standard" | "premium";
export type ProjectPhase = "mvp" | "growth" | "enterprise";

export interface ProjectOption {
    id: string;
    label: string;
    description: string;
    iconName: string;
    basePrice?: number;
    multiplier?: number;
}

export interface FeatureOption {
    id: string;
    label: string;
    price: number;
    description: string;
    timeImpactWeeks: number;
}

export interface WizardState {
    projectType: ProjectType | null;
    phase: ProjectPhase | null;
    platform: string | null;
    designLevel: DesignLevel | null;
    features: string[];
}

export interface CalculationResult {
    minEstimate: number;
    maxEstimate: number;
    estimatedWeeksMin: number;
    estimatedWeeksMax: number;
    breakdown: {
        base: number;
        phaseMultiplier: number;
        designCost: number;
        featuresCost: number;
    };
}

// ─── DATA ARRAYS ─────────────────────────────────────────────────────────────

export const PROJECT_TYPES: ProjectOption[] = [
    {
        id: "website",
        label: "Website",
        description: "Corporate, Portfolio, Landing Pages",
        iconName: "Globe",
        basePrice: 8000,
    },
    {
        id: "app",
        label: "Mobile Application",
        description: "iOS, Android, Hybrid Apps",
        iconName: "Smartphone",
        basePrice: 25000,
    },
    {
        id: "software",
        label: "Custom Software",
        description: "Internal Tools, Dashboards, ERP",
        iconName: "Monitor",
        basePrice: 35000,
    },
    {
        id: "saas",
        label: "SaaS Platform",
        description: "Subscription-based Products",
        iconName: "Cloud",
        basePrice: 40000,
    },
];

export const PROJECT_PHASES: ProjectOption[] = [
    {
        id: "mvp",
        label: "MVP (Fast Track)",
        description: "Core features only. Rapid launch strategy.",
        iconName: "Rocket",
        multiplier: 1.0,
    },
    {
        id: "growth",
        label: "Growth / Scale",
        description: "Polished product ready for user acquisition.",
        iconName: "TrendingUp",
        multiplier: 1.35,
    },
    {
        id: "enterprise",
        label: "Enterprise / Corporate",
        description: "High security, compliance, and massive scalability.",
        iconName: "Building2",
        multiplier: 1.9,
    },
];

export const PLATFORMS: Record<string, ProjectOption[]> = {
    website: [
        { id: "corporate", label: "Corporate / Business", description: "Brand presence", iconName: "Briefcase" },
        { id: "ecommerce", label: "E-commerce Store", description: "Sell products online", iconName: "ShoppingCart" },
        { id: "webapp", label: "Interactive Web App", description: "Complex functionality", iconName: "Code" },
        { id: "landing", label: "High-Convert Landing", description: "Marketing focused", iconName: "Target" },
    ],
    app: [
        { id: "hybrid", label: "Cross-Platform (Flutter)", description: "Best value (iOS + Android)", iconName: "Layers" },
        { id: "native", label: "Native (Swift/Kotlin)", description: "Highest performance", iconName: "Smartphone" },
        { id: "pwa", label: "PWA (Web Based)", description: "Installable web app", iconName: "Globe" },
    ],
    software: [
        { id: "crm", label: "CRM System", description: "Customer Management", iconName: "Users" },
        { id: "erp", label: "ERP / Operations", description: "Resource Planning", iconName: "Database" },
        { id: "inventory", label: "Inventory / POS", description: "Stock tracking", iconName: "Package" },
    ],
    saas: [
        { id: "b2b", label: "B2B Dashboard", description: "Business tools", iconName: "Layout" },
        { id: "marketplace", label: "Marketplace", description: "Buyers & Sellers", iconName: "Store" },
        { id: "social", label: "Social / Community", description: "User interaction focus", iconName: "MessageCircle" },
    ],
};

export const DESIGN_LEVELS: ProjectOption[] = [
    {
        id: "basic",
        label: "Clean & Functional",
        description: "Uses UI libraries (Material/AntD). Fast delivery.",
        iconName: "Layout",
        multiplier: 1.0,
    },
    {
        id: "standard",
        label: "Custom Branding",
        description: "Tailored UI/UX design matching your brand identity.",
        iconName: "PenTool",
        multiplier: 1.2,
    },
    {
        id: "premium",
        label: "Award Winning",
        description: "Micro-interactions, 3D elements, premium feel.",
        iconName: "Star",
        multiplier: 1.5,
    },
];

export const FEATURES: FeatureOption[] = [
    { id: "auth", label: "User Accounts", price: 2500, description: "Login, Signup, Profiles", timeImpactWeeks: 0.5 },
    { id: "social_auth", label: "Social Login", price: 1500, description: "Google, Facebook, Apple login", timeImpactWeeks: 0.2 },
    { id: "payment", label: "Payments", price: 5000, description: "Stripe, Razorpay, UPI", timeImpactWeeks: 0.5 },
    { id: "admin", label: "Admin Dashboard", price: 7500, description: "Manage users & content", timeImpactWeeks: 1 },
    { id: "cms", label: "Blog / CMS", price: 4000, description: "Content Management System", timeImpactWeeks: 0.5 },
    { id: "chat", label: "Live Chat", price: 8000, description: "Real-time messaging system", timeImpactWeeks: 1 },
    { id: "ai", label: "AI Integration", price: 12000, description: "ChatGPT/Gemini API", timeImpactWeeks: 1.5 },
    { id: "file_upload", label: "File Uploads", price: 3000, description: "AWS S3 / Cloud Storage", timeImpactWeeks: 0.3 },
    { id: "search", label: "Advanced Search", price: 2500, description: "Filters & ElasticSearch", timeImpactWeeks: 0.4 },
    { id: "dark_mode", label: "Dark Mode", price: 2000, description: "Light/Dark theme toggle", timeImpactWeeks: 0.3 },
    { id: "crypto", label: "Blockchain / Web3", price: 25000, description: "Wallet connect, Smart contracts", timeImpactWeeks: 2.5 },
    { id: "multilingual", label: "Multi-language", price: 4000, description: "i18n support", timeImpactWeeks: 0.5 },
    { id: "map", label: "Maps / Geolocation", price: 5000, description: "Google Maps, Tracking", timeImpactWeeks: 0.5 },
    { id: "analytics", label: "Analytics", price: 2000, description: "Custom reports & graphs", timeImpactWeeks: 0.3 },
    { id: "notif", label: "Push Notifications", price: 3000, description: "FCM / OneSignal", timeImpactWeeks: 0.3 },
    { id: "biometric", label: "Biometric Auth", price: 3500, description: "FaceID / Fingerprint", timeImpactWeeks: 0.4 },
    { id: "qr", label: "QR Scanner", price: 2000, description: "Scan & Generate QR codes", timeImpactWeeks: 0.3 },
    { id: "seo", label: "SEO Setup", price: 2500, description: "Meta tags, Sitemap, Schema", timeImpactWeeks: 0.2 },
];

export const CURRENCY = "₹";

// ─── CALCULATION ENGINE ──────────────────────────────────────────────────────

export const calculateEstimate = (state: WizardState): CalculationResult => {
    const projectType = PROJECT_TYPES.find((p) => p.id === state.projectType);
    const phase = PROJECT_PHASES.find((p) => p.id === state.phase);
    const designLevel = DESIGN_LEVELS.find((d) => d.id === state.designLevel);

    if (!projectType)
        return {
            minEstimate: 0,
            maxEstimate: 0,
            estimatedWeeksMin: 0,
            estimatedWeeksMax: 0,
            breakdown: { base: 0, phaseMultiplier: 0, designCost: 0, featuresCost: 0 },
        };

    const base = projectType.basePrice || 0;

    // 1. Phase Multiplier (MVP vs Enterprise)
    const phaseMult = phase?.multiplier || 1.0;
    const baseWithPhase = base * phaseMult;

    // 2. Design Multiplier (Applied to the base+phase)
    const designMult = designLevel?.multiplier || 1.0;
    const totalBaseAndDesign = baseWithPhase * designMult;
    const designCost = totalBaseAndDesign - baseWithPhase;

    // 3. Features Cost (Also slightly affected by phase complexity)
    let featuresCost = 0;
    let totalWeeks = 0;

    // Base timeline (min weeks based on type)
    if (state.projectType === "website") totalWeeks += 1;
    else if (state.projectType === "app") totalWeeks += 3;
    else totalWeeks += 4;

    state.features.forEach((featId) => {
        const feat = FEATURES.find((f) => f.id === featId);
        if (feat) {
            // Features are 20% more expensive in enterprise phases
            const featureMultiplier = state.phase === "enterprise" ? 1.2 : 1;
            featuresCost += feat.price * featureMultiplier;
            totalWeeks += feat.timeImpactWeeks;
        }
    });

    const totalExact = totalBaseAndDesign + featuresCost;

    // Timeline multipliers based on phase
    let timelineMult = 1;
    if (state.phase === "growth") timelineMult = 1.2;
    if (state.phase === "enterprise") timelineMult = 1.5;

    const finalWeeks = Math.ceil(totalWeeks * timelineMult);

    return {
        minEstimate: Math.round(totalExact * 0.95), // -5%
        maxEstimate: Math.round(totalExact * 1.15), // +15%
        estimatedWeeksMin: finalWeeks,
        estimatedWeeksMax: Math.ceil(finalWeeks * 1.25),
        breakdown: {
            base: baseWithPhase,
            phaseMultiplier: phaseMult,
            designCost,
            featuresCost,
        },
    };
};

// ─── CURRENCY FORMATTER ──────────────────────────────────────────────────────

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
        .format(amount)
        .replace("₹", CURRENCY + " ");
};
