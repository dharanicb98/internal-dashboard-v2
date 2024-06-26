import React, { useState } from 'react'

function Toggle({checked, onChange}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer h-fit">
        <input  type="checkbox" checked={checked} onChange={onChange}  className='sr-only peer' />
        <div className="w-11 h-6 bg-[#AFAFAF]  rounded-full peer 
        after:border after:rounded-full after:h-5 after:w-5
        after:absolute  after:left-[2px] after:top-[2px] after:transition-all
        peer-checked:after:translate-x-full after:content-[''] 
        after:bg-white after:border-gray-100 peer-checked:bg-black 
        peer-checked:after:border-white"></div>
    </label>
  )
}

export default Toggle