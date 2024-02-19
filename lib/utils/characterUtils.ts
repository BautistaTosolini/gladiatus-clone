import { CharacterInterface } from "@/lib/interfaces/character.interface";

export function calculateExperience(level: number) {
  return 10 * (level + 1) - 15;
}

interface Defender {
  agility: number;
  charisma: number;
  strength: number;
  endurance: number;
  dexterity: number;
  intelligence: number;
  image: string;
  name: string;
  level: number;
  crowns?: number[] | undefined;
  xp?: number[] | undefined;
  gender: string;
  power: number;
  _id?: number | undefined;
}

export const calculatePower = (character: CharacterInterface | Defender ) => {
  const power = character.strength + character.endurance + character.agility + character.dexterity + 
  character.intelligence + character.charisma + (character.level * 10);
  
  return power;
}