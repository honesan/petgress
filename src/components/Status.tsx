import type {
  PetAction,
  PetStats,
} from "../types";

interface StatusProps {
  action: PetAction;
  stats: PetStats;
}

function getLowestNeed(stats: PetStats) {
  const values = [
    {
      name: "Food",
      value: stats.food,
    },
    {
      name: "Water",
      value: stats.water,
    },
    {
      name: "Energy",
      value: stats.energy,
    },
  ];

  return values.reduce(
    (lowest, current) =>
      current.value < lowest.value
        ? current
        : lowest,
  ).name;
}

function getMood(stats: PetStats) {
  const average =
    (
      stats.food +
      stats.water +
      stats.energy
    ) / 3;

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
      return "Walking to a station";

    case "eating":
      return "Eating";

    case "drinking":
      return "Drinking";

    case "sleeping":
      return "Sleeping";

    default:
      return "Following you";
  }
}

function getMessage(action: PetAction) {
  switch (action) {
    case "walking":
      return "I'm on my way!";

    case "eating":
      return "I'm having something to eat!";

    case "drinking":
      return "Time for a drink!";

    case "sleeping":
      return "I'm taking a nap...";

    default:
      return "Move your pointer or finger and I'll follow.";
  }
}

export default function Status({
  action,
  stats,
}: StatusProps) {
  const mood = getMood(stats);

  return (
    <aside className="absolute right-3 top-24 z-40 w-44 sm:right-6 sm:top-32 sm:w-72">
      <div className="rounded-2xl border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_#222] sm:rounded-3xl sm:border-4 sm:p-5 sm:shadow-[6px_6px_0_#222]">
        <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
          <div className="text-3xl sm:text-5xl">
            {mood.emoji}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-black sm:text-xl">
              {mood.text}
            </h2>

            <p className="text-xs text-gray-600 sm:text-sm">
              Pet Status
            </p>
          </div>
        </div>

        <dl className="space-y-2 text-xs sm:space-y-3 sm:text-sm">
          <div className="flex items-start justify-between gap-2">
            <dt className="font-bold">
              Action
            </dt>

            <dd className="text-right">
              {getActionText(action)}
            </dd>
          </div>

          <div className="flex justify-between gap-2">
            <dt className="font-bold">
              Lowest
            </dt>

            <dd>
              {getLowestNeed(stats)}
            </dd>
          </div>
        </dl>

        <p className="mt-3 rounded-xl border-2 border-black bg-yellow-100 p-2 text-xs font-semibold sm:mt-5 sm:rounded-2xl sm:p-3 sm:text-sm">
          {getMessage(action)}
        </p>
      </div>
    </aside>
  );
}