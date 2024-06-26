import React from 'react'
import { INPUT_STYLE } from '../../constants'

function Input({label='label', value='', onChange, className, inputClass, placeHolder='', type='text'}) {
  return (
    <div className={`flex flex-col mt-2 ${className} `}>
        <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>{label}</label>
        <input type={type} className={`${inputClass} ${INPUT_STYLE} mt-1`} onChange={onChange} value={value} placeholder={placeHolder}/>
    </div>
  )
}

export default Input