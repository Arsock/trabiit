import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import { HabitsProvider } from "@/context/habitsContext"; // 👈 Importamos el Provider

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
    <html lang="en" className={`${rubik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Envolvemos children y Navbar para que ambos compartan el estado */}
        {/* <HabitsProvider> */}
          <main className="flex-1">{children}</main>
          {/* <Navbar />
        </HabitsProvider> */}
      </body>
    </html>
  );
}