'use client'

import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Loading from '@/components/shared/Loading';
import Navbar from '@/components/shared/Navbar';
import NavigationBanner from '@/components/shared/NavigationBanner';

import { UserInterface } from '@/interfaces/user.interface';
import { authenticateUser } from '@/lib/actions/user/authenticate.action';

const inter = Inter({ subsets: ['latin'] });

export const UserContext = createContext<UserInterface | null>(null);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      await authenticateUser()
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          router.push('/');
          return <Loading />;
        })
    }

    authenticate();
  }, [])

  if (!user) return <Loading />;

  return (
    <html lang='en'>
      <body className={`${inter.className} main-container`}>
        <div className='w-full flex justify-center min-h-screen bg-cover' style={{ backgroundImage: 'url("/bg-image.jpg")' }}>
          <Toaster
            toastOptions={{
              className: '',
              style: {
                background: '#eed7a1'
              }
            }}
          />
          <UserContext.Provider
            value={user}
          >
            <Navbar />
            <div className='w-full h-min-full flex flex-row justify-center gap-6'>
              <NavigationBanner />
              <div className='flex flex-col items-center h-min-full'>
                <div className='h-min-full main-cream-card w-[620px] flex-grow'>
                  {children}
                </div>
                <div className='footer w-[640px] h-[50px] orange-gradient' />
              </div>
            </div>
          </UserContext.Provider>
        </div>
      </body>
    </html>
  )
}