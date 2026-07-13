import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Website Development India | Uvicon Technologies",
  description:
    "Get custom-built, high-performance websites designed for speed, SEO, and conversion. Uvicon Technologies delivers modern web solutions.",
};

export default function WebsitesPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Products</span>
      <h1>Websites</h1>
      <p>Custom websites built for speed, SEO, and conversion.</p>
    </div>
  );
}
