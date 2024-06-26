import React from 'react'
import { currencyData } from '../../constants'

function CurrencyInput({currency='', label='label', className='', inputClassName='', onChange, value}) {
  
 const position = currencyData[currency]?.position
 const symbol = currencyData[currency]?.symbol

 const handleKeyDown = (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (isNaN(e?.key) && !allowedKeys.includes(e?.key)) {
        e.preventDefault()
        return
    }
 }

  return (
    <div className={`${className}`}>
        <label className={`text-[#5C5C5C]`}>{label}</label>
        <div className='border-b border-[#D9D9D9] mt-1 flex items-center '>
            {position === 'left'&& <span className='text-[#5C5C5C]'>{symbol}</span>}
            <input 
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}   
            type='text'  
            className={`border-0 focus:outline-none focus:ring-0  w-full  ${inputClassName}`}/> 
            {position === 'right' && <span className='text-[#5C5C5C]'>{symbol}</span>}
        </div>
    </div>
  )
}

export default CurrencyInput