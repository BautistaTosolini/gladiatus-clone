'use server'

import { COOKIE_NAME } from '@/constants';
import { items } from '@/constants/items';
import Character from '@/lib/models/character.model';
import Item from '@/lib/models/item.model';
import Journal from '@/lib/models/journal.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { insertItem } from '@/lib/utils/inventory/insertItem';
import { cookies } from 'next/headers';

interface CreateCharacterParams {
  name: string;
  gender: 'male' | 'female';
}

export async function createCharacter({ name, gender }: CreateCharacterParams) {
  if (name.length < 3) return { error: { message: 'Name should be at least 3 characters' } };

  const token = cookies().get(COOKIE_NAME);

  if (!token) throw new Error('Unathorized');

  try {
    const userId = extractUserId(token);

    connectToDB();

    const user = await User.findById(userId);

    if (!user || user.character) throw new Error('Unauthorized');

    const isNameTaken = await Character.findOne({ name });

    if (isNameTaken) return { error: { message: 'Name is already taken' } };

    const character = await Character.create({
      name,
      gender,
      owner: user._id,
    })

    const sword = items.short_sword; // Initial sword.
    const shield = items.planks; // Initial shield.

    const initialSword = await Item.create({
      owner: character._id,
      ...sword,
    })
    
    initialSword.id = `${sword.itemId}-${initialSword._id}`;
    await initialSword.save();

    const initialShield = await Item.create({
      owner: character._id,
      ...shield,
    })

    initialShield.id = `${shield.itemId}-${initialShield._id}`;
    await initialShield.save();

    character.inventory = insertItem({ inventory: character.inventory, item: initialSword, x: 0, y: 0 });
    character.inventory = insertItem({ inventory: character.inventory, item: initialShield, x: 1, y: 0 });

    const journal = await Journal.create({
      owner: character._id,
    })

    character.journal = journal._id;
    await character.save();

    user.character = character._id;
    await user.save();

  } catch (error) {
    console.log(`${new Date} - Failed to create character - ${error}`);
    throw error;
  }
}