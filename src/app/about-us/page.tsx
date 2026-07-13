import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Story & Team | Uvicon Technologies",
  description:
    "Learn about Uvicon Technologies — our mission, our team, and why we build premium digital solutions for businesses across India.",
};

export default function AboutUsPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Resources</span>
      <h1>About Us</h1>
      <p>Our mission, our team, and our commitment to excellence.</p>
    </div>
  );
}
