import { PetAction, PetStats } from "../types";

interface StatusProps {
  action: PetAction;
  stats: PetStats;
}

function getLowestNeed(stats: PetStats) {
  const values = [
    { name: "Food", value: stats.food },
    { name: "Water", value: stats.water },
    { name: "Energy", value: stats.energy },
  ];

  values.sort((a, b) => a.value - b.value);

  return values[0].name;
}

function getMood(stats: PetStats) {
  const average =
    (stats.food + stats.water + stats.energy) / 3;

  if (average >= 80) {
    return {
      emoji: "😄",
      text: "Happy",
    };
  }

  if (average >= 50) {
    return {
      emoji: "🙂",
      text: "Doing Okay",
    };
  }

  if (average >= 25) {
    return {
      emoji: "😟",
      text: "Needs Attention",
    };
  }

  return {
    emoji: "😫",
    text: "Very Tired",
  };
}

function getActionText(action: PetAction) {
  switch (action) {
    case "walking":
      return "Walking";

    case "eating":
      return "Eating";

    case "drinking":
      return "Drinking";

    case "sleeping":
      return "Sleeping";

    default:
      return "Following You";
  }
}

export default function Status({
  action,
  stats,
}: StatusProps) {
  const mood = getMood(stats);

  return (
    <div className="absolute right-6 top-28 z-40 w-72">

      <div className="rounded-3xl border-4 border-black bg-white p-5 shadow-[6px_6px_0px_#222]">

        <div className="mb-4 flex items-center gap-3">

          <div className="text-5xl">
            {mood.emoji}
          </div>

          <div>

            <h2 className="text-xl font-black">
              {mood.text}
            </h2>

            <p className="text-sm text-gray-600">
              Pet Status
            </p>

          </div>

        </div>

        <div className="space-y-3">

          <div className="flex justify-between">

            <span className="font-bold">
              Action
            </span>

            <span>
              {getActionText(action)}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="font-bold">
              Lowest Need
            </span>

            <span>
              {getLowestNeed(stats)}
            </span>

          </div>

        </div>

        <div className="mt-5 rounded-2xl border-2 border-black bg-yellow-100 p-3">

          <p className="text-sm font-semibold">

            {action === "eating" &&
              "I'm getting something to eat!"}

            {action === "drinking" &&
              "Time for a drink!"}

            {action === "sleeping" &&
              "I'm taking a nap..."}

            {(action === "idle" ||
              action === "walking") &&
              "I'm following you!"}

          </p>

        </div>

      </div>

    </div>
  );
}