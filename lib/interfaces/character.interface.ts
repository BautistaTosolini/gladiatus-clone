import { UserInterface } from '@/lib/interfaces/user.interface';
import { BattleReport } from '@/lib/interfaces/battleReport.interface';

export interface CharacterInterface {
  _id: string;
  name: string;
  owner: UserInterface | string;
  crowns: number;
  experience: number;
  level: number;
  dexterity: number;
  agility: number;
  endurance: number;
  strength: number;
  intelligence: number;
  charisma: number;
  onboarded: boolean;
  gender: 'male' | 'female';
  honor: number;
  power: number;
  battleReport: BattleReport;
  [key: string]: any;
  expeditionLastBattle: Date,
  arenaLastBattle: Date,
}