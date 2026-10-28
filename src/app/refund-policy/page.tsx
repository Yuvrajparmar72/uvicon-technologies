import React from "react";
import { Metadata } from "next";
import RefundPolicyClient from "./RefundPolicyClient";

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy | Uvicon Technologies",
    description: "Review our milestone-based billing, project cancellation terms, and refund policy for software development services.",
};

export default function RefundPolicyPage() {
    return <RefundPolicyClient />;
}
