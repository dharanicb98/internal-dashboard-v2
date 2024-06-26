import React from 'react'

function Button({onClick, text='button', className='', type=''}) {
  return (
    <button onClick={onClick} className={`font-medium text-base leading-5 mt-8 bg-[#000000] h-[39px] w-[108px] 
    px-[10px] py-[24px] flex items-center justify-center text-[#FFFFFF] rounded-[10px] cursor-pointer ${className}`}>{text}</button>
  )
}

export default Button