'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import Journal from '@/lib/models/journal.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';

interface CreateCharacterParams {
  name: string;
  gender: 'male' | 'female';
}

export async function createCharacter({ name, gender }: CreateCharacterParams) {
  if (name.length < 3) throw new Error('Your name should be at least 3 characters');

  const token = cookies().get(COOKIE_NAME);

  if (!token) throw new Error('Unathorized');

  try {
    const userId = extractUserId(token);

    connectToDB();

    const user = await User.findById(userId);

    if (!user) throw new Error('Unauthorized');

    const isNameTaken = await Character.findOne({ name: name.toLowerCase().trim() });

    if (isNameTaken) throw new Error('Name is already taken');

    const character = await Character.create({
      name,
      gender,
      owner: user._id,
    })

    const journal = await Journal.create({
      owner: character._id,
    })

    character.journal = journal._id;
    await character.save();

    user.character = character._id;
    await user.save();

    return 'Character created successfully';

  } catch (error) {
    console.log(`${new Date} - Failed to create character - ${error}`);
    throw error;
  }
}