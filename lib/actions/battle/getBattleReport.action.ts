'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';
import BattleReport from '@/lib/models/battleReport.model';

export async function getBattleReport(battleReportId: string) {
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

    const battleReport = await BattleReport.findById(battleReportId)
      .populate({
        path: 'attacker',
        model: Character,
      })

    if (!battleReport) throw new Error('Battle report was not found');
      
    // If defender has "_id" field (not "id"), then is a character and it should populate it.
    const isCharacter = '_id' in battleReport.defender;

    if (isCharacter) {
      // For some reason populate method doesn't work, there might be some error in the "battleReport" schema but i couldn't figure out. 
      // This way it's a little bit sketchy but it works.
      const defender = await Character.findById(battleReport.defender);
      battleReport.defender = defender;
    }

   return JSON.parse(JSON.stringify(battleReport));

  } catch (error) {
    console.log(`${new Date} - Failed to get battle report - ${error}`);
    return null;
  }
}