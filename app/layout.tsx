import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portify – Drag & Drop Portfolio Builder",
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
