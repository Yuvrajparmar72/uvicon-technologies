import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans & Packages | Uvicon Technologies",
  description:
    "Transparent pricing for websites, software, applications, and game development. Find the right plan for your business at Uvicon Technologies.",
};

export default function PricingPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Pricing</span>
      <h1>Pricing</h1>
      <p>Transparent pricing plans tailored to your business needs.</p>
    </div>
  );
}
