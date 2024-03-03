import { calculatePower } from '@/lib/utils/characterUtils';
import Image from 'next/image';
import ProgressBar from '@/components/arena/ProgressBar';
import { CharacterInterface } from '@/lib/interfaces/character.interface';
import { calculateNextLevelExperience, calculateProgressPercent } from '@/lib/utils';

const GameHeaderStats = ({ character }: { character: CharacterInterface }) => {
  const levelProgress = calculateProgressPercent(character.experience, calculateNextLevelExperience(character.level));

  return (
    <div className='flex flex-col gap-[2px] brown-card w-full h-[79px] drop-shadow-2xl items-center justify-center rounded-sm'>
      <div className='flex flex-row w-full font-semibold text-sm text-red3 px-1 pl-2'>
        <div className='flex items-center gap-1 w-28'>
          <Image 
            src={'/images/crowns.png'}
            width={13}
            height={13}
            alt='crowns'
          />
          <span>
            {character.crowns}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Image 
            src={'/images/power-rank.png'}
            width={13}
            height={13}
            alt='power rank'
          />
          <span>
            {calculatePower(character)}
          </span>
        </div>
      </div>
      <div className='border-b-cream2 border-b-[3px] w-full' />
      <div className='flex flex-row w-full font-semibold text-sm text-red3 px-1 pl-2'>
        <div className='flex items-center gap-1 w-28'>
          <Image 
            src={'/images/honor.png'}
            width={13}
            height={13}
            alt='honor'
          />
          <span>
            {character.honor}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Image 
            src={'/images/level.png'}
            width={13}
            height={13}
            alt='level'
          />
          <span>
            {character.level}
          </span>
        </div>
      </div>
      <div className='border-b-cream2 border-b-[3px] w-full' />
      <div className='flex flex-row gap-1 items-center justify-center w-full font-semibold text-sm text-red3'>
        <ProgressBar progress={levelProgress} />
        <span className='text-xs'>
          {Math.round(levelProgress)}%
        </span>
      </div>
    </div>
  )
}

export default GameHeaderStats;