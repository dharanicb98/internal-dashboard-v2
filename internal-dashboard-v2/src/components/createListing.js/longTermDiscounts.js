import React, { useState } from 'react'
import Title from './title'
import Button from './button'
import { formatCurrency } from '../../utils/common'
import Dialog from '../../ui/dialog'
import CurrencyInput from '../../ui/input/currenyInput'
import Calendar from '../../ui/calender'
import { formatBlocksFormat, formatCalendarFormat } from '../../utils/common'

function LongTermDiscounts({payload, setPayload}) {
  //basic
  const [basicLongtermDiscounts, setBasicLongTermDiscounts] = useState({min_days:'', discount_type:'', discount_amount:0, blocks:[]})
  const [basicDilogOpen, setBasicDialogOpen] = useState( false );
  const [editIndex, setEditIndex] = useState( null )

  //blocks
  const [blocksDialogOpen, setBlocksDialogOpen] = useState( false )
  const [blocksPayload, setBlocksPayload] = useState({ start_date:null, end_date:null,  discount_type:'', discount_amount:0})
  const [blocksEditIndexs, setBlocksEditIndexs] = useState({ idx1:null, idx2:null });
  const [blockId, setBlockId] = useState(null)

   //format dates 
   const blocksDateFormat = ( date ) => formatBlocksFormat(date) 
   const calendarDateFormat = ( date ) => formatCalendarFormat( date )

  //basic
  const handleAddBasicOnChange = ( e, key ) => {
    let value = e.target.value
    setBasicLongTermDiscounts((prev) => { return {...prev, [key]:value}})
  }

  const handleClear = () => {
    setBasicLongTermDiscounts({min_days:'', discount_type:'', discount_amount:0});
  }

  const handleBasicLongTermDiscounts = (  ) => {
    if ( editIndex === null ) {
      setPayload((prev) => {return {...prev, long_term_discount:[...prev?.long_term_discount, basicLongtermDiscounts]}});
    }
    else {
      let longTermDiscountsData = [...payload?.long_term_discount]
      longTermDiscountsData[editIndex] = {...basicLongtermDiscounts }
      setPayload((prev) => {return {...prev, long_term_discount:longTermDiscountsData}});
    }
    setBasicLongTermDiscounts({min_days:'', discount_type:'', discount_amount:0, blocks:[]});
    setBasicDialogOpen((prev) => !prev)
    setEditIndex(null)
  }

  const handleBasicLongTermDiscountDelete = ( idx ) => {
    const longTermDiscountsData = [...payload?.long_term_discount]
    longTermDiscountsData.splice( idx, 1 )
    setPayload((prev) => {return {...prev, long_term_discount:longTermDiscountsData}});
  }

  const handleBasicEdit = ( idx ) => {
   const longTermDiscounts = [...payload.long_term_discount];
   const {min_days, discount_type, discount_amount} = longTermDiscounts[idx];
   setBasicLongTermDiscounts({min_days, discount_amount, discount_type});
   setEditIndex(idx);
   setBasicDialogOpen((prev) => !prev);
  }

  const handleBlockDiloag = ( idx ) => {
   setBlockId( idx );
   setBlocksDialogOpen((prev) => !prev)
  }



  //blocks
  const handleClearBlocksDiscounts = ( ) => {
    setBlocksPayload({ start_date:null, end_date:null,  discount_type:'', discount_amount:0})
  }

  const handleApplyBlocks = () => {
    let data = [...payload.long_term_discount]
    let startDate = blocksDateFormat(blocksPayload.start_date)
    let endDate = blocksDateFormat(blocksPayload.end_date)

    data[blockId] = {...data[blockId], blocks:[...data[blockId]?.blocks, {
      start_date: startDate,
      end_date: endDate,
      discount_type: blocksPayload.discount_type,
      discount_amount: blocksPayload.discount_amount
    }]}
    setBlocksDialogOpen((prev) => !prev)
    setPayload((prev) => {return {...prev, long_term_discount: data}});
    setBlockId(null)
  }

  const handleBlocksOnChange = ( e, key ) => {
    let value = e.target.value
    setBlocksPayload((prev) => {return {...prev, [key]:value}})
  }
  
  return (
    <div>
        <div className='flex items-center justify-between'>
           <Title>Long Term Discounts</Title>
           <Button onClick={() => setBasicDialogOpen((prev) => !prev)}>Add</Button>
        </div>

        {payload && payload?.long_term_discount?.map((data, idx) => (
          <div key={idx} className='flex items-center justify-between border my-2 rounded-lg p-3'>
              <div className='flex flex-col gap-y-2'>
                <span>Min Days</span>
                <span>{data?.min_days}</span>
              </div>

              <div className='flex flex-col gap-y-2'>
                <span>Discount Type</span>
                <span>{data?.discount_type}</span>
              </div>

              <div className='flex flex-col gap-y-2'>
                <span>Discount Amount</span>
                <span>{formatCurrency(payload?.currency, data?.discount_amount)}</span>
              </div>

              <div className='flex flex-col gap-y-2'>
                {/* <span>Edit</span> */}
                <Button onClick={() => handleBlockDiloag(idx)}>Block Date</Button>
              </div>

              <div className='flex flex-col gap-y-2'>
                {/* <span>Edit</span> */}
                <Button onClick={() => handleBasicEdit(idx)}>Edit</Button>
              </div>

              <div>
                {/* <span className='flex flex-col gap-y-2'>Delete</span> */}
                <Button onClick={() => handleBasicLongTermDiscountDelete(idx)} >Delete</Button>
              </div>
   
          </div>
        ))}

        <Title As='h2' className='mt-9 mb-9'>Pricing Blocking</Title>
         
        {payload && payload?.long_term_discount?.map((discounts, idx1) => (
            <>
            {discounts?.blocks?.length > 0 && (
              <>
               <Title className='mt-3 text-xl mb-3 font-[900]' key={idx1}>{discounts.min_days}</Title>
               {discounts.blocks.map((dicount) => (
                <>
                   <div className='flex items-center border rounded-lg justify-between p-4'>
                      {/* <p>{dicount.min_days}</p> */}
                      <p>{dicount.discount_type}</p>
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                   </div>
                </>
               ))}
              </>
            )}
            </>
        ))}
        
        <Dialog closeModal={setBasicDialogOpen} isOpen={basicDilogOpen} childrenClass='bg-white p-5 rounded-lg w-[50%]'>
            <div  className='flex items-center justify-between m-3 w-[43%]'>
                <div className='flex flex-col'>
                 <label className='text-[#5C5C5C] leading-5 text-base font-normal'>Min Days</label>
                 <select value={basicLongtermDiscounts?.min_days} onChange={(e) => handleAddBasicOnChange(e, "min_days")}>
                    <option value=''>Choose Option</option>
                    <option value={7}>7 Days</option>
                    <option value={30}>30 Days</option>
                 </select>
                </div>
            </div>

       
           <select value={basicLongtermDiscounts?.discount_type} onChange={(e) => handleAddBasicOnChange(e, "discount_type")}>
              <option value=''>Choose Discount Type</option>
              <option value='flat'>Flat</option>
              <option value='percentage'>Percentage</option>
           </select>

           <CurrencyInput
            currency={payload?.currency}
            value={basicLongtermDiscounts?.discount_amount}
            onChange={(e) => handleAddBasicOnChange(e, 'discount_amount')}
            label='Discount Amount'
           />

           <div className='mt-5 flex items-center justify-between'>
              <Button onClick={handleClear}>Clear</Button>
              <Button onClick={handleBasicLongTermDiscounts}>{editIndex === null ? 'Add' : "Update"}</Button>
           </div>


        </Dialog>
        
        <Dialog closeModal={setBlocksDialogOpen} isOpen={blocksDialogOpen} childrenClass='bg-white p-5 rounded-lg w-[800px]'>
           <div className='flex items-start gap-x-2'>
              <div>
                <Calendar
                  startDate={blocksPayload?.start_date}
                  endDate={blocksPayload?.end_date}
                  setStartDate={(value) => setBlocksPayload((prev) => {return {...prev, start_date:value}})}
                  setEndDate={(value) => setBlocksPayload((prev) => {return {...prev, end_date:value}})}
                  daySize={60}
                  numberOfMonths={1}
                  basePrice={blocksPayload?.discount_amount}
                  weekendPrice={blocksPayload?.discount_amount}
                  currencySymbol={payload?.currencySymbol}
                />
              </div>

              <div>
                  <Title>Title</Title>
                  <select value={blocksPayload?.discount_type} onChange={(e) => handleBlocksOnChange(e, 'discount_type')}>
                    <option value=''>Choose Discount Type</option>
                    <option value='flat'>Flat</option>
                    <option value='percentage'>Percentage</option>
                  </select>

                <CurrencyInput
                  currency={payload?.currency}
                  value={blocksPayload?.discount_amount}
                  onChange={(e) => handleBlocksOnChange(e, 'discount_amount')}
                  label='Discount Amount'
                />
              </div>


           </div>

           <div className='flex items-center justify-between'>
              <Button onClick={handleClearBlocksDiscounts}>Clear</Button>
              <Button onClick={handleApplyBlocks}>Apply</Button>
           </div>
        </Dialog>

    </div>
  )
}

export default LongTermDiscounts