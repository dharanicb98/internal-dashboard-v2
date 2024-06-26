import React from 'react'

function Description({description, className}) {
  return (
    <div className={`mt-3 ${className}`}><span className='text-[#000000] leading-6 text-xl font-normal'>{description}</span></div>
  )
}

export default Description