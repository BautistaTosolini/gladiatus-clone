'use client'

import Image from 'next/image';
import DescriptionCard from '@/components/shared/DescriptionCard';
import { CharacterInterface } from '@/lib/interfaces/character.interface';
import TrainStat from '@/components/shared/TrainStat';
import { useState } from 'react';
import { trainCharacter } from '@/lib/actions/character/train.action';
import toast from 'react-hot-toast';

const calculateStatCost = (stat: number) => Math.pow(stat, 2) + stat + 1;

const TrainingContent = ({ character }: { character: CharacterInterface }) => {
  const [characterInfo, setCharacterInfo] = useState(character);
  const [characterCrowns, setCharacterCrowns] = useState(character.crowns);

  const handleClick = async (stat: string) => {
    await trainCharacter(stat)
      .then((updatedCharacter) => {
        setCharacterInfo(updatedCharacter);
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
        <TrainStat 
          statName='Strength'
          statValue={characterInfo.strength}
          handleClick={() => handleClick('strength')}
          crownsValue={calculateStatCost(characterInfo.strength)}
          characterCrowns={characterInfo.crowns}
        />

        <TrainStat 
          statName='Endurance'
          statValue={characterInfo.endurance}
          handleClick={() => handleClick('endurance')}
          crownsValue={calculateStatCost(characterInfo.endurance)}
          characterCrowns={characterInfo.crowns}
        />

        <TrainStat 
          statName='Agility'
          statValue={characterInfo.agility}
          handleClick={() => handleClick('agility')}
          crownsValue={calculateStatCost(characterInfo.agility)}
          characterCrowns={characterInfo.crowns}
        />

        <TrainStat 
          statName='Dexterity'
          statValue={characterInfo.dexterity}
          handleClick={() => handleClick('dexterity')}
          crownsValue={calculateStatCost(characterInfo.dexterity)}
          characterCrowns={characterInfo.crowns}
        />

        <TrainStat 
          statName='Intelligence'
          statValue={characterInfo.intelligence}
          handleClick={() => handleClick('intelligence')}
          crownsValue={calculateStatCost(characterInfo.intelligence)}
          characterCrowns={characterInfo.crowns}
        />

        <TrainStat 
          statName='Charisma'
          statValue={characterInfo.charisma}
          handleClick={() => handleClick('charisma')}
          crownsValue={calculateStatCost(characterInfo.charisma)}
          characterCrowns={characterInfo.crowns}
          last
        />
      </div>
    </>
  )
}

export default TrainingContent;