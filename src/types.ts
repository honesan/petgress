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

export type CareAction = Exclude<PetAction, "walking">;
export type NeedAction = Exclude<CareAction, "idle">;
export type StatName = keyof PetStats;

export interface NeedDecaySettings {
  hungerRate: number;
  thirstRate: number;
  energyRate: number;
}

export const DEFAULT_SETTINGS: NeedDecaySettings = {
  hungerRate: 0.15,
  thirstRate: 0.12,
  energyRate: 0.1,
};

export const MAX_STAT = 100;
export const MIN_STAT = 0;
export const AI_THRESHOLD = 30;