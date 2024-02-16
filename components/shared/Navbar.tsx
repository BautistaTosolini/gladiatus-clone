'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { logOutUser } from '@/lib/actions/user/logOut.action';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const logOut = async () => {
    await logOutUser();
  }

  return (
    <nav className='bg-red fixed w-full h-12 flex flex-row items-center px-14 justify-between drop-shadow-2xl border-b-[3px] border-cream2 red-nav z-[998]'>
      <Link 
        className='text-lg font-semibold text-cream2 cursor-pointer hidden sm:flex'
        href='/game/overview'
      >
        Gladiatus Clone
      </Link>
      {pathname !== '/onboarding' &&
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm hover:bg-red h-8 w-40'>
              My Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 red-card'>
            <DropdownMenuLabel className='text-cream2'>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-cream2' />
            <DropdownMenuGroup>
              <DropdownMenuItem className='hover:bg-red2 cursor-pointer'>
                <User className='mr-2 h-4 w-4 text-cream2' />
                <span className='text-cream2'>
                  Profile
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className='hover:bg-red2 cursor-pointer'>
                <Settings className='mr-2 h-4 w-4 text-cream2' />
                <span className='text-cream2'>
                  Settings
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className='bg-cream2' />
            <DropdownMenuItem 
              className='hover:bg-red2 cursor-pointer'
              onClick={logOut}
            >
              <LogOut className='mr-2 h-4 w-4 text-cream2' />
              <span className='text-cream2'>
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </nav>
  )
}

export default Navbar