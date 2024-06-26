import React from 'react'



function Guests({payload, setPayload}) {
  
  const handleGuests = (type, key) => {
    switch (type) {
        case 'increment':
           setPayload((prev) => { return {...prev, guests:{...prev.guests, [key]:prev.guests[key] + 1}}})
           break 
        case 'decrement':
            if (payload.guests[key] > 0) {
                setPayload((prev) => { return {...prev, guests:{...prev.guests, [key]:prev.guests[key] - 1}}})
                break 
            }
        default:
            break 
    }
  }

  return (
    <div>
        <h1 className='font-bold text-2xl'>Guests</h1>
        <div className='flex items-center justify-between'>
        {payload && Object.keys(payload.guests).map((guest) => {
            return (
                <div className='flex items-center gap-x-3'>
                  <h2>{guest}</h2>
                  <div className='flex items-center gap-x-3'>
                   <div onClick={() => handleGuests('decrement', guest)} className={`w-10 h-10 flex items-center justify-center text-xl  rounded-full border-[1px] cursor-pointer ${payload.guests[guest] > 0 ? 'border-black': 'border-slate-300 text-slate-300'}`}>-</div>
                   {payload.guests[guest]}
                   <div onClick={() => handleGuests('increment', guest)} className={`w-10 h-10 flex items-center justify-center text-xl  rounded-full border-[1px] border-black cursor-pointer`}>+</div>
                  </div>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default Guests