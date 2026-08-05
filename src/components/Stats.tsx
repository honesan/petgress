interface StatsProps {
  food: number;
  water: number;
  energy: number;
}

function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  return (
    <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden border-2 border-black">
      <div
        className={`h-full ${color} transition-all duration-500`}
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}

function getFoodColor(value: number) {
  if (value > 60) return "bg-orange-400";
  if (value > 30) return "bg-yellow-400";
  return "bg-red-500";
}

function getWaterColor(value: number) {
  if (value > 60) return "bg-sky-400";
  if (value > 30) return "bg-cyan-300";
  return "bg-red-500";
}

function getEnergyColor(value: number) {
  if (value > 60) return "bg-green-500";
  if (value > 30) return "bg-lime-400";
  return "bg-red-500";
}

export default function Stats({
  food,
  water,
  energy,
}: StatsProps) {
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl">

      <div className="grid grid-cols-3 gap-4">

        {/* Food */}

        <div className="bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_#222] p-4">

          <div className="flex justify-between mb-2 font-bold">

            <span>🍖 Food</span>

            <span>{Math.round(food)}%</span>

          </div>

          <ProgressBar
            value={food}
            color={getFoodColor(food)}
          />

        </div>

        {/* Water */}

        <div className="bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_#222] p-4">

          <div className="flex justify-between mb-2 font-bold">

            <span>💧 Water</span>

            <span>{Math.round(water)}%</span>

          </div>

          <ProgressBar
            value={water}
            color={getWaterColor(water)}
          />

        </div>

        {/* Energy */}

        <div className="bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_#222] p-4">

          <div className="flex justify-between mb-2 font-bold">

            <span>⚡ Energy</span>

            <span>{Math.round(energy)}%</span>

          </div>

          <ProgressBar
            value={energy}
            color={getEnergyColor(energy)}
          />

        </div>

      </div>

    </div>
  );
}