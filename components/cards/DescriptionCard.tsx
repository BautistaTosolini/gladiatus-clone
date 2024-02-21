import React from 'react'

interface DescriptionCardProps {
  children: React.ReactNode;
  title: string;
  rounded?: boolean;
}

const DescriptionCard = ({ children, title, rounded = false }: DescriptionCardProps) => {
  return (
    <div className={`w-full info-card my-1 text-brown2 ${rounded && 'rounded-lg'}`}>
      <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2'>
        {title}
      </h2>
      <div className='px-2 py-1 text-sm flex flex-col gap-2'>
        {children}
      </div>
    </div>
  )
}

export default DescriptionCard;