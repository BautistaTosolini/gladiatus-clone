import { BattleCreatureParams, FightParams, Result, Round } from '@/lib/interfaces/battleReport.interface';
import { EnemyInterface } from '@/lib/interfaces/enemy.interface';
import { calculateCriticalDamage, calculateCriticalHitChance, calculateDamage, calculateHP, calculateHitChance, getRandomEnemyStats } from '@/lib/utils/battleUtils';
import { getRandomNumber, randomBoolean } from '@/lib/utils/randomUtils';
import { CharacterInterface } from '../interfaces/character.interface';


// Simulates a battle between a character and a creature or a character.
export function fight({ attacker, defender }: FightParams): { rounds: Round[], result: Result} {

  // First, important values ​​such as life, probability of hitting and critical hit are calculated, all based on the statistics of the character and enemy.
  let attackerHP = calculateHP({
    level: attacker.level,
    endurance: attacker.endurance,
  });

  let defenderHP = calculateHP({
    level: defender.level,
    endurance: defender.endurance,
  });

  const attackerHitChance = calculateHitChance({
    attackerDexterity: attacker.dexterity,
    defenderAgility: defender.agility,
  });

  const defenderHitChance = calculateHitChance({
    attackerDexterity: defender.dexterity,
    defenderAgility: attacker.agility,
  });

  const attackerCriticalHitChance = calculateCriticalHitChance({
    attackerCharisma: attacker.charisma,
    attackerDexterity: attacker.dexterity,
    defenderIntelligence: defender.intelligence,
    defenderAgility: defender.agility,
  });

  const defenderCriticalHitChance = calculateCriticalHitChance({
    attackerCharisma: defender.charisma,
    attackerDexterity: defender.dexterity,
    defenderIntelligence: attacker.intelligence,
    defenderAgility: attacker.agility,
  });

  // Loop where each round is simulated and then stored in rounds.
  const rounds: Round[] = [];
  let roundNumber = 1;

  let attackerTotalDamage = 0;
  let defenderTotalDamage = 0;

  while (attackerHP > 0 && defenderHP > 0) {
    const round: Round = {
      roundNumber,
      attackerHP: parseFloat(attackerHP.toFixed(2)),
      defenderHP: parseFloat(defenderHP.toFixed(2)),
      events: [],
    };

    if (randomBoolean(attackerHitChance)) {
      const damage = calculateDamage(attacker, defender);
      attackerTotalDamage += damage;
      defenderHP -= damage;
      round.events.push(
        `${attacker.name} hits ${defender.name} for ${parseFloat(
          damage.toFixed(2),
        )} points.`,
      );
    } else {
      round.events.push(`${attacker.name} misses their attack.`);
    }

    if (randomBoolean(defenderHitChance)) {
      const damage = calculateDamage(defender, defender);
      defenderTotalDamage += damage;
      attackerHP -= damage;
      round.events.push(
        `${defender.name} hits ${attacker.name} for ${parseFloat(
          damage.toFixed(2),
        )} points.`,
      );
    } else {
      round.events.push(`${defender.name} misses their attack.`);
    }

    if (randomBoolean(attackerCriticalHitChance)) {
      const criticalDamage = calculateCriticalDamage(attacker);
      attackerTotalDamage += criticalDamage;
      defenderHP -= criticalDamage;
      round.events.push(
        `${attacker.name} lands a critical hit on ${
          defender.name
        } for ${parseFloat(criticalDamage.toFixed(2))} points.`,
      );
    }

    if (randomBoolean(defenderCriticalHitChance)) {
      const criticalDamage = calculateCriticalDamage(defender);
      defenderTotalDamage += criticalDamage;
      attackerHP -= criticalDamage;
      round.events.push(
        `${defender.name} lands a critical hit on ${
          attacker.name
        } for ${parseFloat(criticalDamage.toFixed(2))} points.`,
      );
    }

    rounds.push(round);
    roundNumber++;
  }

  // Once one of the fighters dies, the results are calculated.
  let winner: string;

  const attackerFinalHealth = parseFloat(attackerHP.toFixed(2));
  const defenderFinalHealth = parseFloat(defenderHP.toFixed(2));

  const roundedAttackerTotalDamage = parseInt(attackerTotalDamage.toFixed(2));
  const roundedDefenderTotalDamage = parseInt(defenderTotalDamage.toFixed(2));

  // Both lost.
  if (attackerHP <= 0 && defenderHP <= 0) {
    winner = 'Draw';

    const result: Result = {
      winner,
      attackerFinalHealth,
      defenderFinalHealth,
      attackerTotalDamage: roundedAttackerTotalDamage,
      defenderTotalDamage: roundedDefenderTotalDamage,
      attackerHealth: calculateHP({
        level: attacker.level,
        endurance: attacker.endurance,
      }),
      defenderHealth: calculateHP({
        level: defender.level,
        endurance: defender.endurance,
      }),
    };

    return { rounds, result };

  // Defender won.
  } else if (attackerHP <= 0) {

    // If defender has "id" (not "_id") field it's, a creature.
    if ('id' in defender) {
      winner = defender.id.toString();

    // If it doesn't, it's a character.
    } else {
      winner = defender._id;
    }

    const result: Result = {
      winner,
      attackerFinalHealth,
      defenderFinalHealth,
      attackerTotalDamage: roundedAttackerTotalDamage,
      defenderTotalDamage: roundedDefenderTotalDamage,
      attackerHealth: calculateHP({
        level: attacker.level,
        endurance: attacker.endurance,
      }),
      defenderHealth: calculateHP({
        level: defender.level,
        endurance: defender.endurance,
      }),
    };

    return { rounds, result };

  // Attacker won.
  } else {
    winner = attacker._id;

    const result: Result = {
      winner,
      attackerFinalHealth,
      defenderFinalHealth,
      attackerTotalDamage: roundedAttackerTotalDamage,
      defenderTotalDamage: roundedDefenderTotalDamage,
      attackerHealth: calculateHP({
        level: attacker.level,
        endurance: attacker.endurance,
      }),
      defenderHealth: calculateHP({
        level: defender.level,
        endurance: defender.endurance,
      }),
    };

    return { rounds, result };
  }
}

