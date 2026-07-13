import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development India | Uvicon Technologies",
  description:
    "High-quality mobile applications for iOS and Android. Uvicon Technologies builds apps that deliver exceptional user experiences.",
};

export default function ApplicationsPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Products</span>
      <h1>Applications</h1>
      <p>High-quality mobile applications for iOS and Android.</p>
    </div>
  );
}
