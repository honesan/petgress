import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AI_THRESHOLD,
  DEFAULT_SETTINGS,
  MAX_STAT,
  MIN_STAT,
} from "../types";

import type {
  CareAction,
  NeedAction,
  PetStats,
  StatName,
} from "../types";

const ACTION_TO_STAT: Record<NeedAction, StatName> = {
  eating: "food",
  drinking: "water",
  sleeping: "energy",
};

export default function usePetAI() {
  const [stats, setStats] = useState<PetStats>({
    food: MAX_STAT,
    water: MAX_STAT,
    energy: MAX_STAT,
  });

  const [action, setAction] =
    useState<CareAction>("idle");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStats((previous) => ({
        food: Math.max(
          MIN_STAT,
          previous.food -
            DEFAULT_SETTINGS.hungerRate,
        ),
        water: Math.max(
          MIN_STAT,
          previous.water -
            DEFAULT_SETTINGS.thirstRate,
        ),
        energy: Math.max(
          MIN_STAT,
          previous.energy -
            DEFAULT_SETTINGS.energyRate,
        ),
      }));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (action !== "idle") {
      return;
    }

    const needs: Array<{
      action: NeedAction;
      value: number;
    }> = [
      {
        action: "eating",
        value: stats.food,
      },
      {
        action: "drinking",
        value: stats.water,
      },
      {
        action: "sleeping",
        value: stats.energy,
      },
    ];

    const lowestNeed = needs.reduce(
      (lowest, current) =>
        current.value < lowest.value
          ? current
          : lowest,
    );

    if (lowestNeed.value <= AI_THRESHOLD) {
      setAction(lowestNeed.action);
    }
  }, [action, stats]);

  const requestAction = useCallback(
    (nextAction: NeedAction) => {
      setAction((current) =>
        current === "idle"
          ? nextAction
          : current,
      );
    },
    [],
  );

  const completeAction = useCallback(
    (completedAction: NeedAction) => {
      const statName =
        ACTION_TO_STAT[completedAction];

      setStats((previous) => ({
        ...previous,
        [statName]: MAX_STAT,
      }));

      setAction((current) =>
        current === completedAction
          ? "idle"
          : current,
      );
    },
    [],
  );

  return {
    stats,
    action,
    requestAction,
    completeAction,
  };
}