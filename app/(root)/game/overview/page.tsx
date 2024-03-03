import OverviewContent from '@/components/content/OverviewContent';
import { getUser } from '@/lib/actions/user/getUser.action';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await getUser(true).catch(() => redirect('/'));

  if (!user) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <OverviewContent
      character={user.character}
    />
  )
}

export default Page;