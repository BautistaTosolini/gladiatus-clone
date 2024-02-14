import { CharacterInterface } from '@/lib/interfaces/character.interface';

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  username: string;
  character: CharacterInterface;
}