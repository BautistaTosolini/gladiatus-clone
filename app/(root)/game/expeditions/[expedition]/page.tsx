import DescriptionCard from '@/components/cards/DescriptionCard';
import { getExpeditionEnemies } from '@/lib/actions/battle/getExpeditionEnemies.action';
import { getUser } from '@/lib/actions/user/getUser.action';
import { redirect } from 'next/navigation';
import { expeditions } from '@/constants/expeditions';
import NoResults from '@/components/shared/NoResults';
import ExpeditionContent from '@/components/content/ExpeditionContent';

const Page = async ({ params }: { params: { expedition: string } }) => {
  const user = await getUser().catch(() => redirect('/'));
  const expeditionName = params.expedition;
  const enemies = await getExpeditionEnemies(expeditionName);

  if (!user.character) redirect('/onboarding');

  const expeditionInfo = expeditions[expeditionName];

  if (!enemies) return <NoResults />;

  return (
    <div className='px-4 flex flex-col gap-4'>
      <h1 className='text-xl font-bold border-b-[3px] border-brown2 text-center text-brown2'>
        {expeditionInfo.name}
      </h1>
      <ExpeditionContent
        enemies={enemies}
        expeditionName={expeditionName}
        character={user.character}
      />
      <div>
        <DescriptionCard
          title='Expedition description'
        >
          {expeditionInfo.description}
        </DescriptionCard>
      </div>
    </div>
  )
}

export default Page;