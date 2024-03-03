'use client'

import { CharacterInterface } from '@/lib/interfaces/character.interface';
import CharacterCard from '@/components/cards/CharacterCard';
import EquipmentSlots from '@/components/overview/EquipmentSlots';
import Inventory from '@/components/overview/Inventory';

interface OverviewContentProps {
  character: CharacterInterface;
}

const OverviewContent = ({ character }: OverviewContentProps) => {
  return (
      <div className='px-6 w-full flex justify-between'>
        <div className='flex flex-row gap-4'>
          <CharacterCard character={character} />
        </div>

        <div className='justify-center'>
          <Inventory characterInventory={character.inventory} />
        </div>
      </div>
  )
}

export default OverviewContent;