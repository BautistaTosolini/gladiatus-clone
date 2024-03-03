import { redirect } from 'next/navigation';
import ArenaContent from '@/components/arena/ArenaContent';
import { getUser } from '@/lib/actions/user/getUser.action';
import { getArenaRivals } from '@/lib/actions/battle/getArenaRivals.action';
import Image from 'next/image';
import DescriptionCard from '@/components/cards/DescriptionCard';

const Page = async () => {
  const user = await getUser().catch(() => redirect('/'));
  const arenaRivals = await getArenaRivals();
  const character = user.character;

  if (!user || !arenaRivals) return null;

  if (!user.character) redirect('/onboarding');

  return (
    <div className='px-8 gap-4 flex flex-col'>
      <div className='flex gap-4'>
        <Image 
          width={168}
          height={194}
          src={`/images/arena.jpg`}
          alt='arena'
        />
        <DescriptionCard title='Arena'>
          <p>
            You smell fear and death as soon as you enter the arena. You know very well which legends were born before you, here, from the sand - and how they became dust again.
          </p>
          <p>
            You can prove yourself as a gladiator in the arena.
          </p>
        </DescriptionCard>
      </div>
      <ArenaContent 
        character={character}
        arenaRivals={arenaRivals}
      />
    </div>
  )
}

export default Page