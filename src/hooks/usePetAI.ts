import { useEffect, useState } from "react";


export default function usePetAI() {
  const [stats, setStats] = useState<PetStats>({
    food: 100,
    water: 100,
    energy: 100
  });

  const [action, setAction] = useState<PetAction>("idle");

  useEffect(() => {
    const timer = setInterval(() => {
      setStats((previous) => ({
        food: Math.max(0, previous.food - 0.15),
        water: Math.max(0, previous.water - 0.12),
        energy: Math.max(0, previous.energy - 0.10)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (action !== "idle") return;

    if (stats.food <= 30) {
      setAction("eating");
      return;
    }

    if (stats.water <= 30) {
      setAction("drinking");
      return;
    }

    if (stats.energy <= 30) {
      setAction("sleeping");
    }
  }, [stats, action]);

  useEffect(() => {
    if (action === "idle") return;

    const timer = setTimeout(() => {
      setStats((previous) => {
        switch (action) {
          case "eating":
            return {
              ...previous,
              food: 100
            };

          case "drinking":
            return {
              ...previous,
              water: 100
            };

          case "sleeping":
            return {
              ...previous,
              energy: 100
            };

          default:
            return previous;
        }
      });

      setAction("idle");
    }, 3000);

    return () => clearTimeout(timer);
  }, [action]);

  return {
    stats,
    action
  };
}