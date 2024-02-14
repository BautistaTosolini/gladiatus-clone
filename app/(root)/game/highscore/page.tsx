import HighscoreContent from '@/components/shared/HighscoreContent'
import { getArenaHighscore } from '@/lib/actions/character/getArenaHighscore'
import { authenticateUser } from '@/lib/actions/user/authenticate.action'
import { redirect } from 'next/navigation'

const Page = async () => {
  const user = await authenticateUser().catch(() => redirect('/'));
  const arenaHighscore = await getArenaHighscore();

  if (!user || !arenaHighscore) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <div className='px-8 flex flex-col gap-4'>
      <HighscoreContent arenaHighscore={arenaHighscore} />
    </div>
  )
}

export default Page;