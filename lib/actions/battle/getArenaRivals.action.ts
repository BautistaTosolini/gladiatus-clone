'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function getArenaRivals() {
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

    if (!user || !user.character) throw new Error('Unauthorized');

    const character = user.character;

    const position = await Character.countDocuments({
      honor: { $gte: character.honor },
    });

    const ranking = await Character
      .find(
        {
          honor: { $gte: character.honor },
          _id: { $ne: character._id },
          onboarded: true,
        },
        { name: 1, _id: 1, honor: 1 },
      )
      .sort({ honor: 1 })
      .limit(4);

    const rivals = ranking.map((rival, index) => ({
      name: rival.name,
      _id: rival._id,
      honor: rival.honor,
      rank: position - index - 1,
    }));

    rivals.unshift({
      name: character.name,
      _id: character._id,
      honor: character.honor,
      rank: position,
    });

    return JSON.parse(JSON.stringify(rivals.reverse()));

  } catch (error) {
    console.log(`${new Date} - Failed to get arena rivals - ${error}`);
    throw error;
  }
}