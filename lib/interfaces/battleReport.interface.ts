import { CharacterInterface } from '@/lib/interfaces/character.interface';
import { EnemyInterface, EnemyStatsInterface } from '@/lib/interfaces/enemy.interface';

export interface BattleReport {
  createdAt: string;
  zone: string;
  rounds: [
      {
        attackerHP: number;
        defenderHP: number;
        events: string[];
      }
    ]
  defender: {
    agility: number;
    charisma: number;
    strength: number;
    endurance: number;
    dexterity: number;
    intelligence: number;
    image: string;
    name: string;
    level: number;
    crowns?: number[];
    xp?: number[];
    gender: string;
    power: number;
  };
  result: {
    attackerFinalHealth: number;
    defenderFinalHealth: number;
    attackerHealth: number;
    defenderHealth: number;
    attackerTotalDamage: number;
    defenderTotalDamage: number;
    crownsDrop: number;
    experienceDrop: number;
    winner: string;
    honourEarned: number;
    honourLost: number;
  };
  attacker: CharacterInterface;
}

export interface CalculateHPParams {
  level: number;
  endurance: number;
}

export interface CalculateDoubleHitChanceParams {
  attackerCharisma: number;
  attackerDexterity: number;
  defenderIntelligence: number;
  defenderAgility: number;
}

export interface CalculateHitChanceParams {
  attackerDexterity: number;
  defenderAgility: number;
}

export interface FightParams {
  attacker: CharacterInterface;
  defender: EnemyInterface | CharacterInterface;
}

export interface BattleCreatureParams {
  character: CharacterInterface;
  enemy: EnemyStatsInterface;
}

export interface Round {
  roundNumber: number;
  attackerHP: number;
  defenderHP: number;
  events: string[];
}

export interface Result {
  attackerFinalHealth: number;
  defenderFinalHealth: number;
  attackerHealth: number;
  defenderHealth: number;
  attackerTotalDamage: number;
  defenderTotalDamage: number;
  winner: string;
  experienceDrop?: number;
  crownsDrop?: number;
  honourEarned?: number;
  honourLost?: number;
}

export interface Rival {
  _id: string;
  name: string;
  honour: number;
}