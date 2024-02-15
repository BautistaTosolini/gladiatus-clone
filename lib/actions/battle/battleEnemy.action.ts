'use server'

import { COOKIE_NAME } from '@/constants';
import Character from '@/lib/models/character.model';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { extractUserId } from '@/lib/utils';
import { cookies } from 'next/headers';
import Journal from '@/lib/models/journal.model';
import { battleCreature } from '@/lib/utils/simulateCombat';
import { randomBoolean } from '@/lib/utils/randomUtils';
import BattleReport from '@/lib/models/battleReport.model';
import { calculateExperience } from '@/lib/utils/characterUtils';
import { zones } from '@/constants/zones';
import { zoneEnemies } from '@/constants/enemies';
import { revalidatePath } from 'next/cache';

interface BattleEnemyParams {
  zoneName: string;
  enemyName: string;
}

export async function battleEnemy({ zoneName, enemyName }: BattleEnemyParams) {
  const token = cookies().get(COOKIE_NAME);

  if (!token) throw new Error('Unathorized');

  if (!zones.hasOwnProperty(zoneName)) throw new Error('Zone not found');

  // Pick the enemy object from the list.
  const enemy = zoneEnemies[zoneName][enemyName];

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

    const character = user.character;

    const journal = character.journal;

    const { battleSummary, pickedEnemy } = battleCreature({ character, enemy });

    journal.zones[zoneName][enemyName].battles++;

    // If the character won.
    if (battleSummary.result.winner === character._id) {
      journal.world.battles++;
      journal.world.wins++;
      journal.world.crownsEarned += battleSummary.result.crownsDrop;
      journal.zones[zoneName][enemyName].wins++;

      // Calculate probability of obtaining knowledge only if knowledge is not greater than 3.
      if (journal.zones[zoneName][enemyName].knowledge < 3 && randomBoolean(30)) {
        journal.zones[zoneName][enemyName].knowledge++;
      }
    }

    // If the enemy won.
    if (battleSummary.result.winner === pickedEnemy.id.toString()) {
      journal.world.battles++;
      journal.world.defeats++;
      journal.zones[zoneName][enemyName].defeats++;
    }

    // If it's a draw.
    if (battleSummary.result.winner === 'Draw') {
      journal.world.battles++;
      journal.world.draws++;
      journal.zones[zoneName][enemyName].draws++;
    }

    await journal.save();

     // Create the battle report and if there is already an existing one, delete it.
     const savedBattleReport = await BattleReport.create({
      result: battleSummary.result,
      rounds: battleSummary.rounds,
      zone: zoneName,
      defender: pickedEnemy,
      attacker: character._id,
    });

    await BattleReport.findByIdAndDelete(character.battleReport);

    character.battleReport = savedBattleReport._id;

    // If the experience it's enough for leveling up, make the calculations.
    if (character.experience + battleSummary.result.experienceDrop >= calculateExperience(character.level)) {
      character.experience = character.experience + battleSummary.result.experienceDrop - calculateExperience(character.level);
      character.level++;
    }
    // If its not enough only sum up the experience.
    else {
      character.experience += battleSummary.result.experienceDrop;
    }

    character.crowns += battleSummary.result.crownsDrop;

    await character.save();

    revalidatePath('/game/expeditions');
    return JSON.parse(JSON.stringify(savedBattleReport._id));

  } catch (error) {
    console.log(`${new Date} - Failed to simulate battle - ${error}`);
    throw error;
  }
}