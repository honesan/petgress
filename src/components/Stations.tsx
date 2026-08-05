import type { Ref } from "react";

interface StationsProps {
  foodRef: Ref<HTMLButtonElement>;
  waterRef: Ref<HTMLButtonElement>;
  bedRef: Ref<HTMLButtonElement>;
  disabled?: boolean;
  onFoodClick: () => void;
  onWaterClick: () => void;
  onBedClick: () => void;
}

const stationClassName = [
  "pointer-events-auto",
  "flex",
  "h-24",
  "min-w-0",
  "flex-1",
  "flex-col",
  "items-center",
  "justify-center",
  "rounded-2xl",
  "border-[3px]",
  "border-black",
  "px-2",
  "shadow-[4px_4px_0_#222]",
  "transition-transform",
  "enabled:cursor-pointer",
  "enabled:hover:-translate-y-1",
  "enabled:active:translate-y-0",
  "disabled:cursor-not-allowed",
  "disabled:opacity-70",
  "sm:h-32",
  "sm:max-w-40",
  "sm:rounded-3xl",
  "sm:border-4",
  "sm:shadow-[6px_6px_0_#222]",
].join(" ");

export default function Stations({
  foodRef,
  waterRef,
  bedRef,
  disabled = false,
  onFoodClick,
  onWaterClick,
  onBedClick,
}: StationsProps) {
  return (
    <div className="station-bar pointer-events-none absolute inset-x-0 z-30 mx-auto flex w-full max-w-5xl items-end justify-between gap-2 px-3 sm:gap-6 sm:px-8">
      <button
        ref={foodRef}
        type="button"
        disabled={disabled}
        aria-label="Feed the dog"
        onClick={onFoodClick}
        className={`${stationClassName} bg-orange-300`}
      >
        <span className="text-4xl sm:text-6xl">
          🍖
        </span>

        <span className="mt-1 text-sm font-black sm:mt-2 sm:text-base">
          Food
        </span>
      </button>

      <button
        ref={waterRef}
        type="button"
        disabled={disabled}
        aria-label="Give the dog water"
        onClick={onWaterClick}
        className={`${stationClassName} bg-sky-300`}
      >
        <span className="text-4xl sm:text-6xl">
          💧
        </span>

        <span className="mt-1 text-sm font-black sm:mt-2 sm:text-base">
          Water
        </span>
      </button>

      <button
        ref={bedRef}
        type="button"
        disabled={disabled}
        aria-label="Let the dog sleep"
        onClick={onBedClick}
        className={`${stationClassName} bg-green-300`}
      >
        <span className="text-4xl sm:text-6xl">
          🛏️
        </span>

        <span className="mt-1 text-sm font-black sm:mt-2 sm:text-base">
          Bed
        </span>
      </button>
    </div>
  );
}