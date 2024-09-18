import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
      <div className='flex gap-5 text-6xl font-semibold sm:text-3xl '></div>
      <h1 className='text-secondry K text-3xl'>K</h1>
      <h1 className='text-white A text-3xl'>A</h1>
      <h1 className='text-tertiary Q text-3xl'>Q</h1>
    </div>
  )
}

export default Loader
