import { getUser } from '@/lib/actions/user/getUser.action';
import { redirect } from 'next/navigation';
import TrainingContent from '@/components/content/TrainingContent';
import { UserInterface } from '@/lib/interfaces/user.interface';

const Page = async () => {
  const user = await getUser().catch(() => redirect('/')) as UserInterface;
  const character = user.character;

  if (!user) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <div className='px-8 gap-4 flex flex-col'>
      <TrainingContent character={character} />
    </div>
  )
}

export default Page