import React, {  } from 'react';
import Toggle from '../../input/toggle';
import Guests from './guests';
import { INPUT_STYLE } from '../../../constants';

const reservations = [
  { 
    id:1,
    title: 'Number of Guests',
    value:'no_of_guests_max'
  },
  { 
    id:2,
    title: 'Maximum Bedrooms',
    value:'no_of_bedrooms_max'
  },
  { 
    id:3,
    title: 'Maximum Beds',
    value:'no_of_beds_max'
  },
  { 
    id:4,
    title: 'Maximum washrooms',
    value:'no_of_washroom_max'
  },
  { 
    id:5,
    title: 'Maximum allowed Guests',
    value:'max_allowed_guests'
  },
  { 
    id:6,
    title: 'Maximum Free Guests',
    value:'max_free_guests'
  },
  { 
    id:7,
    title: 'Maximum Booking Days',
    value:'max_bookings_days'
  },
  { 
    id:8,
    title: 'Number of pets allowed',
    value:'no_of_pets_allowed'
  }
]

function Step4({payload, setPayload}) {

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

  const handleInput = (e, key) => {
   let value = e.target.value
   switch (key) {
      case key:
        setPayload((prev) => {return {...prev, [key]:value}})
        break 
      default:
        break 
   }
  }

  const handleToggle = (type) => {
      switch (type) {
        case 'is_instant_book':
          setPayload((prev) => {return {...prev, is_instant_book:!prev.is_instant_book}})
          break

        case 'is_self_checkin':
          setPayload((prev) => {return {...prev, is_self_checkin:!prev.is_self_checkin}})
          break
          
        default:
          break 

      }
  }

  return (
   <div>
     <center>Reservations</center>
     <div className='flex items-center justify-between ]'>
       <div className='flex items-center justify-between my-10 w-[42%]'>
        <h2 className='text-slate-600 text-lg '>Instant booking Available</h2>
        <Toggle checked={payload?.is_instant_book} onChange={() => handleToggle('is_instant_book')}/>
       </div>


      <div className='flex items-center justify-between my-10  w-[42%]'>
        <h2 className='text-slate-600 text-lg '>Self check-in Available</h2>
        <Toggle checked={payload?.is_self_checkin} onChange={() => handleToggle('is_self_checkin')}/>
      </div>
     </div>

     <Guests payload={payload} setPayload={setPayload}/>

     <div className='flex flex-col w-[45%]  my-8'>
        <label className='text-slate-600'>Price per Extra Guest ({payload?.currency_symbol})</label>
        <input type='number' value={payload?.price_per_additional_guest} onChange={(e) => handleInput(e, 'price_per_additional_guest')} className={`${INPUT_STYLE}`}  />
      </div>

     <div className='flex justify-between items-center flex-wrap mt-3'>
        {reservations.map((reservation, index) => (
          <div key={index} className='flex items-center justify-between m-3 w-[43%]'>
            <div className='text-slate-600 text-lg'>{reservation.title}</div>
            <div className='flex items-center gap-x-3'>
            <div onClick={() => handleReservations('decrement', reservation.value)} className={`w-10 h-10 flex items-center justify-center text-xl  rounded-full border-[1px] cursor-pointer ${payload[reservation.value] > 0 ? ' border-black':' border-slate-300 text-slate-300'}`}>-</div>
            <div className='text-xl'>{payload[reservation.value]}</div>
            <div onClick={() => handleReservations('increment', reservation.value)} className={`w-10 h-10 text-xl flex items-center justify-center border-[1px] border-black rounded-full cursor-pointer`}>+</div>
            </div>
          </div>
        ))}
     </div>
   </div>
  );
}

export default Step4;
