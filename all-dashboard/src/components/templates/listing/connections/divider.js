import React from 'react'

function Divider({className=''}) {
  return (
    <hr className={`mt-6 border-[#D9D9D9] ${className}`}/>
  )
}

export default Divider