import React from 'react'

function Title({As="h1", text, className=''}) {
  return (
    <As className={`text-[#000000] text-xl leading-6 font-medium ${className}`}>{text}</As>
  )
}

export default Title