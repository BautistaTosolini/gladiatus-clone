'use client'

import { CharacterInterface } from '@/lib/interfaces/character.interface';
import CooldownTimer from './CooldownTimer';
import { EXPEDITION_COOLDOWN } from '@/constants';

const GameHeaderExpeditionTimer = ({ character }: { character: CharacterInterface }) => {
  return (
    <div className='flex flex-col w-full brown-card h-[79px] drop-shadow-2xl items-center justify-center gap-2 text-xs rounded-sm'>
      <CooldownTimer 
        name='expedition'
        message='Go to expedition'
        cooldown={EXPEDITION_COOLDOWN}
        characterLastBattle={character.expeditionLastBattle}
        redirect='expeditions/grimwood'
      />
      <div className='border-b-cream2 border-b-[3px] w-full' />
      {/* TODO: Add dungeons system */}
      <CooldownTimer 
        name='dungeon'
        message='Coming soon'
        cooldown={EXPEDITION_COOLDOWN}
      />
    </div>
  )
}

export default GameHeaderExpeditionTimer;