import type { Metadata } from "next";
import "./globals.css";
import {Inter} from "next/font/google"

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Mealverse – Discover Global Recipes",
  description: "Explore meals from around the world. Beautifully optimized and easy to use."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#0f172a] text-white ${inter.className}`}>
        <Header />
        <main className="min-h-screen p-4 max-w-7xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
} 
