import { CharacterInterface } from "@/lib/interfaces/character.interface";

export function calculateExperience(level: number) {
  return 10 * (level + 1) - 15;
}

export const calculatePower = (character: CharacterInterface) => {
  const power = character.strength + character.endurance + character.agility + character.dexterity + 
  character.intelligence + character.charisma + (character.level * 10) + (character.mainHand?.power ?? 0) +
  (character.offHand?.power ?? 0) + (character.head?.power ?? 0) + (character.chest?.power ?? 0) + (character.legs?.power ?? 0);

  return power;
}