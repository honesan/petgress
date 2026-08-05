import { useEffect, useState } from "react";

import type { Position } from "../types";

function getViewportCenter(): Position {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export default function useMouseFollow(enabled: boolean) {
  const [position, setPosition] =
    useState<Position>(getViewportCenter);

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      if (!enabled || !event.isPrimary) {
        return;
      }

      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("pointerdown", updatePosition, {
      passive: true,
    });

    window.addEventListener("pointermove", updatePosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "pointerdown",
        updatePosition,
      );

      window.removeEventListener(
        "pointermove",
        updatePosition,
      );
    };
  }, [enabled]);

  useEffect(() => {
    const keepInsideViewport = () => {
      setPosition((previous) => ({
        x: Math.min(
          Math.max(previous.x, 0),
          window.innerWidth,
        ),
        y: Math.min(
          Math.max(previous.y, 0),
          window.innerHeight,
        ),
      }));
    };

    window.addEventListener(
      "resize",
      keepInsideViewport,
    );

    return () => {
      window.removeEventListener(
        "resize",
        keepInsideViewport,
      );
    };
  }, []);

  return position;
}