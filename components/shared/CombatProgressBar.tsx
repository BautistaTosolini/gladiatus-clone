'use client';

interface CombatProgressBarProps {
  progress: number;
  message: string;
  redirect?: string;
}

const CombatProgressBar = ({ progress, message }: { progress: number, message: string }) => {
  return (
    <div>
      <div className='relative overflow-hidden w-[95px] h-[14px] bg-brown2'>
        <div style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#003805",
            boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.5)"
          }}
          className={`items-center justify-center flex font-semibold ${progress === 100 && 'cursor-pointer'}`}
        >
          <span className='text-[10px] flex items-center jsutify-center text-gold'>
            {progress === 100 && message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CombatProgressBar;