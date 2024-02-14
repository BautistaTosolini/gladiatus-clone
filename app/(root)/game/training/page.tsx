import Image from 'next/image';
import TrainStat from '@/components/shared/TrainStat';
import DescriptionCard from '@/components/shared/DescriptionCard';
import { stats } from '@/constants';
import { authenticateUser } from '@/lib/actions/user/authenticate.action';
import { redirect } from 'next/navigation';
import TrainingContent from '@/components/shared/TrainingContent';
import { UserInterface } from '@/lib/interfaces/user.interface';

const Page = async () => {
  const user = await authenticateUser().catch(() => redirect('/')) as UserInterface;
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