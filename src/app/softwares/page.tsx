import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development India | Uvicon Technologies",
  description:
    "Scalable, enterprise-grade custom software solutions built to streamline your business operations. Uvicon Technologies delivers reliable software.",
};

export default function SoftwaresPage() {
  return (
    <div className="page-placeholder">
      <span className="page-badge">Products</span>
      <h1>Softwares</h1>
      <p>Enterprise-grade custom software solutions for your business.</p>
    </div>
  );
}
