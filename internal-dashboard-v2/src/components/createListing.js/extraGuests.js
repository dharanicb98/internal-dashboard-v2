import React, {useState} from 'react'
import Input from './input'
import CurrencyInput from '../../ui/input/currenyInput'
import Button from './button'
import Dialog from '../../ui/dialog'
import Calendar from '../../ui/calender'
import moment from 'moment'
import Title from './title'
import Description from './description'


function ExtraGuests({payload,  setPayload}) {
    const [openBlocksDialog, setOpenBlocksDialog] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [blocksData, setBlocksData] = useState({start_date: null, end_date: null, max_free: 0, additional_cost:0})

    const blocksDateFormat = (date) => moment(date).format("DD-MM-YYYY"); //blocks date format

    const calendarDateFormat = (date) => moment(date, "DD-MM-YYYY");

  
  //update guests basic pricing
  const handleUpdateGuests = (e, key) => {
    let value  = e.target.value 
    setPayload((prev) => { return {...prev, extra_guests: {...prev.extra_guests, [key]:value}} })
  }

  //handle blocks onChange
  const handleBlocksOnChange = (e, key) => {
    let value = e.target.value;
    setBlocksData((prev) => { return { ...prev, [key]: value }});
  }

  //edit data
  const handleEdit = ( index ) => {
    const {start_date, end_date, max_free, additional_cost} = payload?.extra_guests?.blocks[index]
    const formatStartDate = calendarDateFormat(start_date);
    const formatEndDate = calendarDateFormat(end_date);
    setBlocksData((prev) => {return {...prev, start_date: formatStartDate, end_date: formatEndDate, max_free, additional_cost}})
    setOpenBlocksDialog((prev) => !prev)
    setEditIndex(index)
  }

  //clear dialog data
  const handleClear = () => {
    setBlocksData({start_date: null, end_date: null, max_free: 0, additional_cost:0});
  }
 
  //handle Delete Blocks
  const handleRemove = (index) => {
    let updatedData = [...payload.extra_guests.blocks]
    updatedData.splice(index, 1)
    setPayload((prev) => {return {...prev, extra_guests: {...prev.extra_guests, blocks:updatedData}}})
  };

  //handle blocks pricing
  const handleBlocksData = () => {
    const formatStartDate = blocksDateFormat(blocksData?.start_date);
    const formatEndDate = blocksDateFormat(blocksData?.end_date);
    
    //create
    if ( blocksData?.start_date && blocksData?.end_date && editIndex === null ) {
      let previousBlocks = [...payload?.extra_guests?.blocks, { start_date: formatStartDate, end_date: formatEndDate, max_free:blocksData.max_free, additional_cost:blocksData.additional_cost }]
      setPayload((prev) => {return {...prev, extra_guests: {...prev.extra_guests, blocks:previousBlocks}}})
    }

    //update
    else if  ( blocksData?.start_date &&  blocksData?.end_date &&  editIndex !== null ) {
      const updateValues = [...payload?.extra_guests?.blocks]
      updateValues[editIndex] = { start_date:formatStartDate, end_date:formatEndDate, max_free:blocksData.max_free, additional_cost:blocksData.additional_cost }
      setPayload((prev) => {return {...prev, extra_guests: {...prev.extra_guests, blocks:updateValues}}})
    }

    setOpenBlocksDialog((prev) => !prev);
    setEditIndex(null);
    setBlocksData({ start_date: null, end_date: null, max_free: 0,  additional_cost: 0});
  }

  return (
    <div>
       <Title>Extra Guests</Title>
       <Description description='Set the limit for additional guests and the corresponding fee'/>
      

        <div className='flex items-center gap-x-10'>
           <Input
              label={'Maximum Free Guests'}
              value={payload?.extra_guests?.max_free}
              onChange={(e) => handleUpdateGuests(e, 'max_free')}
            />

        <CurrencyInput
              currency={payload?.currency}
              label={'Additional Cost for Extra Guests'}
              value={payload?.extra_guests?.additional_cost}
              onChange={(e) => handleUpdateGuests(e, 'additional_cost')}
              />
        </div>

        <div className='flex items-center justify-between'>
          <Title className='mt-10'>Date Specific Rates</Title>
          <Button onClick={() => setOpenBlocksDialog((prev) => !prev)}>Block Dates</Button>
        </div>

        <Description description='Set specific dates and associated costs for accommodating extra guests, providing flexibility in pricing for your  property'/>

  

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


        <Dialog closeModal={setOpenBlocksDialog} isOpen={openBlocksDialog} childrenClass='bg-white p-4 rounded-md'>
             <div className='flex items-start justify-between'>

                 <div>
                    <Calendar
                     startDate={blocksData?.start_date}
                     endDate={blocksData?.end_date}
                     setEndDate={(value) => setBlocksData((prev) => {return {...prev, end_date: value }})}
                     setStartDate={(value) => setBlocksData((prev) => {return {...prev, start_date: value }})}
                     daySize={60}
                     numberOfMonths={1}
                     basePrice={blocksData?.additional_cost}
                     weekendPrice={blocksData?.additional_cost}
                     currencySymbol={payload?.currencySymbol}
                    />
                </div>

                <div>
                    <Input
                    label={'Maximum Free Guests'}
                    value={blocksData?.max_free}
                    onChange={(e) => handleBlocksOnChange(e, 'max_free')}
                    />

                <CurrencyInput
                    currency={payload?.currency}
                    label={'Additional Cost for Extra Guests'}
                    value={blocksData?.additional_cost}
                    onChange={(e) => handleBlocksOnChange(e, 'additional_cost')}
                    />
                </div>

             </div>

             <div className="flex items-center justify-between">
                  <Button onClick={handleClear}>Clear</Button>
                  <Button onClick={handleBlocksData}>{editIndex === null ? "Apply" : "Update"}</Button>
                </div>
        </Dialog>
    </div>
  )
}

export default ExtraGuests