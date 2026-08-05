import { useEffect } from "react";
import {
  motion,
  useAnimationControls,
} from "framer-motion";

import type { PetAction } from "../types";

interface DogProps {
  x: number;
  y: number;
  action: PetAction;
  facingLeft?: boolean;
  onMoveComplete?: () => void;
}

const movementTransition = {
  type: "spring" as const,
  stiffness: 140,
  damping: 20,
  mass: 0.8,
};

function getDogEmoji(action: PetAction) {
  switch (action) {
    case "eating":
      return "🐕🍖";

    case "drinking":
      return "🐕💧";

    case "sleeping":
      return "🐶💤";

    default:
      return "🐕";
  }
}

export default function Dog({
  x,
  y,
  action,
  facingLeft = false,
  onMoveComplete,
}: DogProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    let active = true;

    void controls
      .start(
        {
          x,
          y,
        },
        movementTransition,
      )
      .then(() => {
        if (
          active &&
          action === "walking"
        ) {
          onMoveComplete?.();
        }
      });

    return () => {
      active = false;
    };
  }, [
    action,
    controls,
    onMoveComplete,
    x,
    y,
  ]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-50 -ml-12 -mt-10 flex h-20 w-24 select-none items-center justify-center text-6xl leading-none will-change-transform sm:text-7xl"
      initial={{
        x,
        y,
      }}
      animate={controls}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        style={{
          transform: `scaleX(${
            facingLeft ? -1 : 1
          })`,
        }}
      >
        <motion.span
          className="inline-block"
          animate={
            action === "walking"
              ? {
                  y: [0, -7, 0],
                  scale: 1,
                }
              : action === "sleeping"
                ? {
                    y: [0, -2, 0],
                    scale: 0.94,
                  }
                : {
                    y: [0, -2, 0],
                    scale: 1,
                  }
          }
          transition={{
            repeat: Infinity,
            duration:
              action === "walking"
                ? 0.35
                : 1.8,
            ease: "easeInOut",
          }}
        >
          {getDogEmoji(action)}
        </motion.span>
      </div>
    </motion.div>
  );
}