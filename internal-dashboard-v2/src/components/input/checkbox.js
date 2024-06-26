import React from 'react'

function Checkbox({checked, onChange}) {
  return (
    <>
    <input className="accent-black cursor-pointer relative shrink-0 border-[#6B6B6B] border w-7 h-8 rounded bg-white focus:outline-none focus:ring-offset-0 "
       checked={checked}  type='checkbox' onChange={onChange}/>
    </>
  )
}

export default Checkbox