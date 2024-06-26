import React, { useState } from 'react'

function OtpCard({otpValue, setOtpValue}) {
  const array = Array(4).fill(null)
  const ref = Array.from({length : 4}, () => React.createRef())
  

  const handleOtp = (e, index) => {
    let value = e.target.value 
    setOtpValue((prev) => {
      let updateOtpValue = [...prev]
      updateOtpValue[index] = value 
      if ( value && index < array.length -1 ) {
          ref[index + 1].current?.focus();
      }
      return updateOtpValue
    })
  }

  const handleBackSpace = (e, index) => {
      if ( e.key === 'Backspace' && index > 0 && !otpValue[index] ) {
        const focusInputRef = ref[index - 1]
        if (focusInputRef && focusInputRef.current) {
            focusInputRef.current.focus()
        }
      }
  }



  return (
    <div className='mt-4 flex items-center justify-between flex-wrap'>
        {array.map((_, index) => {
            return (
                <input onChange={(e) => handleOtp(e, index)} onKeyDown={(e) => handleBackSpace(e, index)} key={index} type='tel' value={otpValue[index]} ref={ref[index]} maxLength={1}
                className='border border-[#EDEEF1] rounded-lg md:w-[60px] md:h-[60px] w-[70px] h-[70px]  text-center focus-visible:ring-none focus:ring-[black] focus:ring-1 focus:border-black focus:outline-none'/>
            )
        })}
    </div>
  )
}

export default OtpCard