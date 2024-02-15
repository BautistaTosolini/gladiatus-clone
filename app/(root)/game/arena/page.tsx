import { redirect } from 'next/navigation';
import ArenaHeader from '@/components/shared/ArenaHeader';
import ArenaContent from '@/components/shared/ArenaContent';
import { getUser } from '@/lib/actions/user/getUser.action';
import { getArenaRivals } from '@/lib/actions/battle/getArenaRivals.action';

const Page = async () => {
  const user = await getUser().catch(() => redirect('/'));
  const arenaRivals = await getArenaRivals();
  const character = user.character;

  if (!user || !arenaRivals) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <div className='px-8 gap-4 flex flex-col'>
      <ArenaHeader />
      <ArenaContent 
        character={character}
        arenaRivals={arenaRivals}
      />
    </div>
  )
}

export default Page