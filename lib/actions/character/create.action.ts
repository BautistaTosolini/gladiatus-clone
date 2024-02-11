'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.models';
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

    const character = await Character.create({
      name,
      gender,
      owner: user._id,
    })

    user.character = character._id;

    user.save();

    return 'Character created successfully';

  } catch (error) {
    console.log(`${new Date} - Failed to authenticate user - ${error}`)
    throw error;
  }
}