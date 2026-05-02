import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "./lib/bootstrap/BootstrapClient";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SwiperBootstrap from "./lib/bootstrap/SwiperBootstrap";
import { bussinessInfo } from "./data/data";
import SchemaMarkup from "./components/SchemaMarkup";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${bussinessInfo.header}`,
  description: `${bussinessInfo.title}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />

        {children}

        <Footer />

        <BootstrapClient />
        <SwiperBootstrap />
        <SchemaMarkup />
        <Analytics />
      </body>
    </html>
  );
}