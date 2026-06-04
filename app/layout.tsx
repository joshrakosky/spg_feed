import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/languageContext";

export const metadata: Metadata = {
  title: "SPG FEED",
  description: "Simon Property Group FEED program — every purchase helps provide school meals for children worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
