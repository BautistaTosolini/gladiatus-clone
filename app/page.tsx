import LandingNavbar from '@/components/shared/LandingNavbar';

export default function Home() {
  return (
    <main>
      <LandingNavbar />
      <div className='w-full flex justify-center items-center min-h-screen bg-cover' style={{ backgroundImage: 'url("/images/landing-page-image.webp")' }}>
        
      </div>
    </main>
  );
}
