'use client'

import { trainCharacter } from '@/lib/actions/character/train.action';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface TrainStatProps {
  statName: string;
  statValue: number;
  last?: boolean;
  characterCrowns: number;
  handleClick: () => void;
}

const calculateCrowns = (stat: number) => Math.pow(stat, 2) + stat + 1;

const TrainStat = ({ statName, statValue, characterCrowns, handleClick, last = false }: TrainStatProps) => {
  const crownsValue = calculateCrowns(statValue)
  const canTrain = characterCrowns > crownsValue;

  return (
    <div className={`flex justify-between px-2 py-1 items-center text-brown2 ${!last && 'border-b-[3px] border-cream2'}`}>
      <div className='flex justify-between w-32'>
        {statName}: <span className='font-semibold text-red3'>{statValue}</span>
      </div>
      <div className='flex justify-between text-sm font-semibold items-center'>
        <div className='flex items-center gap-1'>
          {crownsValue}
          <Image 
            src={'/images/crowns.png'}
            width={12}
            height={12}
            alt='crowns'
          />
        </div>
        <div 
          className={`${canTrain ? 'cursor-pointer hover:brightness-110' : ''} ml-2`}
          onClick={canTrain ? handleClick : () => {}}
        >
          <Image
            src={`${canTrain ? '/images/train-stat.jpg' : '/images/train-stat-bw.jpg'}`}
            width={25}
            height={25}
            alt='train'
            className='shadow-sm'
          />
        </div>
      </div>
    </div>
  )
};

export default TrainStat;