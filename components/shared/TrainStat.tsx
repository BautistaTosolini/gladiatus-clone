import Image from 'next/image';

interface TrainStatProps {
  statName: string;
  statValue: number;
  crowns: number;
  handleClick: () => void;
  last?: boolean;
  characterCrowns: number,
}

const TrainStat = ({ statName, statValue, crowns, handleClick, characterCrowns, last = false }: TrainStatProps) => {
  const canTrain = characterCrowns > crowns;

  return (
    <div className={`flex justify-between px-2 py-1 items-center text-brown2 ${!last && 'border-b-[3px] border-cream2'}`}>
      <div className='flex justify-between w-32'>
        {statName}: <span className='font-semibold text-red3'>{statValue}</span>
      </div>
      <div className='flex justify-between text-sm font-semibold items-center'>
        <div className='flex items-center gap-1'>
          {crowns}
          <Image 
            src={'/images/crowns.png'}
            width={12}
            height={12}
            alt='crowns'
          />
        </div>
        <div 
          className={`${canTrain ? 'cursor-pointer hover:brightness-110' : ''} ml-2`}
          onClick={!canTrain ? () => {} : handleClick}
        >
          <Image
            src={`${canTrain ? '/images/train-stat.jpg' : '/images/train-stat-bw.jpg'}`}
            width={25}
            height={25}
            alt='train'
          />
        </div>
      </div>
    </div>
  )
};

export default TrainStat;