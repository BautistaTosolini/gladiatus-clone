import { UserInterface } from '@/interfaces/user.interface';

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
  honour: number;
  power: number;
  [key: string]: any;
}