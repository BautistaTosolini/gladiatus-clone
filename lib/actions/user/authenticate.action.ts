'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.models';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function authenticateUser() {
  const token = cookies().get(COOKIE_NAME);

  if (!token) throw new Error('Unathorized');

  try {
    const userId = extractUserId(token);

    connectToDB();

    const user = await User.findById(userId)
      .populate({
        path: 'character',
        model: Character,
      });

    if (!user) throw new Error('Unauthorized');

    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    console.log(`${new Date} - Failed to authenticate user - ${error}`)
    throw error;
  }
}