'use client'

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { createCharacter } from '@/lib/actions/character/create.action';
import { UserContext } from '@/app/(root)/(other)/layout';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/shared/Loading';

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);
  const [name, setName] = useState('');

  if (user?.character) {
    router.push('/game/overview');
    return <Loading />;
  }

  const handleSubmit = async () => {
    if (!selected) return toast.error('Select a gender');
    
    const payload = {
      gender: selected,
      name,
    }

    await createCharacter(payload)
      .then((response) => {
        toast.success(response);
        router.push('/game/overview');
      })
      .catch((error) => {
        toast.error(error.message);
      })
  }

  return (
    <div className='mt-16 mb-4 flex flex-col items-center gap-6 px-10'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-xl w-full font-bold border-b-[3px] border-red text-center text-red'>
          Gladiatus Clone
        </h1>
        <div className='w-full info-card mt-4'>
          <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2'>
            A new beginning
          </h2>
          <p className='text-sm px-2 py-1'>
          After a long and arduous journey, fleeing through foreign lands from a war that threatened your home, you manage to reach the domains of Balenos where an outpost halts you and attempts to ascertain your identity.
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-4 items-center w-full'>
        <h1 className='text-xl w-full font-bold border-b-[3px] border-red text-center text-red'>
          How do you wish to be known in this domains
        </h1>
        <Input
          className='bg-cream p-2 rounded-sm w-[50%] border-none'
          placeholder='Enter your name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex gap-4 flex-col w-full'>
        <h1 className='text-xl w-full font-bold border-b-[3px] border-red text-center text-red'>
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
            className='bg-red text-cream2 font-semibold hover:bg-red2 w-40'
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page