'use client'

import { useContext } from 'react';

import { UserContext } from '@/app/(root)/game/layout';
import CharacterCard from '@/components/shared/CharacterCard';

const Page = () => {
  const user = useContext(UserContext);
  const character = user?.character;

  return (
    <div className='w-full mt-16 mb-4 px-10 flex flex-row justify-between gap-8'>
      <CharacterCard character={character!} />
    </div>
  )
}

export default Page