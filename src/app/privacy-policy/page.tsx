import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Uvicon Technologies",
  description:
    "Read the Uvicon Technologies privacy policy. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Resources</span>
      <h1>Privacy Policy</h1>
      <p>How we collect, use, and protect your personal data.</p>
    </div>
  );
}
