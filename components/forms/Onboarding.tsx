'use client'

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createCharacter } from '@/lib/actions/character/create.action';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import DescriptionCard from '@/components/shared/DescriptionCard';

const Onboarding = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!selected) return toast.error('Select a gender');
    
    const payload = {
      gender: selected,
      name,
    }

    await createCharacter(payload)
      .then(() => {
        router.push('/game/overview');
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-xl w-full font-bold border-b-[3px] border-red text-center text-red'>
          Gladiatus Clone
        </h1>
        <DescriptionCard title='A new beginning'>
          <p>
          After a long and arduous journey, fleeing through foreign lands from a war that threatened your home, you manage to reach the domains of Balenos where an outpost halts you and attempts to ascertain your identity.
          </p>
        </DescriptionCard>
      </div>
      <div className='flex flex-col gap-4 items-center w-full'>
        <h1 className='text-xl w-full font-bold border-b-[3px] border-brown2 text-center text-brown2'>
          How do you wish to be known in this domains?
        </h1>
        <Input
          className='bg-cream p-2 rounded-sm w-[50%] border-none'
          placeholder='Enter your name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex gap-4 flex-col w-full'>
        <h1 className='text-xl w-full font-bold border-b-[3px] border-brown2 text-center text-brown2'>
          Choose your gender
        </h1>
        <div className='flex flex-row gap-4 justify-center'>
          <div>
            <Image 
              src={'/characters/male/character-lvl0.jpg'}
              width={168}
              height={194}
              alt='male character'
              className={`${selected === 'female' && 'filter contrast-75 opacity-50'} cursor-pointer`}
              onClick={() => setSelected('male')}
            />
          </div>
          <div>
            <Image 
              src={'/characters/female/character-lvl0.jpg'}
              width={168}
              height={194}
              alt='female character'
              className={`${selected === 'male' && 'filter contrast-75 opacity-50'} cursor-pointer`}
              onClick={() => setSelected('female')}
            />
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <Button
            className='general-button w-36 font-semibold hover:brightness-110 hover:bg-brown text-brown2'
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default Onboarding;