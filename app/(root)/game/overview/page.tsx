import CharacterCard from '@/components/shared/CharacterCard';
import { authenticateUser } from '@/lib/actions/user/authenticate.action';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await authenticateUser().catch(() => redirect('/'));

  if (!user) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <div className='px-10 flex flex-row justify-between gap-8'>
      <CharacterCard character={user.character} />
    </div>
  )
}

export default Page;