import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs & Tutorials | Uvicon Technologies",
  description:
    "Find answers to common questions and step-by-step tutorials. Get the most out of Uvicon Technologies products and services.",
};

export default function FaqsTutorialsPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">More</span>
      <h1>FAQs &amp; Tutorials</h1>
      <p>Answers to common questions and helpful tutorials.</p>
    </div>
  );
}
