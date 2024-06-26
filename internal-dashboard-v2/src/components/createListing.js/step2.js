import React from 'react'
import { currencyData } from '../../constants'
import { INPUT_STYLE } from '../../constants'
import Toggle from '../../ui/input/toggle'


const guestsData = [
    {label:'Childrens', key:'children'},
    {label:'Adults', key:'adults'},
    {label:'Infants', key:'infants'}
]

const reservations = [
    { 
      title: 'Number of Guests',
      value:'no_of_guests_max'
    },
    { 
        title: 'Maximum allowed Guests',
        value:'max_allowed_guests'
    },
    // { 
    //     title: 'Maximum Free Guests',
    //     value:'max_free_guests'
    // },
    { 
        title: 'Maximum Booking Days',
        value:'max_bookings_days'
    },
    { 
      title: 'Maximum Bedrooms',
      value:'no_of_bedrooms_max'
    },
    { 
      title: 'Maximum Beds',
      value:'no_of_beds_max'
    },
    { 
      title: 'Maximum washrooms',
      value:'no_of_washroom_max'
    },
    { 
      title: 'Number of pets allowed',
      value:'no_of_pets_allowed'
    }
]



function Step2({payload, setPayload}) {

  const handleToggle = (key, check) => {
    setPayload((prev) => {return {...prev, [key]:check}})
  }

  const handleReservations = (type, key) => {
    switch (type) {
        case 'increment':
          setPayload((prev) => {return {...prev, [key]: prev[key] + 1}})
          break 

        case 'decrement':
          if (payload[key] > 0) {
            setPayload((prev) => {return {...prev, [key]: prev[key] - 1}})
            break 
          }
        default:
          break 
    }
  }

  const handleGuests = (type, key) => {

    switch ( type ) {
        case 'increment':
          setPayload((prev) => {return {...prev, guests: {...prev.guests, [key]: prev.guests[key] + 1}}})
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
        <h1 className='leading-[38.73px] text-[32px] font-medium'>Reservations</h1>
        <div className='mt-8'>
            <span className='text-[#000000] leading-6 text-xl font-normal'>Toggle Instant Booking and Self Check-in for unparalleled control and efficiency in property management</span>
            <div className='flex  flex-col w-1/2'>
                <div className='flex items-center  justify-between gap-x-3 mt-6'>
                    <span className='text-[#5C5C5C] leading-5 text-base font-normal'>Instant booking Available</span>
                    <Toggle checked={payload?.is_instant_book} onChange={(check) => handleToggle('is_instant_book', check)}/>
                </div>

                <div className='flex items-center justify-between gap-x-3 mt-6'>
                    <span className='text-[#5C5C5C] leading-5 text-base font-normal'>Self check-in Available</span>
                    <Toggle checked={payload?.is_self_checkin} onChange={(check) => handleToggle('is_self_checkin', check)}/>
                </div>
            </div>
        </div>

        <div className='mt-10'>
          <span className='text-[#000000] leading-6 text-xl font-normal'>Specify total allowed guests, differentiating adults and infants, for optimized reservations and a seamless guest experience</span>
          <div className='flex  items-center justify-between mt-6'>
            {guestsData.map((guest, idx) => (
               <div key={idx} className='flex items-center gap-x-3'>
                <h2 className='text-[#5C5C5C] leading-5 text-base font-normal'>{guest?.label}</h2>
                <div className='flex items-center gap-x-3'>
                <div onClick={() => handleGuests('decrement',guest.key)}><img src="/icons/decrement-outline.svg" alt='decrement' className='cursor-pointer'/></div>
                    {payload?.guests[guest.key]}
                    <div onClick={() => handleGuests('increment', guest.key)}><img src="/icons/increment-outline.svg" className='cursor-pointer' alt='increment'/></div>
               </div>
             </div>
            ))}
          </div>
        </div>

        <div className='mt-10'>
            <span className='text-[#000000] leading-6 text-xl font-normal'>Set the maximum limit to enhance guest comfort. Accurate details optimize bookings for an improved guest experience</span>
           <div>
                <div className='flex justify-between items-center flex-wrap mt-3'>
                    {reservations.map((reservation, index) => (
                        <div key={index} className='flex items-center justify-between m-3 w-[43%]'>
                            <div className='text-[#5C5C5C] leading-5 text-base font-normal'>{reservation.title}</div>
                            <div className='flex items-center gap-x-3'>
                            <div onClick={() => handleReservations('decrement', reservation.value)}><img src="/icons/decrement-outline.svg" alt='decrement' className='cursor-pointer'/></div>
                            <div className='text-xl'>{payload[reservation.value]}</div>
                             <div onClick={() => handleReservations('increment', reservation.value)}><img src="/icons/increment-outline.svg" className='cursor-pointer' alt='increment'/></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </div>

    </div>
  )
}

export default Step2