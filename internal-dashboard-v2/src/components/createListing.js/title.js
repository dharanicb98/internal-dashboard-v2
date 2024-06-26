import React from 'react'

function Title({As='h1', className='', children}) {
  return (
    <As className={`leading-[38.73px] text-[32px] font-medium ${className}`}>{children}</As>
  )
}

export default Title