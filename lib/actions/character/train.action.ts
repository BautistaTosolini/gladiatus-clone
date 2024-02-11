'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.models';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';

const statsList = [
  'strength',
  'endurance',
  'agility',
  'dexterity',
  'intelligence',
  'charisma',
];

export async function trainCharacter(stat: string) {
  const token = cookies().get(COOKIE_NAME);

  if (!token) throw new Error('Unathorized');

  try {
    const userId = extractUserId(token);

    connectToDB();

    const user = await User.findById(userId)
      .populate({
        path: 'character',
        model: Character,
      })

    if (!user) throw new Error('Unauthorized');

    const character = user.character;

    if (!statsList.includes(stat)) throw new Error('Stat not found');

    const requiredCrowns = Math.pow(character[stat], 2) + character[stat] + 1;

    if (character.crowns < requiredCrowns) throw new Error('Not enough crowns');

    character.crowns -= requiredCrowns;
    character[stat]++;

    await character.save();

    return JSON.parse(JSON.stringify(character));

  } catch (error) {
    console.log(`${new Date} - Failed to authenticate user - ${error}`)
    throw error;
  }
}