import React from 'react'

function Button({className='', text='', onClick=() =>{},  }) {
  return (
    <button onClick={onClick} className={`border-[#D9D9D9] border bg-[#FFFFFF] rounded-[65px] 
    py-[18px] px-[24px] text-[#000000] leading-6 text-base font-normal ${className}`}>{text}</button>
  )
}

export default Button