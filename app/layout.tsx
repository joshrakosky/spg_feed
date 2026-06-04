import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/languageContext";
import AppBackground from "@/components/AppBackground";

export const metadata: Metadata = {
  title: "SPG FEED",
  description: "Simon Property Group FEED program — every purchase helps provide school meals for children worldwide.",
  icons: {
    icon: "/images/spg-emblem-black.png",
    apple: "/images/spg-emblem-black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <AppBackground />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
