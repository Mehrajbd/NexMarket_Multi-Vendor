import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusMarket | Multi-Vendor Marketplace",
  description: "Premium Multi-Vendor E-commerce Marketplace",
};

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingChatbot from "@/components/chat/FloatingChatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <FloatingChatbot />
      </body>
    </html>
  );
}
