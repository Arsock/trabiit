"use client";

import React, { createContext, useContext, useState } from "react";

interface HabitsContextType {
  habits: string[];
  addHabit: () => void;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<string[]>([]);

  const addHabit = () => {
    const newHabit = `Nuevo hábito #${habits.length + 1}`;
    setHabits((prev) => [...prev, newHabit]);
  };

  return (
    <HabitsContext.Provider value={{ habits, addHabit }}>
      {children}
    </HabitsContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits debe usarse dentro de un HabitsProvider");
  }
  return context;
}