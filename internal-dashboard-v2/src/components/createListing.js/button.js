import React from 'react'

function Button({className='', type='button', children,  onClick}) {
  return (
    <button type={type} onClick={onClick} className={`bg-[#000000] rounded-[36px] py-2 px-7 text-white ${className}`}>{children}</button>
  )
}

export default Button