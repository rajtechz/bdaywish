import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07030b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://megha-birthday-surprise.vercel.app"),
  title: "A Special Surprise For You, Megha ✨🎁",
  description: "Someone made something magical just for you. Tap to open your surprise...",
  openGraph: {
    title: "A Special Surprise For You, Megha ✨🎁",
    description: "Someone made something magical just for you. Tap to open your surprise...",
    type: "website",
    siteName: "A Magical Surprise for Megha",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "A Magical Surprise Awaits You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Special Surprise For You, Megha ✨🎁",
    description: "Someone made something magical just for you. Tap to open your surprise...",
    images: ["/images/og-preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-midnight-950 text-blush-50 antialiased selection:bg-blush-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
