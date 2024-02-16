export interface EnemyInterface {
  name: string;
  image: string;
  level: number;
  strength: number;
  endurance: number;
  dexterity: number;
  agility: number;
  intelligence: number;
  charisma: number;
  experience: number[];
  crowns: number[];
  boss?: boolean;
  id: number;
  power?: number;
}

export interface EnemyStatsInterface {
  name: string;
  image: string;
  level?: number[];
  strength?: number[];
  endurance?: number[];
  dexterity?: number[];
  agility?: number[];
  intelligence?: number[];
  charisma?: number[];
  experience?: number[];
  crowns?: number[];
  boss?: boolean;
  items?: string[];
  id: number;
  power?: number;
}

export type Expeditions = {
  [key: string]: {
    [key: string]: EnemyInterface;
  };
};