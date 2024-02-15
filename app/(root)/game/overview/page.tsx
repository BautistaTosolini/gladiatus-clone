import CharacterCard from '@/components/shared/CharacterCard';
import { getUser } from '@/lib/actions/user/getUser.action';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await getUser().catch(() => redirect('/'));

  if (!user) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <div className='px-10 flex flex-row justify-between gap-8'>
      <CharacterCard character={user.character} />
    </div>
  )
}

export default Page;