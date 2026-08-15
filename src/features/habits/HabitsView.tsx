import { HabitDashboard } from "./components/HabitDashboard";
import { HabitList } from "./components/HabitList";

export const HabitsView = () => {
  return (
    <div className="flex flex-col gap-7">
      <HabitDashboard />
      <HabitList/>
    </div>
  );
};
