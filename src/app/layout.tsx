import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: "900",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ariel Solutions",
  description: "Innovative Tech Solutions For Businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WXW7Z2MHF4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WXW7Z2MHF4');
          `}
        </Script>
      </head>
      <body className={geistSans.variable}>
        {children}
      </body>
    </html>
  );
}
