import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login ~ Portify | Drag & Drop Builder",
  description:
    "Portify is a free and easy-to-use portfolio builder. Create stunning personal sites, resumes, or business pages with drag & drop, templates, and custom scripts.",
  keywords: [
    "portfolio builder",
    "drag and drop website",
    "create portfolio",
    "online resume builder",
    "website maker",
    "free portfolio creator",
    "personal site builder",
    "Portify",
  ],
  authors: [{ name: "Walid", url: "https://portify.ebextractor.com" }],
  creator: "Walid C.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
