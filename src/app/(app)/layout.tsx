import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/ui/providers/theme-provider"; // 👈 Importamos el ThemeProvider

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trabiit - Habit Tracker",
  description: "Track your daily habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{fontFamily:"rubik"}} className={`${rubik.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeProvider>
          <main className="w-full">
            <div className="w-full max-w-237.5 mx-auto px-4">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
