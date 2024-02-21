import Image from 'next/image';
import { CharacterInterface } from '@/lib/interfaces/character.interface';
import { stats } from '@/constants';
import { calculatePower } from '@/lib/utils/characterUtils';
import { calculateNextLevelExperience } from '@/lib/utils';

function roundDownToNearestMultipleOf10(level: number): number {
  if (level > 80) return 80;

  const nearestMultipleOf10 = Math.floor(level / 10) * 10;
  return nearestMultipleOf10;
}

const CharacterCard = ({ character }: { character: CharacterInterface }) => {
  const nextLevelExperience = calculateNextLevelExperience(character.level);

  return (
    <div className='flex flex-col w-[168px] min-w-[168px] gap-3 items-center'>
      <h2 className='font-semibold text-md red-card flex justify-center items-center text-cream2 h-10 px-4 w-full drop-shadow-xl truncate'>
        {character.name}
      </h2>
      <Image 
        className='drop-shadow-xl'
        src={`/characters/${character.gender}/character-lvl${roundDownToNearestMultipleOf10(character.level)}.jpg`}
        width={168}
        height={194}
        alt='character'
      />
      <div className='brown-card w-full drop-shadow-xl rounded-sm text-brown2'>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Crowns:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {character.crowns}
              <Image 
                src={'/images/crowns.png'}
                width={12}
                height={12}
                alt='crowns'
              />
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Level:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {character.level}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Experience:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {character.experience} / {nextLevelExperience}
            </span>
          </div>
        </div>

        {stats.map((stat, index) => (
          <div 
            className='px-2 border-b-[2px] border-cream2'
            key={index}
          >
            <div className='flex justify-between text-sm'>
              {stat.name}:
              <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
                {character[stat.id]}
              </span>
            </div>
          </div>
        ))}

        <div className='border-cream2 px-2'>
          <div className='flex justify-between text-sm'>
            Power Rank:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {calculatePower(character)}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CharacterCard;
