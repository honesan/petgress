export interface StationProps {
  onFoodClick?: () => void;
  onWaterClick?: () => void;
  onBedClick?: () => void;
}

export default function Stations({
  onFoodClick,
  onWaterClick,
  onBedClick,
}: StationProps) {
  return (
    <>
      {/* Food Dispenser */}

      <div
        onClick={onFoodClick}
        className="
          absolute
          left-8
          bottom-8
          w-36
          h-36
          rounded-3xl
          border-4
          border-black
          bg-orange-300
          shadow-[6px_6px_0px_#222]
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          select-none
          transition
          hover:scale-105
        "
      >
        <div className="text-6xl">🍖</div>

        <div className="mt-2 font-bold">
          Food
        </div>
      </div>

      {/* Water Dispenser */}

      <div
        onClick={onWaterClick}
        className="
          absolute
          left-56
          bottom-8
          w-36
          h-36
          rounded-3xl
          border-4
          border-black
          bg-sky-300
          shadow-[6px_6px_0px_#222]
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          select-none
          transition
          hover:scale-105
        "
      >
        <div className="text-6xl">💧</div>

        <div className="mt-2 font-bold">
          Water
        </div>
      </div>

      {/* Bed */}

      <div
        onClick={onBedClick}
        className="
          absolute
          right-8
          bottom-8
          w-36
          h-36
          rounded-3xl
          border-4
          border-black
          bg-green-300
          shadow-[6px_6px_0px_#222]
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          select-none
          transition
          hover:scale-105
        "
      >
        <div className="text-6xl">🛏️</div>

        <div className="mt-2 font-bold">
          Bed
        </div>
      </div>
    </>
  );
}