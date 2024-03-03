'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import User from '@/lib/models/user.model';
import Item from '@/lib/models/item.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// extracts the user id from the jwt and returns the user object if it is valid
export async function getUser(getInventory = false) {
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

    // If "getInventory" is true, populate the entire inventory with the items.
    if (getInventory && user.character) {
      const inventory = user.character.inventory;

      for (let i = 0; i < inventory.length; i++) {
        for (let j = 0; j < inventory[i].length; j++) {
          if (inventory[i][j] && typeof inventory[i][j] === 'object') {
            const item = await Item.findById(inventory[i][j]);

            inventory[i][j] = item;
          }
        }
      }
    }

    if (!user) throw new Error('Unauthorized')

    revalidatePath('/game/overview');
    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    console.log(`${new Date} - Failed to authenticate user - ${error}`);
    throw error;
  }
}