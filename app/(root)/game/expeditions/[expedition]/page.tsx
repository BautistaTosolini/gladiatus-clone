import EnemyCard from '@/components/shared/EnemyCard';
import DescriptionCard from '@/components/shared/DescriptionCard';
import { getEnemies } from '@/lib/actions/battle/getEnemies.action';
import { authenticateUser } from '@/lib/actions/user/authenticate.action';
import { redirect } from 'next/navigation';
import { zones } from '@/constants/zones';
import NoResults from '@/components/shared/NoResults';

const Page = async ({ params }: { params: { expedition: string } }) => {
  const user = await authenticateUser().catch(() => redirect('/'));
  const zoneName = params.expedition;
  const enemies = await getEnemies(zoneName);

  if (!user.character) redirect('/onboarding');

  const zoneInfo = zones[zoneName];

  if (!enemies) return <NoResults />;

  return (
    <div className='px-4 flex flex-col gap-4'>
      <h1 className='text-xl font-bold border-b-[3px] border-brown2 text-center text-brown2'>
        {zoneInfo.name}
      </h1>
      <div className='flex flex-row gap-4'>
        {enemies.map((enemy) => (
          <EnemyCard
            key={enemy.id}
            enemy={enemy}
            zone={zoneName}
          />
          ))}
      </div>
      <div>
        <DescriptionCard
          title='Zone description'
        >
          {zoneInfo.description}
        </DescriptionCard>
      </div>
    </div>
  )
}

export default Page;