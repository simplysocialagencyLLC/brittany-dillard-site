import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const DESCRIPTION =
  "Welcome to Brittany Dillards page. Brittany is the Dancing Queen of Tiktok. She is one of the top LIVE HOST in North America that is a dancer and Battle Box host. She runs the Daily Love Boxes on her platform. If you enjoy great music and vibes this is the place to be.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brittanydillard.org"),
  title: "Brit Dillard",
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Brit Dillard",
    description: DESCRIPTION,
    images: ["/share-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brit Dillard",
    description: DESCRIPTION,
    images: ["/share-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
