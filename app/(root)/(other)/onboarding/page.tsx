import { redirect } from 'next/navigation';
import { authenticateUser } from '@/lib/actions/user/authenticate.action';
import Onboarding from '@/components/forms/Onboarding';

const Page = async () => {
  const user = await authenticateUser().catch(() => redirect('/'));

  if (!user) return null;

  if (user.character) redirect('/game/overview');

  return (
    <div className='mb-4 flex flex-col items-center gap-6 px-10'>
      <Onboarding />
    </div>
  )
}

export default Page