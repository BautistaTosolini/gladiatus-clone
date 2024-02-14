import Image from 'next/image';
import DescriptionCard from '@/components/shared/DescriptionCard';

const ArenaHeader = () => {
  return (
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
  )
}

export default ArenaHeader;