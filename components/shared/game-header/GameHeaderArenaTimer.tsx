'use client'

import { CharacterInterface } from '@/lib/interfaces/character.interface';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CombatProgressBar from '@/components/shared/CombatProgressBar';
import { ARENA_COOLDOWN } from '@/constants';
import CooldownTimer from './CooldownTimer';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const GameHeaderArenaTimer = ({ character }: { character: CharacterInterface }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const arenaLastBattle = new Date(character.arenaLastBattle).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = (currentTime - arenaLastBattle) / 1000;
      const timeRemainingUntilCooldown = ARENA_COOLDOWN - timeDifference;

      if (timeRemainingUntilCooldown <= 0) {
        // If the remaining minutes have passed, clear the interval.
        clearInterval(intervalId);
      } else {
        // Update the time remaining.
        setTimeRemaining(timeRemainingUntilCooldown);
      }
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [character.arenaLastBattle]);

  let progressPercentage = Math.round(((ARENA_COOLDOWN - timeRemaining) / ARENA_COOLDOWN) * 100)

  return (
    <div className='flex flex-col w-full brown-card h-[79px] drop-shadow-2xl items-center justify-center gap-2 text-xs rounded-sm'>
        <CooldownTimer 
          name='arena'
          message='Go to arena'
          cooldown={ARENA_COOLDOWN}
          characterLastBattle={character.arenaLastBattle}
          redirect='arena'
        />
      <div className='border-b-cream2 border-b-[3px] w-full' />
        {/* TODO: Add circus system */}
        <CooldownTimer 
          name='circus'
          message='Coming soon'
          cooldown={ARENA_COOLDOWN}
        />
    </div>
  )
}

export default GameHeaderArenaTimer;