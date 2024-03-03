import Image from "next/image";

const EquipmentSlots = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='head slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='necklace slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='chest slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='gloves slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='legs slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='boots slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='main hand slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='off hand slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='right ring slot'
        />
      </div>

      <div>
        <Image 
          className='rounded-sm'
          src={'/items/empty.jpg'}
          width={41}
          height={41}
          alt='left ring slot'
        />
      </div>
    </div>
  ) 
}

export default EquipmentSlots;