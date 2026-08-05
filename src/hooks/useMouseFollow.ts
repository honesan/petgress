import { useEffect, useRef, useState } from "react";

export interface Position {
  x: number;
  y: number;
}

export default function useMouseFollow(
  enabled: boolean,
  speed = 0.08
) {
  const [position, setPosition] = useState<Position>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const target = useRef<Position>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const mouseMove = (event: MouseEvent) => {
      if (!enabled) return;

      target.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const touchMove = (event: TouchEvent) => {
      if (!enabled) return;

      const touch = event.touches[0];

      target.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, [enabled]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setPosition((previous) => ({
        x: previous.x + (target.current.x - previous.x) * speed,
        y: previous.y + (target.current.y - previous.y) * speed,
      }));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return position;
}