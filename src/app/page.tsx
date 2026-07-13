import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Websites, Software & Algo Trading | Uvicon Technologies",
  description:
    "Uvicon Technologies builds high-performance websites, custom software, mobile applications, games, and algo trading solutions for businesses across India.",
};

export default function Home() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Home</span>
      <h1>Uvicon Technologies</h1>
      <p>
        Building high-performance websites, software, applications, games, and
        algo trading solutions.
      </p>
    </div>
  );
}
