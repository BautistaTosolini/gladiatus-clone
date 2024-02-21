import { UserInterface } from '@/lib/interfaces/user.interface';
import GameHeaderStats from '@/components/shared/game-header/GameHeaderStats';
import GameHeaderExpeditionTimer from '@/components/shared/game-header/GameHeaderExpeditionTimer';
import GameHeaderArenaTimer from '@/components/shared/game-header/GameHeaderArenaTimer';

const GameHeader = ({ user }: { user: UserInterface }) => {
  const character = user.character;

  if (!user.character) return null;

  return (
    <div className='w-full h-[145px] orange-card drop-shadow-2xl py-[53px] px-4 flex flex-row gap-4'>
      <GameHeaderStats character={character} />

      <GameHeaderExpeditionTimer character={character} />

      <GameHeaderArenaTimer character={character} />
    </div>
  ) 
}

export default GameHeader;