import React from "react";
import { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
    title: "Privacy Policy | Uvicon Technologies",
    description: "Read Uvicon Technologies' privacy policy to understand how we collect, use, and protect your data and enterprise intellectual property.",
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyClient />;
}
