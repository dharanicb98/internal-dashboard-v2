import React, { useState } from 'react'
import { times } from '../../constants/checkInCheckoutTimes'
import { ChevronDownIcon } from '../../icons'



function SelectCheckInCheckoutTime({fromTitle, toTitle, fromValue, toValue, className, fromKey, toKey, setPayload }) {
  const [checkIn, setCheckin] = useState(fromValue)
  const [checkout, setCheckout] = useState(toValue)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showCheckOut, setShowCheckOut] = useState(false)
  
  const handleCheckInCheckOut = (type, value) => {
    switch (type){
      case 'checkin':
        setCheckin(value)
        setPayload((prev) => {return {...prev, [fromKey]:value}})
        setShowCheckIn((prev) => !prev)
        break 

      case 'checkout':
        setCheckout(value)
        setPayload((prev) => {return {...prev, [toKey]:value}})
        setShowCheckOut((prev) => !prev)
        break

      default:
       break
    }
  }

  const handleShowCheckInCheckOut = (type) => {
    switch (type){
      case 'checkin':
        setShowCheckIn((prev) => !prev)
        break 

      case 'checkout':
        setShowCheckOut((prev) => !prev)
        break

      default:
       break
    }
  }
  
  return (
    <div className={`flex items-center justify-between w-[450px]  border-[1px] border-black  rounded-[10px] ${className}`}>
        <div className='border-black border-r-[1px] w-1/2 p-4'>
           <h2 className='text-slate-600'>{fromTitle}</h2>
           <div className='mt-2'>
              <div onClick={() => handleShowCheckInCheckOut('checkin')} className='flex items-center justify-between cursor-pointer'>
                <h3 className='font-semibold'>{checkIn}</h3>
                <ChevronDownIcon />
              </div>
              <div className={`h-[200px] overflow-y-auto w-[120px] absolute rounded-sm  bg-white z-10 shadow ${showCheckIn ? 'block': 'hidden'}`}>
                {times.map((time, index) => (
                   <div className='hover:bg-slate-50 cursor-pointer pt-1 px-2' onClick={() => handleCheckInCheckOut('checkin', time.key)} key={index}>{time?.key}</div>
                ))}
              </div>
           </div>
        </div>

        <div className='w-1/2 p-4'>
          <h2 className='text-slate-600'>{toTitle}</h2>
          <div className='mt-2'>
              <div onClick={() => handleShowCheckInCheckOut('checkout')} className='flex items-center justify-between cursor-pointer'>
               <h3 className='font-semibold'>{checkout}</h3>
               <ChevronDownIcon  />
              </div>
              <div className={`h-[200px] overflow-y-auto w-[120px] absolute z-10 bg-white shadow ${showCheckOut ? 'block': 'hidden'}`}>
                {times.map((time, index) => (
                   <div className='hover:bg-slate-50 cursor-pointer pt-1 px-2' onClick={() => handleCheckInCheckOut('checkout', time.key)} key={index}>{time?.key}</div>
                ))}
              </div>
           </div>
        </div>
    </div>
  )
}

export default SelectCheckInCheckoutTime