'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';
import { moveItem } from '@/lib/utils/inventory/moveItem';
import Item from '@/lib/models/item.model';

interface MoveItemParams {
  itemId: string;
  x: number;
  y: number;
}

export async function moveItemAction({ itemId, x, y }: MoveItemParams) {
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

     if (!user || !user.character) throw new Error('Unauthorized');

     const itemToMove = await Item.findById(itemId);

     const inventory = user.character.inventory;

     const updatedInventory = moveItem({ inventory, item: itemToMove, x, y });

     user.character.inventory = updatedInventory;

     await user.character.save();
  } catch (error: any) {
    console.log(`${new Date} - Failed to move item - ${error}`);
    throw new Error(error.message)
  }
}