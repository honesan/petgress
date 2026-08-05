interface StatsProps {
  food: number;
  water: number;
  energy: number;
}

interface ProgressBarProps {
  value: number;
  color: string;
}

function clampStat(value: number) {
  return Math.min(
    100,
    Math.max(0, value),
  );
}

function ProgressBar({
  value,
  color,
}: ProgressBarProps) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full border-2 border-black bg-gray-200 sm:h-5">
      <div
        className={`h-full ${color} transition-[width] duration-500`}
        style={{
          width: `${clampStat(value)}%`,
        }}
      />
    </div>
  );
}

function getFoodColor(value: number) {
  if (value > 60) {
    return "bg-orange-400";
  }

  if (value > 30) {
    return "bg-yellow-400";
  }

  return "bg-red-500";
}

function getWaterColor(value: number) {
  if (value > 60) {
    return "bg-sky-400";
  }

  if (value > 30) {
    return "bg-cyan-300";
  }

  return "bg-red-500";
}

function getEnergyColor(value: number) {
  if (value > 60) {
    return "bg-green-500";
  }

  if (value > 30) {
    return "bg-lime-400";
  }

  return "bg-red-500";
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
}) {
  const safeValue = clampStat(value);

  return (
    <section className="min-w-0 rounded-2xl border-[3px] border-black bg-white p-2 shadow-[4px_4px_0_#222] sm:rounded-3xl sm:border-4 sm:p-4 sm:shadow-[6px_6px_0_#222]">
      <div className="mb-1 flex items-center justify-between gap-1 text-xs font-black sm:mb-2 sm:text-base">
        <span className="truncate">
          {icon}

          <span className="hidden sm:inline">
            {" "}
            {label}
          </span>
        </span>

        <span>
          {Math.round(safeValue)}%
        </span>
      </div>

      <ProgressBar
        value={safeValue}
        color={color}
      />
    </section>
  );
}

export default function Stats({
  food,
  water,
  energy,
}: StatsProps) {
  return (
    <div className="stats-panel absolute left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <StatCard
          icon="🍖"
          label="Food"
          value={food}
          color={getFoodColor(food)}
        />

        <StatCard
          icon="💧"
          label="Water"
          value={water}
          color={getWaterColor(water)}
        />

        <StatCard
          icon="⚡"
          label="Energy"
          value={energy}
          color={getEnergyColor(energy)}
        />
      </div>
    </div>
  );
}