interface ProgressCircleProps {
  percentage: number;
}

export const ProgressCircle = ({ percentage }: ProgressCircleProps) => {
  let visualPercentage = percentage;

  if (percentage > 0 && percentage < 5) {
    visualPercentage = 5;
  } else if (percentage > 95 && percentage < 100) {
    visualPercentage = 95;
  }

  // Parámetros del SVG
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Espacio (gap) entre las barras
  const gap = 20;

  // Cálculo de longitudes de cada barra
  const filledLength = visualPercentage > 0 
    ? Math.max(0, (visualPercentage / 100) * circumference - (visualPercentage === 100 ? 0 : gap)) 
    : 0;

  const emptyLength = visualPercentage < 100 
    ? Math.max(0, ((100 - visualPercentage) / 100) * circumference - gap) 
    : 0;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Barra de progreso (Oscura) */}
        {visualPercentage > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3a3a3a"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${filledLength} ${circumference}`}
            strokeDashoffset={visualPercentage === 100 ? 0 : -gap / 2}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}

        {/* Barra vacía (Clara) */}
        {visualPercentage < 100 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#AEAEAE"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${emptyLength} ${circumference}`}
            strokeDashoffset={-(filledLength + gap + gap / 2)}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>

      <span className="absolute text-[28px] font-bold text-[#3a3a3a]">
        {percentage}%
      </span>
    </div>
  );
};