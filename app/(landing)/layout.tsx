import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./_components/header";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnugWork",
  description: "Keep track of your job applications",
};

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 min-h-screen grid grid-rows-[auto_1fr_auto]`}
        >
          <Header />
          <div className="py-4">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
