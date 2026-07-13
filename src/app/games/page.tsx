import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Development Services India | Uvicon Technologies",
  description:
    "Immersive game development services for mobile, PC, and web. Uvicon Technologies creates engaging games with cutting-edge technology.",
};

export default function GamesPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Products</span>
      <h1>Games</h1>
      <p>Immersive game development for mobile, PC, and web.</p>
    </div>
  );
}
