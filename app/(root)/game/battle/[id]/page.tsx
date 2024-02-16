import formatDateTime from '@/lib/utils/formatDateTime';
import Image from 'next/image';
import { calculatePower } from '@/lib/utils/characterUtils';
import { BattleReport } from '@/lib/interfaces/battleReport.interface';
import DescriptionCard from '@/components/shared/DescriptionCard';
import FighterCard from '@/components/shared/FighterCard';
import { getBattleReport } from '@/lib/actions/battle/getBattleReport.action';
import { getUser } from '@/lib/actions/user/getUser.action';
import { redirect } from 'next/navigation';
import NoResults from '@/components/shared/NoResults';

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUser().catch(() => redirect('/'));
  const battleReportId = params.id;
  const battleReport = await getBattleReport(battleReportId) as BattleReport;

  const defender = battleReport?.defender;
  const attacker = battleReport?.attacker;
  
  if (!user) return null;

  if (!user.character) redirect('/onboarding');

  const currentCharacter = user.character;

  if (!battleReport || !attacker || !defender) return <NoResults />;

  // If the defender has "id" property (not "_id") it means is an npc enemy, if it doesn't, then its an another player character.
  const isEnemy = 'id' in battleReport.defender
  const battleDate = new Date(battleReport!.createdAt);

  let resultTitle = '';
  let resultCard = '';

  if (battleReport.result.winner === 'Draw') {
    resultTitle = 'Draw';
    resultCard = 'brown-card';
  }
  else if (battleReport.result.winner === attacker._id) {
    resultTitle = `Winner: ${attacker.name}`;

    if (attacker._id === currentCharacter._id) resultCard = 'green-card';
    else if (defender._id === currentCharacter._id) resultCard = 'red-card';
    else resultCard = 'brown-card';
  }
  else {
    resultTitle = `Winner: ${defender.name}`;

    if (defender._id === currentCharacter._id) resultCard = 'green-card';
    else if (attacker._id === currentCharacter._id) resultCard = 'red-card';
    else resultCard = 'brown-card';
  }

  if (battleReport.result.winner === currentCharacter._id) resultCard = 'green-card';

  return (
    <div className='flex flex-col mb-4 px-4 gap-4'>
      <div className='w-full'>
        <div className={`w-full text-lg flex items-center justify-center h-12 font-semibold text-cream2 ${resultCard}`}>
          {resultTitle}
        </div>
      </div>

      {isEnemy ? 
        <DescriptionCard
        title='Rewards'
        >
          <p className='text-sm px-2 py-1 flex items-center gap-1'>
            <span className='font-semibold'>{attacker.name}</span> earned {battleReport.result.crownsDrop} 
            <Image 
              src={'/images/crowns.png'}
              width={12}
              height={12}
              alt='crowns'
            />
          </p>
          <p className='text-sm px-2 py-1'>
            <span className='font-semibold'>{attacker.name}</span> has received {battleReport.result.experienceDrop} experience.
          </p>
        </DescriptionCard>
      :
        <DescriptionCard
          title='Rewards'
        >
          {battleReport.result.winner === attacker.name ?
          <>
            <p className='text-sm px-2 py-1 flex items-center gap-1'>
              <span className='font-semibold'>{attacker.name}</span> earned {battleReport.result.honorEarned} honor. 
            </p>
            <p className='text-sm px-2 py-1'>
              <span className='font-semibold'>{defender.name}</span> has lost {battleReport.result.honorLost * -1} honor.
            </p>
          </>
          :
          <>
            <p className='text-sm px-2 py-1 flex items-center gap-1'>
              <span className='font-semibold'>{defender.name}</span> earned {battleReport.result.honorEarned} honor. 
            </p>
            <p className='text-sm px-2 py-1'>
              <span className='font-semibold'>{attacker.name}</span> has lost {battleReport.result.honorLost * -1} honor.
            </p>
          </>
          }
        </DescriptionCard>
      }

      <div className='flex flex-row justify-between items-center w-full px-8'>
        <FighterCard
          image={attacker.gender} 
          level={attacker.level}
          name={attacker.name}
          strength={attacker.strength}
          endurance={attacker.endurance}
          agility={attacker.agility}
          dexterity={attacker.dexterity}
          intelligence={attacker.intelligence}
          charisma={attacker.charisma}
          power={calculatePower(attacker)}
        />

        <div className='text-lg text-red3 font-bold items-center flex flex-col'>
          <Image 
            src={`/images/fight.png`}
            width={55}
            height={22}
            alt='fight'
          />
          Vs
        </div>

        <FighterCard
          image={isEnemy ? defender.image : defender.gender} 
          level={defender.level}
          name={defender.name}
          strength={defender.strength}
          endurance={defender.endurance}
          agility={defender.agility}
          dexterity={defender.dexterity}
          intelligence={defender.intelligence}
          charisma={defender.charisma}
          power={defender.power}
          expedition={battleReport.expedition}
          isEnemy={isEnemy}
        />
      </div>

      <DescriptionCard
        title={`Statistics - ${formatDateTime(battleDate)}`}
      >
        <div className='px-4 w-full flex justify-between'>
          <div className='flex flex-col justify-center text-sm'>
            <span className='font-semibold'>Name:</span>
            <span>{attacker.name}</span>
            <span>{defender.name}</span>
          </div>
          <div className='flex flex-col items-center justify-center text-sm'>
            <span className='font-semibold'>Damage Points:</span>
            <span>{battleReport.result.attackerTotalDamage}</span>
            <span>{battleReport.result.defenderTotalDamage}</span>
          </div>
          <div className='flex flex-col items-center justify-center text-sm'>
            <span className='font-semibold'>Health Points:</span>
            <span>{battleReport.result.attackerHealth}</span>
            <span>{battleReport.result.defenderHealth}</span>
          </div>
        </div>
      </DescriptionCard>

      <div className='w-full info-card'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2 text-brown2'>
          Battle Report
        </h2>
        {battleReport.rounds.map((round, roundIndex) => (
          <div key={`${round.attackerHP} - ${round.defenderHP} - ${roundIndex}`}>
            <h3 className='text-sm font-semibold border-b-[3px] border-cream2 bg-[#f3d48c] px-2 text-center text-brown2'>
              Round {roundIndex + 1}
            </h3>
            {round.events.map((event, eventIndex) => (
              <p
                key={`${roundIndex}-${eventIndex}`}
                className={`${eventIndex === 1 || eventIndex === 3 ? 'bg-cream' : 'bg-[#dbc389]'} text-sm p-2 text-brown2`}
              >
                {event}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page;