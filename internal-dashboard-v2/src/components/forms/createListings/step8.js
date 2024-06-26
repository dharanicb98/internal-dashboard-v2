import React, { useState } from 'react'
import { INPUT_STYLE } from '../../../constants'
import Dialog from '../../../ui/dialog'
import Calendar from '../../../ui/calender'
import moment from 'moment'
import ReservationLength from './reservationLength'

function Step8({payload, setPayload}) {
  console.log('step 8')
  const [openBlockDates, setOpenBlockDates] = useState(false)
  const [startDate, setStartDate] = useState(null) 
  const [endDate, setEndDate] = useState(null)
  const [editIndex, setEditIndex] = useState(null)
  const [blocksInputData, setBlocksInputData] = useState({ max_free:0, additional_cost:0 })
  
  //format date
  const formatDate = (date) => moment(date).format('DD-MM-YYYY');

  const handleClearDates = () => {
    setEndDate(null)
    setStartDate(null)
  }

  const handleBlocksOnChange = (e, key) => {
    let value = e.target.value
    setBlocksInputData((prev) => { return {...prev, [key]:value } } )
  }

  //handle blocks pricing
  const handleApply = () => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);

    if (startDate && endDate && editIndex === null) {
      let previousBlocks = [...payload?.extra_guests?.blocks, { start_date:formattedStart, end_date:formattedEnd, max_free:blocksInputData.max_free, additional_cost:blocksInputData.additional_cost }]
      setPayload((prev) => {return {...prev, extra_guests: {...prev.extra_guests, blocks:previousBlocks}}})
      setOpenBlockDates(prev => !prev)
      setStartDate(null)
      setEndDate(null)
      setBlocksInputData( { max_free:0, additional_cost:0 } )
    }
    else if  (startDate && endDate && editIndex !== null) {
    
      const updateValues = [...payload?.extra_guests?.blocks]
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      updateValues[editIndex] = { start_date:formattedStart, end_date:formattedEnd, max_free:blocksInputData.max_free, additional_cost:blocksInputData.additional_cost }
      setPayload((prev) => {return {...prev, extra_guests: {...prev.extra_guests, blocks:updateValues}}})
      setOpenBlockDates( prev => !prev )
      setStartDate(null)
      setEndDate(null)
      setEditIndex(null)
      setBlocksInputData( { max_free:0, additional_cost:0 } )
    }
  }

  //edit data
  const handleEdit = ( index ) => {
    const editData = payload?.extra_guests?.blocks[index]
    const startMoment = moment(editData?.start_date, 'DD-MM-YYYY');
    const endMoment = moment(editData?.end_date, 'DD-MM-YYYY');
    setBlocksInputData((prev) => {return {...prev, max_free:editData?.max_free, additional_cost:editData?.additional_cost}})
    setStartDate(startMoment)
    setEndDate(endMoment)
    setOpenBlockDates((prev) => !prev)
    setEditIndex(index)
  }

  //remove data
  const handleRemove = (index) => {
    let updatedData = [...payload.extra_guests.blocks]
    updatedData.splice(index, 1)
    setPayload((prev) => {return {...prev, extra_guests: {...prev.extra_guests, blocks:updatedData}}})
  }
  
  //update guests basic pricing
  const handleUpdateGuests = (e, key) => {
    let value  = e.target.value 
    setPayload((prev) => { return {...prev, extra_guests: {...prev.extra_guests, [key]:value}} })
  }

  return (
    <div>
        <h1 className='text-2xl font-semibold'>Extra Guests</h1>
        <label>Max Free</label> <br/>
        <input className={`${INPUT_STYLE}`} onChange={(e) => handleUpdateGuests(e, 'max_free')} value={payload?.extra_guests?.max_free}/> <br/>
        <label>Additional Cost</label> <br/>
        <input className={`${INPUT_STYLE}`} onChange={(e) => handleUpdateGuests(e, 'additional_cost')} value={payload?.extra_guests?.additional_cost}/>
        <div className='flex items-center justify-end'><button onClick={() => setOpenBlockDates((prev) => !prev)} className='mt-3'>Block Dates</button></div>
        <div className='mt-4'>
          {payload && payload?.extra_guests?.blocks.map((block, idx) => {
            return (
              <div key={idx} className='border p-4 rounded-md flex items-center justify-between my-3'>
                  <div>
                    <p>Max free Guest</p>
                    <p>${block.max_free}</p>
                  </div>
                <div>
                  <p>Additional Guests Cost</p>
                  <p>${block.additional_cost}</p>
                </div>
                <div>
                  <p>From</p>
                  <p>{block.start_date}</p>
                </div>
                <div>
                  <p>To</p>
                  <p>{block.end_date}</p>
                </div>

                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleRemove(idx)}>Remove</button>
              </div>
            )
          })}
        </div>

        
        <Dialog closeModal={setOpenBlockDates} isOpen={openBlockDates} childrenClass={'w-[800px] h-[550px] bg-white p-4 rounded-md no-scrollbar dark-scrollbar'}>
           <div className='flex gap-x-4'>
            <div>
              <Calendar    
               startDate={startDate} 
               endDate={endDate}
               setEndDate={(value) => setEndDate(value)}
               setStartDate={(value) => setStartDate(value)}
               daySize={60}
               numberOfMonths={1}
               basePrice={`${blocksInputData?.additional_cost && blocksInputData?.additional_cost}`}
               weekendPrice={`${blocksInputData?.additional_cost && blocksInputData?.additional_cost}`}
               currencySymbol={"$"}
              />
            </div>

            <div className='w-full'>
              <label>Max Free</label> <br/>
              <input value={blocksInputData?.max_free} onChange={(e) => handleBlocksOnChange(e, 'max_free')} className={`${INPUT_STYLE}`}/> <br/>
              <label>Additional Cost</label> <br/>
              <input value={blocksInputData?.additional_cost} onChange={(e) => handleBlocksOnChange(e, 'additional_cost')} className={`${INPUT_STYLE}`}/>
            </div>
           </div>

           <div className='flex items-center justify-between px-3'>
              <button onClick={handleClearDates}>Clear Dates</button>
              <button key='button' onClick={handleApply}>{editIndex === null ? 'Update': "Apply"}</button>
           </div>
        </Dialog>
       
       {/* Reservation Length */}
        <div>
            <ReservationLength payload={payload} setPayload={setPayload}/>
        </div>
    </div>
  )
}

export default Step8