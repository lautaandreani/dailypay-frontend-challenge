function SkeletonNominee() {
  return (
    <>
      <h1 className='text-3xl font-bold uppercase text-center mt-4'>Awards 2021</h1>

      {Array.from({ length: 10 }).map((index, key) => (
        <div className='w-3/5 mx-auto' key={key}>
          <h4 className='block my-4 w-full bg-slate-800 rounded-md p-2 h-16 animate-pulse'>
            <span className='block bg-slate-700 w-1/4 h-6 rounded-md mt-3 animate-pulse'></span>
          </h4>
          <div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4'>
            {Array.from({ length: 4 }).map((index, key) => (
              <div className='block h-[30rem] bg-slate-800 rounded-md animate-pulse' key={key + 1}></div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default SkeletonNominee
