'use client';

import { EnemyStatsInterface } from '@/lib/interfaces/enemy.interface'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import Image from 'next/image'
import { Button } from '../ui/button'
import toast from 'react-hot-toast';
import { battleEnemy } from '@/lib/actions/battle/battleEnemy.action';
import { useRouter } from 'next/navigation';

interface EnemyCardProps {
  enemy: EnemyStatsInterface;
  expedition: string;
}

const EnemyCard = ({ enemy, expedition }: EnemyCardProps) => {
  const router = useRouter();
  
  const handleClick = async () => {
    const response = await battleEnemy({ enemyName: enemy.image, expeditionName: expedition });

    if (response && response.error) return toast.error(response.error.message);

    router.push(`/game/battle/${response}`);
  }

  return (
      <div className='w-38 flex flex-col items-center gap-2 drop-shadow-lg z-[998]'>
        <h2 className='red-card text-center font-semibold text-cream2 w-full'>
          {enemy.name}
        </h2>
        <div>
          <HoverCard closeDelay={0}>
            <HoverCardTrigger asChild>
              <Image 
                src={`/enemies/${expedition}/${enemy.image}.jpg`}
                width={135}
                height={156}
                alt={enemy.image}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className='red-card flex flex-col min-w-[130px] px-2 text-cream2 text-xs'>

                <span className='font-semibold text-sm'>
                  {enemy.name}
                </span>

                <span className='flex justify-between'>
                  Level:
                  <span>
                    {enemy.level ? `${enemy.level[0]} - ${enemy.level[enemy.level.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Experience:
                  <span>
                    {enemy.experience ? `${enemy.experience[0]} - ${enemy.experience[enemy.experience.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Crowns:
                  <span>
                    {enemy.crowns ? `${enemy.crowns[0]} - ${enemy.crowns[enemy.crowns.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Strength:
                  <span>
                    {enemy.strength ? `${enemy.strength[0]} - ${enemy.strength[enemy.strength.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Endurance:
                  <span>
                    {enemy.endurance ? `${enemy.endurance[0]} - ${enemy.endurance[enemy.endurance.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Dexterity:
                  <span>
                    {enemy.dexterity ? `${enemy.dexterity[0]} - ${enemy.dexterity[enemy.dexterity.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Agility:
                  <span>
                    {enemy.agility ? `${enemy.agility[0]} - ${enemy.agility[enemy.agility.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Intelligence:
                  <span>
                    {enemy.intelligence ? `${enemy.intelligence[0]} - ${enemy.intelligence[enemy.intelligence.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Charisma:
                  <span>
                    {enemy.charisma ? `${enemy.charisma[0]} - ${enemy.charisma[enemy.charisma.length - 1]}` : '?'}
                  </span>
                </span>

              </div>  
            </HoverCardContent>
          </HoverCard>
        </div>
        <Button
          className='general-button w-full h-7 font-semibold hover:brightness-110 hover:bg-brown text-brown2'
          onClick={handleClick}
        >
          Fight
        </Button>
      </div>
  )
}

export default EnemyCard