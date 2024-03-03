'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';

const LandingNavbar = () => {
  const router = useRouter();

  return (
    <nav className='bg-red fixed w-full h-12 flex flex-row items-center px-14 justify-between drop-shadow-2xl border-b-[3px] border-cream2 red-nav z-[998]'>
      <Link 
        className='text-lg font-semibold text-cream2 cursor-pointer hidden sm:flex'
        href='/game/overview'
      >
        Gladiatus Clone
      </Link>
      <div className='gap-4 flex items-center'>
        <div className='flex gap-4'>
          <span className='text-cream2 hover:text-gold transition'>
            <Link href='https://github.com/BautistaTosolini/gladiatus-clone'>
              <Github />
            </Link>
          </span>
        </div>
        <Button 
          className='red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm hover:bg-red h-8 w-32'
          onClick={() => router.push('/sign-in')}
        >
          Sign In
        </Button>
        <Button 
          className='red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm hover:bg-red h-8 w-32'
          onClick={() => router.push('/sign-up')}
        >
          Sign Up
        </Button>
      </div>
    </nav>
  )
}

export default LandingNavbar;