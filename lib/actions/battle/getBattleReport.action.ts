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

    if (!user) throw new Error('Unauthorized');

    const battleReport = await BattleReport.findById(battleReportId)
      .populate({
        path: 'attacker',
        model: Character,
      })

    if (!battleReport) throw new Error('Battle report was not found');
      
    // If defender hasn't "id" field, then is a character and it should populate it.
    if (!('id' in battleReport.defender)) {
      battleReport.populate({
        path: 'defender',
        model: Character,
      })
    }

   return JSON.parse(JSON.stringify(battleReport));

  } catch (error) {
    console.log(`${new Date} - Failed to get enemies - ${error}`);
    return null;
  }
}