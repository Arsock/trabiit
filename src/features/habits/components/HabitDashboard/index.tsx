import { ProgressCircle } from "./ProgressCircle";

export const HabitDashboard = () => {
  const percentage = 70;

  return (
    <div className="w-full relative h-90 bg-card rounded-[20px] p-12.5 overflow-hidden">
      
      {/* las bolas del demonio v1 */}
      <div className="absolute top-[-20%] left-[-10%] w-80 h-80 rounded-full bg-black/30 blur-2xl animate-orbit-1 pointer-events-none" />

      {/* las bolas del demonio v2 */}
      <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 rounded-full bg-black/20 blur-2xl animate-orbit-2 pointer-events-none" />

      {/* Ruido de fondo */}
      <div className="absolute inset-0 noise-pattern opacity-45 pointer-events-none z-1" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center gap-4">
          <span className="bg-surface text-[18px] font-medium px-3.75 py-2 rounded-[10px]">
            Mar, 4 ago
          </span>
          <span className="bg-surface text-[18px] font-medium px-3.75 py-2 rounded-[10px]">
            0 días seguidos
          </span>
          <span className="bg-surface text-[18px] font-medium px-3.75 py-2 rounded-[10px]">
            Semana 20%
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[22px] font-medium">Progreso de hoy</span>
            <span className="text-[70px] font-medium leading-none">{percentage}%</span>
            <span className="text-[18px] font-normal">2 de 4 hábitos completados</span>
          </div>

          <ProgressCircle percentage={percentage} />
        </div>
      </div>

    </div>
  );
};