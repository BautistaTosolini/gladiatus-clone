'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';
import Journal from '@/lib/models/journal.model';
import { fight } from '@/lib/utils/simulateCombat';
import BattleReport from '@/lib/models/battleReport.model';
import { calculateHonor } from '@/lib/utils/battleUtils';
import { revalidatePath } from 'next/cache';

export async function battleArena(defenderId: string) {
  const token = cookies().get(COOKIE_NAME);

  if (!token) throw new Error('Unathorized');

  try {
    const userId = extractUserId(token);

    connectToDB();

    const user = await User.findById(userId)
      .populate({
        path: 'character',
        model: Character,
        populate: {
          path: 'journal',
          model: Journal,
        }
      })

    if (!user || !user.character) throw new Error('Unauthorized');

    const attacker = user.character;

    if (attacker._id == defenderId) throw new Error(`Can't fight the same character`);
    
    const defender = await Character.findById(defenderId)
      .populate({
        path: 'journal',
        model: Journal,
      })

    if (!defender) throw new Error('Rival not found');

    const attackerJournal = attacker.journal;
    const defenderJournal = defender.journal;

    const { rounds, result } = fight({ attacker, defender });

    result.honorEarned = 0;
    result.honorLost = 0;

    const battleReport = {
      result,
      rounds,
      attacker: attacker._id,
      defender: defender._id,
    }

    // Delete both battle reports and then replace them later with the new one.
    await BattleReport.findByIdAndDelete(attacker.battleReport);
    await BattleReport.findByIdAndDelete(defender.battleReport);

    if (result.winner === 'Draw') {
      attackerJournal.arena.draws++;
      defenderJournal.arena.draws++;
    } 
    // Attacker won.
    else if (result.winner == attacker._id) {
      // Calculate honor using the Elo system, the first parameter is the character who won.
      const earnedAndLostHonor = calculateHonor(attacker, defender);

      const earnedHonor = earnedAndLostHonor;
      const lostHonor = earnedAndLostHonor * -1;

      battleReport.result.honorEarned = earnedHonor;
      battleReport.result.honorLost = lostHonor;

      attackerJournal.arena.wins++;
      defenderJournal.arena.defeats++;

      attacker.honor += earnedHonor;
      defender.honor += lostHonor;
    }
    // Defender won.
    else if (result.winner == defender._id) {
      const earnedAndLostHonor = calculateHonor(defender, attacker);

      const earnedHonor = earnedAndLostHonor;
      const lostHonor = earnedAndLostHonor * -1;

      battleReport.result.honorEarned = earnedHonor;
      battleReport.result.honorLost = lostHonor;

      attackerJournal.arena.defeats++;
      defenderJournal.arena.wins++;

      defender.honor += earnedHonor;
      attacker.honor += lostHonor;
    }

    // Update both characters journals.
    attackerJournal.arena.battles++;
    attackerJournal.arena.damageInflicted += result.attackerTotalDamage;
    attackerJournal.arena.damageReceived += result.defenderTotalDamage;

    defenderJournal.arena.battles++;
    defenderJournal.arena.damageInflicted += result.defenderTotalDamage;
    defenderJournal.arena.damageReceived += result.attackerTotalDamage;

    const savedBattleReport = await BattleReport.create(battleReport);

    if (attacker.honor < 0) attacker.honor = 0;
    attacker.battleReport = savedBattleReport._id;
    await attacker.save();
    await attackerJournal.save();

    if (defender.honor < 0) defender.honor = 0;
    defender.battleReport = savedBattleReport._id;
    await defender.save();
    await defenderJournal.save();

    revalidatePath('/game/arena');
    return JSON.parse(JSON.stringify(savedBattleReport._id));

  } catch (error) {
    console.log(`${new Date} - Failed to simulate arena battle - ${error}`);
    throw error;
  }
}