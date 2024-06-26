import React, { useState } from 'react'
import { INPUT_STYLE } from '../../../constants'
import Dialog from '../../../ui/dialog'
import Calendar from '../../../ui/calender'
import moment from 'moment'

function ReservationLength({payload, setPayload}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [blocksData, setBlocksData] = useState({startDate:null, endDate:null, minDays:0, maxDays:0})
  const [editIndex, setEditIndex] = useState(null)
  const [startDate, setStartDate] = useState(null) 
  const [endDate, setEndDate] = useState(null)

  //blocks date format
  const blocksFormatDate = (date) => moment(date).format('DD-MM-YYYY');

  //calendar date format 
  const calendarFormatDate = ( date ) =>  moment(date, 'DD-MM-YYYY');

  const clearData = () => {
    setBlocksData({startDate:null, endDate:null, minDays:0, maxDays:0})
    setEndDate(null)
    setStartDate(null)
  }

  const updateReservationLength = (e, key) => {
    let value = e.target.value
    setPayload((prev) => {return {...prev, reservation_length: {...prev.reservation_length, [key]: value}}})
  }

  const updateBlocksData = (e, key) => {
     let value = e.target.value
     setBlocksData((prev) => {return {...prev, [key]:value}})
  }
  
  const handleBlocksData = () => {
    const formatStartDate = blocksFormatDate( startDate )
    const formatEndDate = blocksFormatDate( endDate )

    if ( startDate && endDate && editIndex === null ) {
        const updateData = [...payload.reservation_length.blocks, {start_date:formatStartDate, end_date:formatEndDate, min_days:blocksData.minDays, max_days:blocksData.maxDays}]
        setPayload((prev) => {return {...prev, reservation_length:{ ...prev.reservation_length, blocks:updateData }}})
    }
    else if ( startDate && endDate && editIndex !== null ) {
        const updateData = [...payload.reservation_length.blocks]
        updateData[editIndex] = { start_date:formatStartDate, end_date:formatEndDate, min_days:blocksData.minDays, max_days:blocksData.maxDays }
        setPayload((prev) => {return {...prev, reservation_length:{ ...prev.reservation_length, blocks:updateData }}})
    }

    setOpenDialog((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
    setBlocksData({minDays:0, maxDays:0});
    setEditIndex(null);
  }



  const handleEdit = (index) => {
    const { start_date, end_date, min_days, max_days } = payload.reservation_length.blocks[index];
    const formatStartDate = calendarFormatDate( start_date );
    const formatEndDate = calendarFormatDate( end_date );
    setBlocksData((prev) => { return {...prev, minDays:min_days, maxDays:max_days} });
    setStartDate( formatStartDate );
    setEndDate( formatEndDate );
    setEditIndex( index );
    setOpenDialog((prev) => !prev)
  }

  const handleDelete = ( index ) => {
    let updateData = [...payload.reservation_length.blocks];
    updateData.splice(index, 1);
    setPayload((prev) => { return {...prev, reservation_length: {...prev.reservation_length, blocks:updateData}}});
  }


  return (
    <div>
        <h1 className='text-2xl font-semibold'>Reservation Length</h1>
        <div className='mt-4'>
          <div>
            <label>Min Days</label>
            <input className={`${INPUT_STYLE}`} onChange={(e) => updateReservationLength(e, 'min_days')} value={payload?.reservation_length?.min_days}/>
          </div>

          <div className='mt-4'>
            <label>Max Days</label>
            <input className={`${INPUT_STYLE}`} onChange={(e) => updateReservationLength(e, 'max_days')} value={payload?.reservation_length?.max_days}/>
          </div>
        </div>

        <div className='flex items-center justify-end mt-4'>
            <button onClick={() => setOpenDialog((prev) => !prev)}>Block Dates</button>
        </div>

        <div>
            {payload && payload?.reservation_length?.blocks.map((block, idx) => {
                return (
                    <div key={idx} className='border p-4 rounded-md flex items-center justify-between my-3'>
                        <div><p>Min Days</p><p>{block?.min_days}</p></div>
                        <div><p>Max Days</p><p>{block?.max_days}</p></div>
                        <div><p>Start Date</p><p>{block?.start_date}</p></div>
                        <div><p>End Date</p><p>{block?.end_date}</p></div>
                        <button onClick={() => handleEdit(idx)}>Edit</button>
                        <button onClick={() => handleDelete(idx)}>Delete</button>
                    </div>
                )
            })}
        </div>

        <Dialog closeModal={setOpenDialog} isOpen={openDialog} childrenClass={'w-[800px] h-[550px] bg-white p-4 rounded-md no-scrollbar dark-scrollbar'}>
             <div className='flex gap-x-4'>
                <div>
                  <Calendar
                    // startDate={blocksData?.startDate} 
                    // endDate={blocksData?.endDate}
                    // setEndDate={(value) => setBlocksData((prev) =>  {return {...prev, startDate:value}})}
                    // setStartDate={(value) => setBlocksData((prev) => {return {...prev, endDate:value}})}
                    startDate={startDate} 
                    endDate={endDate}
                    setEndDate={(value) => setEndDate(value)}
                    setStartDate={(value) => setStartDate(value)}
                    daySize={60}
                    numberOfMonths={1}
                    currencySymbol={"$"}
                  />
                </div>
            
              <div className='mt-4 w-full'>
                <div>
                    <label>Min Days</label>
                    <input className={`${INPUT_STYLE}`} onChange={(e) => updateBlocksData(e, 'minDays')} value={blocksData?.minDays}/>
                </div>

                <div className='mt-4'>
                    <label>Max Days</label>
                    <input className={`${INPUT_STYLE}`} onChange={(e) => updateBlocksData(e, 'maxDays')} value={blocksData?.maxDays}/>
                </div>
               </div>
            </div>

            <div className='flex items-center justify-between px-4'>
                <button onClick={clearData}>Clear</button>
                <button onClick={handleBlocksData}>{ editIndex === null ? 'Apply': 'Update' }</button>
            </div>
        </Dialog>
    </div>
  )
}

export default ReservationLength