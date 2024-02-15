'use client'

import Image from 'next/image';
import DescriptionCard from '@/components/shared/DescriptionCard';
import { CharacterInterface } from '@/lib/interfaces/character.interface';
import TrainStat from '@/components/shared/TrainStat';
import { trainCharacter } from '@/lib/actions/character/train.action';
import toast from 'react-hot-toast';

const calculateStatCost = (stat: number) => Math.pow(stat, 2) + stat + 1;

const TrainingContent = ({ character }: { character: CharacterInterface }) => {
  const handleClick = async (stat: string) => {
    const response = await trainCharacter(stat);

    if (response!.error) return toast.error(response.error.message);
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
            Your balance: {character.crowns} 
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
          statValue={character.strength}
          handleClick={() => handleClick('strength')}
          crownsValue={calculateStatCost(character.strength)}
          characterCrowns={character.crowns}
        />

        <TrainStat 
          statName='Endurance'
          statValue={character.endurance}
          handleClick={() => handleClick('endurance')}
          crownsValue={calculateStatCost(character.endurance)}
          characterCrowns={character.crowns}
        />

        <TrainStat 
          statName='Agility'
          statValue={character.agility}
          handleClick={() => handleClick('agility')}
          crownsValue={calculateStatCost(character.agility)}
          characterCrowns={character.crowns}
        />

        <TrainStat 
          statName='Dexterity'
          statValue={character.dexterity}
          handleClick={() => handleClick('dexterity')}
          crownsValue={calculateStatCost(character.dexterity)}
          characterCrowns={character.crowns}
        />

        <TrainStat 
          statName='Intelligence'
          statValue={character.intelligence}
          handleClick={() => handleClick('intelligence')}
          crownsValue={calculateStatCost(character.intelligence)}
          characterCrowns={character.crowns}
        />

        <TrainStat 
          statName='Charisma'
          statValue={character.charisma}
          handleClick={() => handleClick('charisma')}
          crownsValue={calculateStatCost(character.charisma)}
          characterCrowns={character.crowns}
          last
        />
      </div>
    </>
  )
}

export default TrainingContent;