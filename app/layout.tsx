import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ffd8e4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://megha-birthday-surprise.vercel.app"),
  title: "A Special Surprise For You... 👀✨",
  description: "I have something for you... Click to open!",
  openGraph: {
    title: "A Special Surprise For You... 👀✨",
    description: "I have something for you... Click to open!",
    type: "website",
    siteName: "Birthday Surprise",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "A Special Surprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Special Surprise For You... 👀✨",
    description: "I have something for you... Click to open!",
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
    <html lang="en" className="scroll-smooth" style={{ backgroundColor: "#ffd8e4" }}>
      <body
        className="text-[#4a0e2e] antialiased selection:bg-pink-400 selection:text-white min-h-screen"
        style={{
          backgroundColor: "#ffd8e4",
          backgroundImage: "radial-gradient(circle at 50% 20%, #ffeaf1 0%, #ffd4e2 50%, #fbcfe8 100%)",
          color: "#4a0e2e",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
