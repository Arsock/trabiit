"use client";

import { useState } from "react";
import { TrashIcon } from "@/ui/components/icons";

export const HabitList = () => {
  const [completedHabits, setCompletedHabits] = useState<number[]>([]);

  // Testeo de habitos
  const habits = [
    { id: 1, title: "Beber 2L de agua", category: "Salud" },
    { id: 2, title: "Hacer ejercicio 30min", category: "Salud" },
    { id: 3, title: "Leer 10 páginas", category: "Mente" },
    { id: 4, title: "Meditar", category: "Mente" },
  ];

  const toggleHabit = (id: number) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log("Eliminar hábito ID:", id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5 select-none">
        <span className="text-[30px] font-medium">Lista de hábitos</span>
        <span className="text-[18px] text-[#808080]">{habits.length} en total</span>
      </div>

      <div className="flex justify-between flex-wrap gap-3">
        {habits.map((habit) => {
          const isCompleted = completedHabits.includes(habit.id);

          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="flex justify-between items-center w-[440px] border-b border-b-[1px] border-b-[#E2E2E2] pb-5 cursor-pointer select-none"
            >
              <div className="flex gap-5 items-center">
                <div
                  className={`h-[65px] w-[65px] rounded-full flex items-center justify-center transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#000]"
                      : "border border-[3px] border-[#CCCCCC] bg-transparent"
                  }`}
                >
                  {isCompleted && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-[18px] font-medium transition-all duration-200 ${
                      isCompleted
                        ? "line-through text-[#878787]"
                        : "text-[#000]"
                    }`}
                  >
                    {habit.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#000]" />
                    <span className="text-[18px] text-[#878787]">
                      {habit.category}
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={(e) => handleDelete(e, habit.id)}
                className="flex justify-center items-center h-[45px] w-[45px] hover:opacity-70 transition-opacity"
              >
                <TrashIcon size={25} color="#878787" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};