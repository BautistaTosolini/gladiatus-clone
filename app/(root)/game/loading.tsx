const Loading = () => {
  return (
    <div className='w-full items-center mt-60 px-8 gap-4 flex flex-col'>
      <div className='loader ease-linear rounded-full border-[6px] border-t-[6px] border-orange h-20 w-20 mb-4' />
      <h2 className='text-center text-xl font-semibold text-red3'>Loading...</h2>
    </div>
  )
}

export default Loading;