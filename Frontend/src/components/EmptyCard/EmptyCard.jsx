import React from 'react'

const EmptyCard = ({image, message}) => {
  return (
      <div className='flex justify-center items-center flex-col mt-44'>
        <img src={image} alt="No Notes" className='w-[500px]'/>
          <p className='w-1/2 text-sm text-slate-700 text-center leading-7 mt-10 max-w-[550px]'>
          {message}
          </p>
    </div>
  )
}

export default EmptyCard