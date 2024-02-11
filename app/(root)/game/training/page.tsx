'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/(root)/game/layout';
import toast from 'react-hot-toast';
import { trainCharacter } from '@/lib/actions/character/train.action';

import TrainStat from '@/components/shared/TrainStat';
import DescriptionCard from '@/components/shared/DescriptionCard';
import { stats } from '@/constants';
import Loading from '@/components/shared/Loading';

const calculateCrowns = (stat: number) => Math.pow(stat, 2) + stat + 1;

const Page = () => {
  const user = useContext(UserContext);

  const [character, setCharacter] = useState(user?.character);

  const handleClick = (stat: string) => {
    trainCharacter(stat)
      .then((updatedCharacter) => {
        setCharacter(updatedCharacter);
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  if (!character) return <Loading />;

  return (
    <div className='w-full mt-16 px-8 gap-4 flex flex-col'>
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
          <p className='flex items-center gap-1'>
            Your balance: {character.crowns} 
            <Image 
              src={'/images/crowns.png'}
              width={12}
              height={12}
              alt='crowns'
            />
          </p>
        </DescriptionCard>
      </div>
      <div className='brown-card flex flex-col text-sm rounded-sm'>
        {stats.map((stat, index) => (
          <TrainStat 
            statName={stat.name}
            statValue={character[stat.value]}
            crowns={calculateCrowns(character[stat.value])}
            handleClick={() => handleClick(stat.value)}
            characterCrowns={character.crowns}
            last={index === stats.length - 1 ? true : false}
          />
        ))}
      </div>
    </div>
  )
}

export default Page