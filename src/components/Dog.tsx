import { motion } from "framer-motion";

export type DogAction =
  | "idle"
  | "walking"
  | "eating"
  | "drinking"
  | "sleeping";

interface DogProps {
  x: number;
  y: number;
  action: DogAction;
  facingLeft?: boolean;
}

export default function Dog({
  x,
  y,
  action,
  facingLeft = false,
}: DogProps) {
  let emoji = "🐕";

  switch (action) {
    case "eating":
      emoji = "🐕";
      break;

    case "drinking":
      emoji = "🐕";
      break;

    case "sleeping":
      emoji = "🐶💤";
      break;

    default:
      emoji = "🐕";
  }

  return (
    <motion.div
      className="absolute select-none pointer-events-none z-50"
      animate={{
        x,
        y,
        scale: action === "sleeping" ? 0.95 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
      style={{
        left: 0,
        top: 0,
        fontSize: "72px",
        transform: `translate(-50%, -50%) scaleX(${facingLeft ? -1 : 1})`,
      }}
    >
      <motion.div
        animate={
          action === "walking"
            ? {
                y: [0, -6, 0],
              }
            : {
                y: [0, -2, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: action === "walking" ? 0.35 : 2,
          ease: "easeInOut",
        }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}