export function battleCreature({ character, enemy }: BattleCreatureParams): { battleSummary: { rounds: Round[], result: Result }, pickedEnemy: EnemyInterface } {
  // Choose the statistics of the enemy to fight randomly.
  const pickedEnemy = getRandomEnemyStats(enemy) as EnemyInterface;

  // Once picked the creature, the fight is simulated.
  // The rewards are calculated randomly and vary depending on who has won.
  const battleSummary = fight({ attacker: character, defender: pickedEnemy });

  // Both lost.
  if (battleSummary.result.winner === 'Draw') {
    const experienceDrop = parseInt((getRandomNumber(pickedEnemy.experience[0], pickedEnemy.experience[1]) * 0.5).toFixed(0));
    const crownsDrop = parseInt(getRandomNumber(pickedEnemy.crowns[0], pickedEnemy.crowns[1] * 0.3).toFixed(0));

    battleSummary.result.experienceDrop = experienceDrop;
    battleSummary.result.crownsDrop = crownsDrop;
  }

  // Attacker won.
  if (battleSummary.result.winner === character._id) {
    const experienceDrop = getRandomNumber(pickedEnemy.experience[0], pickedEnemy.experience[1]);
    const crownsDrop = getRandomNumber(pickedEnemy.crowns[0], pickedEnemy.crowns[1]);

    battleSummary.result.experienceDrop = experienceDrop;
    battleSummary.result.crownsDrop = crownsDrop;
  }

  // Defender won.
  if (battleSummary.result.winner === pickedEnemy.id.toString()) {
    const experienceDrop = parseInt((getRandomNumber(pickedEnemy.experience[0], pickedEnemy.experience[1]) * 0.3).toFixed(0));
    const crownsDrop = 0;

    battleSummary.result.experienceDrop = experienceDrop;
    battleSummary.result.crownsDrop = crownsDrop;
  }

  return { battleSummary, pickedEnemy };
}