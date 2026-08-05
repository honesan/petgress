import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Dog from "./Dog";
import Stations from "./Stations";
import Stats from "./Stats";
import Status from "./Status";

import useMouseFollow from "../hooks/useMouseFollow";
import usePetAI from "../hooks/usePetAI";

import type {
  NeedAction,
  PetAction,
  Position,
} from "../types";

const CARE_DURATION_MS = 3000;
const DOG_SIDE_MARGIN = 48;
const DOG_TOP_LIMIT = 112;
const DOG_BOTTOM_MARGIN = 64;
const DOG_STATION_GAP = 44;

function getInitialPosition(): Position {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

function clampPosition(
  position: Position,
): Position {
  const maximumX = Math.max(
    DOG_SIDE_MARGIN,
    window.innerWidth - DOG_SIDE_MARGIN,
  );

  const maximumY = Math.max(
    DOG_TOP_LIMIT,
    window.innerHeight - DOG_BOTTOM_MARGIN,
  );

  return {
    x: Math.min(
      Math.max(
        position.x,
        DOG_SIDE_MARGIN,
      ),
      maximumX,
    ),
    y: Math.min(
      Math.max(
        position.y,
        DOG_TOP_LIMIT,
      ),
      maximumY,
    ),
  };
}

export default function GameArea() {
  const {
    stats,
    action,
    requestAction,
    completeAction,
  } = usePetAI();

  const pointerPosition =
    useMouseFollow(action === "idle");

  const foodRef =
    useRef<HTMLButtonElement | null>(null);

  const waterRef =
    useRef<HTMLButtonElement | null>(null);

  const bedRef =
    useRef<HTMLButtonElement | null>(null);

  const [
    targetPosition,
    setTargetPosition,
  ] = useState<Position>(
    getInitialPosition,
  );

  const [
    dogAction,
    setDogAction,
  ] = useState<PetAction>("idle");

  const [
    travelAction,
    setTravelAction,
  ] = useState<NeedAction | null>(null);

  const [
    facingLeft,
    setFacingLeft,
  ] = useState(false);

  const previousTargetX =
    useRef(targetPosition.x);

  const updateTarget = useCallback(
    (nextPosition: Position) => {
      const clampedPosition =
        clampPosition(nextPosition);

      if (
        clampedPosition.x <
        previousTargetX.current - 1
      ) {
        setFacingLeft(true);
      } else if (
        clampedPosition.x >
        previousTargetX.current + 1
      ) {
        setFacingLeft(false);
      }

      previousTargetX.current =
        clampedPosition.x;

      setTargetPosition(
        clampedPosition,
      );
    },
    [],
  );

  const getStationTarget = useCallback(
    (
      nextAction: NeedAction,
    ): Position => {
      const stationElement =
        nextAction === "eating"
          ? foodRef.current
          : nextAction === "drinking"
            ? waterRef.current
            : bedRef.current;

      if (!stationElement) {
        return getInitialPosition();
      }

      const rectangle =
        stationElement.getBoundingClientRect();

      return {
        x:
          rectangle.left +
          rectangle.width / 2,
        y:
          rectangle.top -
          DOG_STATION_GAP,
      };
    },
    [],
  );

  useEffect(() => {
    if (action !== "idle") {
      return;
    }

    setTravelAction(null);
    setDogAction("idle");

    updateTarget(
      pointerPosition,
    );
  }, [
    action,
    pointerPosition,
    updateTarget,
  ]);

  useEffect(() => {
    if (action === "idle") {
      return;
    }

    setTravelAction(action);
    setDogAction("walking");

    updateTarget(
      getStationTarget(action),
    );
  }, [
    action,
    getStationTarget,
    updateTarget,
  ]);

  useEffect(() => {
    if (
      !travelAction ||
      dogAction !== travelAction
    ) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        completeAction(
          travelAction,
        );
      },
      CARE_DURATION_MS,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    completeAction,
    dogAction,
    travelAction,
  ]);

  useEffect(() => {
    const updateAfterResize = () => {
      if (action === "idle") {
        updateTarget(
          pointerPosition,
        );

        return;
      }

      updateTarget(
        getStationTarget(action),
      );
    };

    window.addEventListener(
      "resize",
      updateAfterResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateAfterResize,
      );
    };
  }, [
    action,
    getStationTarget,
    pointerPosition,
    updateTarget,
  ]);

  const handleMoveComplete =
    useCallback(() => {
      if (
        !travelAction ||
        dogAction !== "walking"
      ) {
        return;
      }

      setDogAction(
        travelAction,
      );
    }, [
      dogAction,
      travelAction,
    ]);

  const isBusy =
    action !== "idle";

  return (
    <div className="game-area relative overflow-hidden bg-gradient-to-b from-sky-300 to-green-300">
      <Stats
        food={stats.food}
        water={stats.water}
        energy={stats.energy}
      />

      <Status
        action={dogAction}
        stats={stats}
      />

      <div className="pointer-events-none absolute inset-0 z-20">
        <Dog
          x={targetPosition.x}
          y={targetPosition.y}
          action={dogAction}
          facingLeft={facingLeft}
          onMoveComplete={
            handleMoveComplete
          }
        />
      </div>

      <Stations
        foodRef={foodRef}
        waterRef={waterRef}
        bedRef={bedRef}
        disabled={isBusy}
        onFoodClick={() =>
          requestAction("eating")
        }
        onWaterClick={() =>
          requestAction("drinking")
        }
        onBedClick={() =>
          requestAction("sleeping")
        }
      />
    </div>
  );
}