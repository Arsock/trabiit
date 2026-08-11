import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/ui/styles/globals.css";

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
    <html lang="en" className={`${rubik.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
            <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}