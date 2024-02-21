'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CooldownTimerProps {
  name: string;
  message: string;
  cooldown: number;
  characterLastBattle?: Date;
  redirect?: string;
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const CooldownTimer = ({ name, message, cooldown, characterLastBattle, redirect }: CooldownTimerProps) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  if (characterLastBattle) {
    useEffect(() => {
      const intervalId = setInterval(() => {
        const expeditionLastBattleTime = new Date(characterLastBattle).getTime();
        const currentTime = new Date().getTime();
  
        const timeDifference = (currentTime - expeditionLastBattleTime);
        const timeRemainingUntilCooldown = Math.ceil((cooldown - timeDifference / 1000));
  
        if (timeRemainingUntilCooldown <= 0) {
          // If the remaining minutes have passed, clear the interval.
          setTimeRemaining(timeRemainingUntilCooldown);
          clearInterval(intervalId);
        } else {
          // Update the time remaining.
          setTimeRemaining(timeRemainingUntilCooldown);
        }
      }, 1000);
  
      // Cleanup function to clear the interval when component unmounts
      return () => clearInterval(intervalId);
    }, [characterLastBattle]);
  }

  let progressPercentage = Math.round(((cooldown - timeRemaining) / cooldown) * 100)

  if (timeRemaining <= 0) progressPercentage = 100;

  console.log(name, redirect)

  return (
    <div className='flex flex-row gap-1 font-semibold text-red3 items-center justify-between w-full px-2'>
      <Image 
        src={`/images/${name}.png`}
        width={19}
        height={19}
        alt={name}
      />
      {/* Sometimes the percentage calculation gives 98 or 99 if the cooldown its too short, this will avoid the progress bar being incompleted when the timer is done. */}
      <div 
        className={`progressbar bg-brown2 ${progressPercentage >= 100 && redirect && 'cursor-pointer hover:brightness-110'}`}
        onClick={progressPercentage >= 100 && redirect ? () => router.push(`/game/${redirect}`) : () => {}}
      >
        <div style={{
            height: "100%",
            width: `${progressPercentage}%`,
            backgroundColor: "#003805",
            boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.5)"
          }}
        />
        <span className={`progress-percent text-gold font-semibold ${progressPercentage >= 100 && 'w-full pl-2'}`}>
          {progressPercentage >= 100 ? message : formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  )
}

export default CooldownTimer;