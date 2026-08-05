export interface Position {
  x: number;
  y: number;
}

export interface PetStats {
  food: number;
  water: number;
  energy: number;
}

export type PetAction =
  | "idle"
  | "walking"
  | "eating"
  | "drinking"
  | "sleeping";

export type StationType =
  | "food"
  | "water"
  | "bed";

export interface Station {
  id: StationType;
  x: number;
  y: number;
}

export interface DogState {
  position: Position;
  target: Position;
  facingLeft: boolean;
  action: PetAction;
}

export interface GameSettings {
  moveSpeed: number;
  hungerRate: number;
  thirstRate: number;
  energyRate: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  moveSpeed: 4,
  hungerRate: 0.15,
  thirstRate: 0.12,
  energyRate: 0.1,
};

export const MAX_STAT = 100;
export const MIN_STAT = 0;
export const AI_THRESHOLD = 30;