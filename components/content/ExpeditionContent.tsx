'use client'

import { EnemyStatsInterface } from '@/lib/interfaces/enemy.interface';
import EnemyCard from '@/components/cards/EnemyCard';
import { useEffect, useState } from 'react';
import { canFight } from '@/lib/utils';
import { CharacterInterface } from '@/lib/interfaces/character.interface';

interface ExpeditionContentProps {
  enemies: EnemyStatsInterface[];
  expeditionName: string;
  character: CharacterInterface;
}

const ExpeditionContent = ({ enemies, expeditionName, character }: ExpeditionContentProps) => {
  const [canCharacterFight, setCanCharacterFight] = useState(canFight({ time: new Date(character.expeditionLastBattle).getTime(), fight: 'expedition' }));

  // Verify if the character can fight every second.
  useEffect(() => {
    const interval = setInterval(async () => {
      const canCharacterFight = canFight({ time: new Date(character.expeditionLastBattle).getTime(), fight: 'expedition' });
      if (canCharacterFight) {
        setCanCharacterFight(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-row gap-4'>
      {enemies.map((enemy) => (
        <EnemyCard
          key={enemy.id}
          enemy={enemy}
          expedition={expeditionName}
          canFight={canCharacterFight}
        />
        ))}
    </div>
  )
}

export default ExpeditionContent;