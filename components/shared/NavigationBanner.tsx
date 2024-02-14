'use client'

import { expeditionRoutes, generalRoutes, villageRoutes } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationBanner = () => {
  const pathname = usePathname();

  const isOnboarding = pathname === '/onboarding';

  return (
    <div className={`min-h-full w-[200px] main-red-card pt-14 flex flex-col gap-2 px-1 ${isOnboarding && 'hidden'}`}>
      <h2 className='border-b-cream2 border-b-[3px] text-center font-semibold text-cream2 text-lg'>
        General
      </h2>
      {generalRoutes.map((route) => {
        const isActive = (pathname.includes(route.link) && route.link.length > 1) || (pathname === route.link);

        return (
          <Link 
            className={`red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm ${isActive && 'nav-banner-active'}`}
            key={route.name}
            href={`/game${route.link}`}
          >
            {route.name}
          </Link>
        )
      })}

      <h2 className='border-b-cream2 border-b-[3px] text-center font-semibold text-cream2 text-lg'>
        Village
      </h2>
      {villageRoutes.map((route) => {
        const isActive = (pathname.includes(route.link) && route.link.length > 1) || (pathname === route.link);

        return (
          <Link 
            className={`red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm ${isActive && 'nav-banner-active'}`}
            key={route.name}
            href={`/game${route.link}`}
          >
            {route.name}
          </Link>
        )
      })}

      <h2 className='border-b-cream2 border-b-[3px] text-center font-semibold text-cream2 text-lg'>
        Expeditions
      </h2>
      {expeditionRoutes.map((route) => {
        const isActive = (pathname.includes(route.link) && route.link.length > 1) || (pathname === route.link);

        return (
          <Link 
            className={`red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm ${isActive && 'nav-banner-active'}`}
            key={route.name}
            href={`/game/expeditions${route.link}`}
          >
            {route.name}
          </Link>
        )
      })}
    </div>
  )
}

export default NavigationBanner;