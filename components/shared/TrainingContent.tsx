'use client'

import Image from 'next/image';
import DescriptionCard from '@/components/shared/DescriptionCard';
import { stats } from '@/constants';
import { CharacterInterface } from '@/lib/interfaces/character.interface';
import TrainStat from '@/components/shared/TrainStat';
import { useState } from 'react';
import { trainCharacter } from '@/lib/actions/character/train.action';
import toast from 'react-hot-toast';

interface Stat {
  strength: number;
  endurance: number;
  agility: number;
  dexterity: number;
  intelligence: number;
  charisma: number;
  [key: string]: any;
}

const TrainingContent = ({ character }: { character: CharacterInterface }) => {
  const [characterStats, setCharacterStats] = useState<Stat>({
    strength: character.strength,
    endurance: character.endurance,
    agility: character.agility,
    dexterity: character.dexterity,
    intelligence: character.intelligence,
    charisma: character.charisma,
  });
  const [characterCrowns, setCharacterCrowns] = useState(character.crowns);

  const handleClick = async (stat: string) => {
    await trainCharacter(stat)
      .then((updatedCharacter) => {
        setCharacterStats({
          strength: updatedCharacter.strength,
          endurance: updatedCharacter.endurance,
          agility: updatedCharacter.agility,
          dexterity: updatedCharacter.dexterity,
          intelligence: updatedCharacter.intelligence,
          charisma: updatedCharacter.charisma,
        });
        setCharacterCrowns(updatedCharacter.crowns);
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  return (
    <>
      <div className='flex gap-4'>
        <Image 
          width={168}
          height={194}
          src={`/images/barracks.jpg`}
          alt='barrakcs'
        />
        <DescriptionCard
          title='Training'
        >
          <p>
            Within the city&apos;s barracks, you can observe robust soldiers training, who are willing to impart their skills in exchange for a generous sum of crowns.
          </p>
          <div className='flex items-center gap-1'>
            Your balance: {characterCrowns} 
            <Image 
              src={'/images/crowns.png'}
              width={12}
              height={12}
              alt='crowns'
            />
          </div>
        </DescriptionCard>
      </div>
      <div className='brown-card flex flex-col text-sm rounded-sm'>
        {stats.map((stat, index) => (
          <div key={index}>
            <TrainStat 
              statName={stat.name}
              statValue={characterStats[stat.id]}
              handleClick={() => handleClick(stat.id)}
              characterCrowns={character.crowns}
              last={index === stats.length - 1 ? true : false}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default TrainingContent;