'use client'

import DescriptionCard from '@/components/cards/DescriptionCard';
import LandingNavbar from '@/components/shared/LandingNavbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <LandingNavbar />
      <div className='w-full flex justify-center min-h-screen bg-cover' style={{ backgroundImage: 'url("/images/landing-page-image.webp")' }}>
        <div className='flex flex-col items-center w-[50%] min-h-screen'>
          <div className='main-cream-card w-[97%] h-full flex flex-col items-center pt-14 px-6 gap-4'>
            <h1 className='text-3xl font-bold border-b-[3px] border-red text-center text-red w-full'>
              Gladiatus Clone
            </h1>
            <DescriptionCard title='Hero of rome'>
              <div className='flex flex-col gap-4'>
                <p>
                  <Link href='https://gladiatus.gameforge.com' className='text-red3 underline'>Gladiatus</Link> is a web browser-based MMORPG (Massively Multiplayer Online Role-Playing Game) developed by <Link href='https://gameforge.com' className='text-red3 underline'>Gameforge</Link> and released in 2009. 
                  In the game, players create and customize their own gladiator characters. They embark on adventures, fight against various enemies and creatures, acquire new skills and equipment, 
                  and progress through different levels. This project aims to clone a significant portion of the original game's functionality into a newer stack using technologies like <Link href='https://nextjs.org' className='text-red3 underline'>Next.js 14</Link> with Server Side Rendering,
                  Server Actions, <Link href='https://www.mongodb.com/' className='text-red3 underline'>MongoDB</Link> and <Link href='https://www.typescriptlang.org' className='text-red3 underline'>Typescript</Link> without any commercial purpose, only learning.
                </p>
                <p>
                  You can review the source code on my <Link href='https://github.com/BautistaTosolini/gladiatus-clone' className='text-red3 underline'>Github</Link> for free and contribute if you wish.
                </p>
              </div>
            </DescriptionCard>
            <div>
              <Button 
                onClick={() => router.push('/sign-in')}
                className='general-button font-semibold hover:brightness-110 hover:bg-brown text-brown2 w-40'
              >
                Play Now
              </Button>
            </div>
          </div>
          <div className='footer w-full h-[50px] orange-gradient' />
        </div>  
      </div>
    </main>
  );
}
