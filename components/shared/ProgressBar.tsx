const ProgressBar = ({ progress }: { progress: number }) => {

  return (
    <div>
      <div className='relative overflow-hidden w-36 h-2 bg-brown2'>
        <div style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#e6b749",
            boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.5)"
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar;