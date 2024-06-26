import React, { useState } from 'react'
import CurrencyInput from '../../ui/input/currenyInput'
import Button from './button'
import Dialog from '../../ui/dialog'
import Calendar from '../../ui/calender'

import { formatBlocksFormat, formatCalendarFormat, fromToBlockDates, formatCurrency } from '../../utils/common'
import Title from './title'
import { DeleteIcon, EditIcon } from '../../icons'
import Description from './description'

const basicPricing = [
   {key:'base_price', label:'Base Price'},
   {key:'weekend_price', label:'Weekend Price'},
   {key:'security_deposit', label:'Security Deposit'},
]

const BlocksContent = ({label='', value=''}) => {
   return (
    <div className='text-[#5C5C5C]  leading-6 text-sm font-normal'>
      <p>{label}</p>
      <p>{value}</p>
    </div>
   )
}


function BasicPricing({payload, setPayload}) {
  const [editIndex, setEditIndex] = useState(null);
  const [openBlocksDialog, setOpenBlocksDialog] = useState(false)
  const [blocksData, setBlocksData] = useState({
    start_date: null,
    end_date: null,
    base_price: 0,
    weekend_price: 0,
    security_deposit: 0,
  })

  const blocksDateFormat = ( date ) => formatBlocksFormat(date) 

  const calendarDateFormat = ( date ) => formatCalendarFormat( date )

  // add basic pricing
  const handleBasicPricing = (e, key) => {
    let value = e.target.value
    setPayload((prev) => {return {...prev, basic_pricing: {...prev.basic_pricing, [key]:+value}}})
  }

  //
  const handleBlocksPricing = (e, key) => {
    let value = e.target.value;
    setBlocksData((prev) => { return { ...prev, [key]: value }});
  };


  //handle add blocks data 
  const handleBlocksData = () => {
    const formatStartDate = blocksDateFormat(blocksData?.start_date);
    const formatEndDate = blocksDateFormat(blocksData?.end_date);

    //create
    if (blocksData?.start_date && blocksData?.end_date && editIndex === null) {
      let updateData = [
        ...payload.basic_pricing.blocks,
        {
          start_date: formatStartDate,
          end_date: formatEndDate,
          base_price: blocksData.base_price,
          weekend_price: blocksData.weekend_price,
          security_deposit: blocksData.security_deposit,
        },
      ];
      setPayload((prev) => {
        return {
          ...prev,
          basic_pricing: { ...prev.basic_pricing, blocks: updateData },
        };
      });
    }
    //update
    else if (  blocksData?.start_date &&  blocksData?.end_date &&  editIndex !== null ) {
      let updateData = [...payload.basic_pricing.blocks];
      updateData[editIndex] = {
        start_date: formatStartDate,
        end_date: formatEndDate,
        base_price: blocksData.base_price,
        weekend_price: blocksData.weekend_price,
        security_deposit: blocksData.security_deposit,
      };
      setPayload((prev) => {
        return {
          ...prev,
          basic_pricing: { ...prev.basic_pricing, blocks: updateData },
        };
      });
    }
    setOpenBlocksDialog((prev) => !prev);
    setEditIndex(null);
    setBlocksData({ start_date: null, end_date: null, base_price: 0,  weekend_price: 0, security_deposit: 0,});
  };


  
  //clear dialog data
  const handleClear = () => {
    setBlocksData({start_date: null, end_date: null, base_price: 0, weekend_price: 0, security_deposit: 0});
  }

  const handleRemove = (index) => {
    const updateData = [...payload.basic_pricing.blocks];
    updateData.splice(index, 1);
    setPayload((prev) => {
      return {
        ...prev,
        basic_pricing: { ...prev.basic_pricing, blocks: updateData },
      };
    });
  };

  const handleEdit = (index) => {
    const {
      start_date,
      end_date,
      base_price,
      weekend_price,
      security_deposit,
    } = payload.basic_pricing.blocks[index];
    const formatStartDate = calendarDateFormat(start_date);
    const formatEndDate = calendarDateFormat(end_date);
    setBlocksData({
      start_date: formatStartDate,
      end_date: formatEndDate,
      base_price,
      weekend_price,
      security_deposit,
    });
    setEditIndex(index);
    setOpenBlocksDialog((prev) => !prev);
  };


  const handleOpenBlocks = () => {
    setBlocksData({start_date: null, end_date: null, base_price: 0, weekend_price: 0, security_deposit: 0});
    setOpenBlocksDialog((prev) => !prev)
  }




  return (
    <div>
        <div className='flex items-center justify-between'>
          <Title>Pricing</Title>
          {/* <Button onClick={handleOpenBlocks}>Block Dates</Button> */}
        </div>

         <Description className='mt-4' description='Specify the base price, weekend rate, and security deposit for your  property, providing clarity and security for both you and your guests'/>

          <div className='grid grid-cols-3 gap-x-16 mt-8'>
            {basicPricing.map((pricing, idx) => (
             <CurrencyInput
              key={idx}
              currency={payload?.currency}
              label={pricing?.label}
              value={payload?.basic_pricing[pricing?.key]}
              onChange={(e) => handleBasicPricing(e, pricing?.key)}
              />
            ))}
         </div>


         <div className='flex items-center justify-between mt-12'>
            <Title>Price Blocking</Title>
            <Button onClick={handleOpenBlocks}>Block Dates</Button>
         </div>

         <Description className='mt-4' description='Customize pricing for specific dates with distinct base, weekend, and security deposit rates, simplifying property  pricing' />

        <div className="mt-8">
        {payload?.basic_pricing?.blocks.map((block, idx) => (
          <div
            key={idx}
            className="border border-[#5C5C5C] p-5 rounded-md flex items-center justify-between my-5"
          >
            <BlocksContent label='From' value={block?.start_date}/>

            <BlocksContent label='To' value={block?.end_date} />

            <BlocksContent label='Base Price' value={formatCurrency(payload?.currency, block?.base_price)}/>

            <BlocksContent label='Weekend Price' value={formatCurrency(payload?.currency, block?.weekend_price)}/>

            <BlocksContent label='Security Deposit' value={formatCurrency(payload?.currency, block?.security_deposit)}/>

            <div>
               <p className='text-[#5C5C5C]  leading-6 text-sm font-normal'>Edit</p>
               <EditIcon onClick={() => handleEdit(idx)} className='hover:scale-100'/>
               {/* <button onClick={() => handleEdit(idx)}>Edit</button> */}
            </div>

            <div className='text-[#5C5C5C]  leading-6 text-sm font-normal'>
              <p>Delete</p>
              <DeleteIcon onClick={() => handleRemove(idx)} className='hover:scale-100' />
              {/* <button onClick={() => handleRemove(idx)}>Delete</button> */}
            </div>

    
          </div>
        ))}
        </div>
        
        {/* dialog box */}
        <Dialog showCreateClick={false} closeModal={() => setOpenBlocksDialog((prev) => !prev)} isOpen={openBlocksDialog} childrenClass='bg-white p-5 rounded-lg w-[800px]'>
            <div className='flex items-start gap-x-2'>
                <div>
                    <Calendar
                     startDate={blocksData?.start_date}
                     endDate={blocksData?.end_date}
                     setEndDate={(value) => setBlocksData((prev) => {return {...prev, end_date: value }})}
                     setStartDate={(value) => setBlocksData((prev) => {return {...prev, start_date: value }})}
                     daySize={60}
                     numberOfMonths={1}
                     basePrice={blocksData?.base_price}
                     weekendPrice={blocksData?.weekend_price}
                     currencySymbol={payload?.currencySymbol}
                    />
                </div>

                <div className='flex flex-col gap-y-10 w-full'>
                  {basicPricing.map((pricing, idx) => (
                    <CurrencyInput
                      // className=''
                      key={idx}
                      currency={payload?.currency}
                      label={pricing?.label}
                      value={blocksData[pricing?.key]}
                      onChange={(e) => handleBlocksPricing(e, pricing?.key)}
                      />
                  ))}
                </div>
            </div>
            <div className="flex items-center justify-between  w-full">
                  <Button onClick={handleClear}>Clear</Button>
                  <Button onClick={handleBlocksData}>{editIndex === null ? "Apply" : "Update"}</Button>
            </div>
        </Dialog>

    </div>
  )
}

export default BasicPricing