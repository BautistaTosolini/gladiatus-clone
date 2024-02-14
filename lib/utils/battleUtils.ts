import { EnemyInterface, EnemyStatsInterface } from '@/lib/interfaces/enemy.interface';
import { CalculateDoubleHitChanceParams, CalculateHPParams, CalculateHitChanceParams } from '@/lib/interfaces/battleReport.interface';
import { CharacterInterface } from '@/lib/interfaces/character.interface';

export function getRandomEnemyStats(enemy: EnemyStatsInterface) {
  const levels = enemy.level;

  // If the level is a single value, there are no options, use that level.
  if (!Array.isArray(levels)) {
    return {
      ...enemy,
    };
  }

  // If the level has multiple options, choose a random one.
  const randomIndex = Math.floor(Math.random() * levels.length);
  const selectedLevel = levels[randomIndex];

  // Get the statistics corresponding to the selected level.
  const stats = {
    strength: enemy.strength![randomIndex],
    endurance: enemy.endurance![randomIndex],
    dexterity: enemy.dexterity![randomIndex],
    agility: enemy.agility![randomIndex],
    intelligence: enemy.intelligence![randomIndex],
    charisma: enemy.charisma![randomIndex],
  };

  return {
    ...enemy,
    level: selectedLevel,
    strength: stats.strength,
    endurance: stats.endurance,
    dexterity: stats.dexterity,
    agility: stats.agility,
    intelligence: stats.intelligence,
    charisma: stats.charisma,
    power:
      stats.strength +
      stats.endurance +
      stats.dexterity +
      stats.agility +
      stats.intelligence +
      stats.charisma +
      selectedLevel * 10,
  };
}

export function calculateHP({ level, endurance }: CalculateHPParams): number {
  return level * 25 + (endurance * 2 - 10);
}

export function calculateHitChance({ attackerDexterity, defenderAgility}: CalculateHitChanceParams): number {
  return (attackerDexterity / (attackerDexterity + defenderAgility)) * 100;
}

export function calculateCriticalHitChance({ attackerCharisma, attackerDexterity, defenderIntelligence, defenderAgility}: CalculateDoubleHitChanceParams): number {
  return (
    (attackerCharisma * attackerDexterity) /
    defenderIntelligence /
    (defenderAgility * 10)
  );
}

export function calculateDamage( attacker: CharacterInterface | EnemyInterface, defender: CharacterInterface | EnemyInterface) {
  let minDamage = attacker.strength * 0.1;
  let maxDamage = attacker.strength * 0.2;

  const damage = Math.random() * (maxDamage - minDamage) + minDamage;

  return parseInt(Math.max(damage, 1).toFixed(0));
}

export function calculateCriticalDamage(attacker: CharacterInterface | EnemyInterface) {
  let minDamage = attacker.strength * 0.3;
  let maxDamage = attacker.strength * 0.6;

  const damage = Math.random() * (maxDamage - minDamage) + minDamage;

  return parseInt(Math.max(damage, 1).toFixed(0));
}

// Calculates the honor earned and lost using Elo system.
export function calculateHonor(attacker: CharacterInterface, defender: CharacterInterface) {
  const K = 40;
  const expectedResult = 1 / (1 + 10 ** ((defender.honor - attacker.honor) / 400));

  const earnedAndLostHonor = K * (1 - expectedResult);

  return parseInt(earnedAndLostHonor.toFixed(0));
}