import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Navbar from '@/components/shared/Navbar';
import NavigationBanner from '@/components/shared/NavigationBanner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} main-container`}>
        <div className='w-full flex justify-center min-h-screen bg-fixed bg-cover bg-center' style={{ backgroundImage: 'url("/images/game-image.jpg")' }}>
          <Toaster
            toastOptions={{
              className: '',
              style: {
                background: '#eed7a1'
              }
            }}
          />
            <Navbar />
            <div className='w-full h-min-full flex flex-row justify-center gap-6'>
            <NavigationBanner />
            <div className='flex flex-col items-center h-min-full'>
              <div className='h-min-full main-cream-card w-[620px] flex-grow'>
                <div className='mt-16'>
                  {children}
                </div>
              </div>
              <div className='footer w-[640px] h-[50px] orange-gradient' />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}