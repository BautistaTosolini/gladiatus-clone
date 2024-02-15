'use client'

import DescriptionCard from '@/components/shared/DescriptionCard';
import { battleArena } from '@/lib/actions/battle/battleArena.action';
import { CharacterInterface } from '@/lib/interfaces/character.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ArenaContentProps {
  arenaRivals: {
    name: string;
    _id: string;
    honor: number;
    rank: number;
  }[],
  character: CharacterInterface;
}

const ArenaContent = ({ arenaRivals, character }: ArenaContentProps) => {
  const router = useRouter();

  const handleClick = async (rivalId: string) => {
    const response = await battleArena(rivalId);

    if (response!.error) return toast.error(response.error.message);

    router.push(`/game/battle/${response}`);
  }

  return (
    <>
      <h1 className='text-xl font-bold border-b-[3px] border-brown2 text-center text-brown2'>
        League of Balenos
      </h1>
      <div className='flex gap-4'>
        <DescriptionCard title='Arena Ranking'>
          <div className='flex flex-col w-full justify-between'>
            <div className='flex w-full gap-2 font-semibold'>
              <div className='min-w-[50px]'>
                Rank
              </div>
              <div className='min-w-[50px]'>
                Honor
              </div>
              <div className='w-[200px]'>
                Name
              </div>
            </div>
            {arenaRivals.map((rival) => (
              <div 
                className='flex flex-col w-full justify-between'
                key={rival._id}
              >
                <div className='flex w-full gap-2'>
                <div className='min-w-[50px] font-semibold'>
                    {rival.rank}
                  </div>
                  <div className='min-w-[50px] font-semibold'>
                    {rival.honor}
                  </div>
                  <div
                    className={`w-[130px] ${rival._id !== character._id && 'font-semibold underline cursor-pointer'}`}
                    onClick={rival._id !== character._id ? () => router.push(`/character/${rival._id}`) : () => {}}
                  >
                    {rival.name}
                  </div>
                  {rival._id !== character._id &&
                    <div className='cursor-pointer'>
                      <Image 
                        src={`/images/fight.png`}
                        width={55}
                        height={22}
                        alt='fight'
                        key={`${rival._id}-${rival.name}`}
                        onClick={() => handleClick(rival._id)}
                      />
                    </div> 
                  }
                </div>
              </div>
            ))}
          </div>
        </DescriptionCard>
      </div>
    </>
  )
}

export default ArenaContent;