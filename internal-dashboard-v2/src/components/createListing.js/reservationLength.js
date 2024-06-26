import React, {useState} from 'react'
import Input from './input'
import CurrencyInput from '../../ui/input/currenyInput'
import Button from './button'
import Dialog from '../../ui/dialog'
import Calendar from '../../ui/calender'
import moment from 'moment'

const reservationLengthData  = [
    { key: 'min_days', label: 'Minimum Days Bookings'},
    { key: 'max_days', label: 'Maximum Days Booking'},
]

function ReservationLength({ payload, setPayload }) {
  const [openBlocksDialog, setOpenBlocksDialog] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [blocksData, setBlocksData] = useState({start_date:null, end_date:null, min_days:0, max_days:0})

  const blocksDateFormat = (date) => moment(date).format("DD-MM-YYYY"); //blocks date format

  const calendarDateFormat = (date) => moment(date, "DD-MM-YYYY");

  //handle basic reservation length
  const handleReservationLength = (e, key) => {
    let value = e.target.value
    setPayload((prev) => {return {...prev, reservation_length: {...prev.reservation_length, [key]: value}}})
  }

  // handle blocks onChange 
  const handleBlocksOnChange = (e, key) => {
    let value = e.target.value;
    setBlocksData((prev) => { return { ...prev, [key]: value }});
  }

//clear dialog data
const handleClear = () => {
        setBlocksData({start_date: null, end_date: null, min_days: 0, max_days:0});
}

 //handle delete blocks data
 const handleDelete = ( index ) => {
    let updateData = [...payload.reservation_length.blocks];
    updateData.splice(index, 1);
    setPayload((prev) => { return {...prev, reservation_length: {...prev.reservation_length, blocks:updateData}}});
 }

 //handle update edit inputs
 const handleEdit = (index) => {
    const { start_date, end_date, min_days, max_days } = payload.reservation_length.blocks[index];
    const formatStartDate = calendarDateFormat(start_date);
    const formatEndDate = calendarDateFormat(end_date);
    setBlocksData((prev) => { return {...prev,start_date:formatStartDate, end_date:formatEndDate, min_days, max_days} });
    setEditIndex( index );
    setOpenBlocksDialog((prev) => !prev)
 }

 const handleBlocksData = () => {
    const formatStartDate = blocksDateFormat(blocksData?.start_date);
    const formatEndDate = blocksDateFormat(blocksData?.end_date);

    //create
    if (  blocksData?.start_date && blocksData?.end_date && editIndex === null ) {
        const updateData = [...payload.reservation_length.blocks, {start_date:formatStartDate, end_date:formatEndDate, min_days:blocksData.min_days, max_days:blocksData.max_days}]
        setPayload((prev) => {return {...prev, reservation_length:{ ...prev.reservation_length, blocks:updateData }}})
    }
    //update
    else if (  blocksData?.start_date &&  blocksData?.end_date &&  editIndex !== null ) {
        const updateData = [...payload.reservation_length.blocks]
        updateData[editIndex] = { start_date:formatStartDate, end_date:formatEndDate, min_days:blocksData.min_days, max_days:blocksData.max_days }
        setPayload((prev) => {return {...prev, reservation_length:{ ...prev.reservation_length, blocks:updateData }}})
    }

    setOpenBlocksDialog((prev) => !prev);
    setBlocksData({start_date:null, end_date:null, min_days:0, max_days:0});
    setEditIndex(null);
 }



  return (
    <div>
        <div className='grid grid-cols-2'>
            {reservationLengthData.map((data, idx) => (
               <Input
                key={idx}
                 label={data?.label}
                 value={payload?.reservation_length[data?.key]}
                 onChange={(e) => handleReservationLength(e, data?.key)}
               />
            ))}
        </div>

        <div className='flex items-center justify-end mt-10'>
           <Button onClick={() => setOpenBlocksDialog((prev) => !prev)}>Blocks Dates</Button>
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


        <Dialog closeModal={setOpenBlocksDialog} isOpen={openBlocksDialog} childrenClass='bg-white'>
            <div>
               <div>
                   <Calendar
                        startDate={blocksData?.start_date}
                        endDate={blocksData?.end_date}
                        setEndDate={(value) => setBlocksData((prev) => {return {...prev, end_date: value }})}
                        setStartDate={(value) => setBlocksData((prev) => {return {...prev, start_date: value }})}
                        daySize={60}
                        numberOfMonths={1}
                        currencySymbol={payload?.currencySymbol}
                    />
                </div>

                <div>
                   {reservationLengthData.map((data) => (
                    <Input
                        label={data?.label}
                        value={blocksData[data?.key]}
                        onChange={(e) => handleBlocksOnChange(e, data?.key)}
                    />
                    ))}
                </div>

                <div className="flex items-center justify-between">
                   <button onClick={handleClear}>Clear</button>
                   <button onClick={handleBlocksData}>
                    {editIndex === null ? "Apply" : "Update"}
                    </button>
                </div>

            </div>
        </Dialog>


    </div>
  )
}

export default ReservationLength