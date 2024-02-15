import { redirect } from 'next/navigation';
import { getUser } from '@/lib/actions/user/getUser.action';
import Onboarding from '@/components/forms/Onboarding';

const Page = async () => {
  const user = await getUser().catch(() => redirect('/'));

  if (!user) return null;

  if (user.character) redirect('/game/overview');

  return (
    <div className='mb-4 flex flex-col items-center gap-6 px-10'>
      <Onboarding />
    </div>
  )
}

export default Page