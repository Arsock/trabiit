"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

import { useHabits } from "@/context/habitsContext";// Importas el módulo

export default function Navbar() {
  const pathname = usePathname();
  const { addHabit } = useHabits();

  const navItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Habits", href: "/habits", icon: "⚡" },
    { label: "Stats", href: "/stats", icon: "📊" },
    { label: "Profile", href: "/profile", icon: "👤" },
  ];

  return (
    <nav className={styles.navbarContainer}>
          <div
            className={`${styles.navItem}`}
          >
            <div className={`${styles.navItemSecundary}`}></div>
            <button className={`${styles.navItemMain}`} onClick={addHabit}> </button>
            <div className={`${styles.navItemSecundary}`}></div>
          </div>
    </nav>
  );
}