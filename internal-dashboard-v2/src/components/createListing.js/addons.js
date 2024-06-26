import React, { useState } from 'react'
import Title from './title'
import Button from './button'
import Dialog from '../../ui/dialog'
import CurrencyInput from '../../ui/input/currenyInput'
import Toggle from '../../ui/input/toggle'
import { useSelector } from 'react-redux'
import { formatBlocksFormat, formatCalendarFormat } from '../../utils/common'
import Calendar from '../../ui/calender'

const toggleData = [
  {label:'Per Night', value:'per_night'},
  {label:'Per Guest', value:'per_guest'},
  {label:'Per Bedroom', value:'per_bedroom'},
]

function Addons({payload, setPayload}) {
  //basic 
  const [openBasicAddonDialog, setOpenBasicAddonDialog] = useState(false)
  const [basicAddonPayload,  setBasicAddonPayload] = useState({id:'', amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false, blocks:[]});
  const [basicEditIndex, setBasicEditIndex] = useState(null)

  //blocks
  const [openBlocksDialog, setOpenBlocksDialog] = useState(false)
  const [blocksAddonPayload, setBlocksAddonPayload] = useState({start_date:null, end_date:null, amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false})
  const [blockId, setBlockId] = useState(null);
  const [blocksEditIndexs, setBlocksEditIndexs] = useState({idx1:null, idx2:null})

  const attributes = useSelector((state) => state.attributes)
  const addons = attributes?.addons?.data 
  const addonsHashMap = attributes?.addons?.hashMap

  //format dates 
  const blocksDateFormat = ( date ) => formatBlocksFormat(date) 
  const calendarDateFormat = ( date ) => formatCalendarFormat( date )


  const openBasicAddAddons = () => {
    setBasicAddonPayload({id:'', amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false, blocks:[]})
    setBasicEditIndex(null)
    setOpenBasicAddonDialog((prev) => !prev)
  }

  // basic
  const handleBasicAddonsOnChange = (e, key) => {
    let value = e.target.value 
    setBasicAddonPayload((prev) => {return {...prev, [key]:value}})
  }

  const  handleBasicAddonsToggle = (check, key) => {
    setBasicAddonPayload((prev) => {return {...prev, [key]:check}})
  }

  const handleBasicAddons = () => {
    if ( basicEditIndex === null ){
      //create entry check already exists or not
      setPayload((prev) => {return {...prev, add_ons:[...prev.add_ons, basicAddonPayload]}});
    }
    else {
      //update entry
      let updateData = [...payload.add_ons];
      updateData[basicEditIndex] = {...basicAddonPayload}
      setPayload((prev) => {return {...prev, add_ons:updateData}});

    }
    setOpenBasicAddonDialog((prev) => !prev)
    setBasicEditIndex(null)
    setBasicAddonPayload({id:'', amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false, blocks:[]})
  
  }

  const handleBasicAddonsEdit = ( idx ) => {
    const {id, amount_type, amount, per_night, per_guest, per_bedroom} = payload.add_ons[idx];
    setBasicAddonPayload({id, amount_type, amount, per_night, per_guest, per_bedroom, blocks:[]});
    setOpenBasicAddonDialog((prev) => !prev);
    setBasicEditIndex( idx );

  }

  const handleBasicAddonsRemove = ( idx ) => {
    let  updateData = [...payload.add_ons]
    updateData.splice(idx, 1)
    setPayload((prev) => {return {...prev, add_ons: updateData}})
  }

  const handleClearBasicAddons = () => {
    setBasicAddonPayload({id:'', amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false, blocks:[]})
  }

  const handleBlock = ( idx ) => {
    setBlockId( idx)
    setOpenBlocksDialog(prev => !prev)
  }

 

  //blocks 
  const handleBlocksAddonsOnChange = (e , key ) => {
    let value = e.target.value 
    setBlocksAddonPayload((prev) => {return {...prev, [key]: value}})
  }

  const handleBlocksAddonsToggle = (check, key) => {
    setBlocksAddonPayload((prev) => {return {...prev, [key]:check}})
  }

  const handleBlocksDate = () => {
    let data = [...payload.add_ons]
    let startDate = blocksDateFormat(blocksAddonPayload.start_date)
    let endDate = blocksDateFormat(blocksAddonPayload.end_date)

    if ( blocksEditIndexs?.idx1 === null && blocksEditIndexs?.idx2 === null ) {
      data[blockId] = {...data[blockId],  blocks:[...data[blockId].blocks, {start_date:startDate, end_date:endDate, amount_type:blocksAddonPayload.amount_type, amount:blocksAddonPayload.amount, per_night:blocksAddonPayload.per_night, per_guest:blocksAddonPayload.per_guest, per_bedroom:blocksAddonPayload.per_bedroom } ]} 
    }
    else {
      data[blocksEditIndexs.idx1].blocks[blocksEditIndexs.idx2] = {
        start_date: startDate,
        end_date: endDate,
        amount_type: blocksAddonPayload.amount_type,
        amount: blocksAddonPayload.amount,
        per_night: blocksAddonPayload.per_night,
        per_guest: blocksAddonPayload.per_guest,
        per_bedroom: blocksAddonPayload.per_bedroom
    };
    }
    setPayload((prev) => {return {...prev, add_ons: data}})
    setBlocksAddonPayload({start_date:null, end_date:null, amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false})
    setOpenBlocksDialog((prev) => !prev)
    setBlocksEditIndexs({idx1:null, idx2:null})
    setBlockId( null )
  }

  const handleClearBlockAddons = () => {
    setBlocksAddonPayload({start_date:null, end_date:null, amount_type:'', amount:'', per_night:false, per_guest:false, per_bedroom:false})
  }

  const handleBlockRemove = ( idx1, idx2 ) => {
    const data = [...payload.add_ons]
    data[idx1].blocks.splice(idx2, 1)
    setPayload((prev) => {return {...prev, add_ons:data}})
  }

  const handleEditBlock = ( idx1, idx2 ) => {
    const data = [...payload.add_ons]
    setBlocksEditIndexs((prev) => {return {...prev, idx1, idx2}});
    const {start_date, end_date, amount_type, amount, per_guest, per_bedroom, per_night} = data[idx1]?.blocks[idx2]
    const startDate = calendarDateFormat(start_date);
    const endDate = calendarDateFormat(end_date);
    setBlocksAddonPayload((prev) => {return {...prev, start_date:startDate, end_date:endDate, amount_type, amount, per_guest, per_bedroom, per_night}});
    setOpenBlocksDialog((prev) => !prev);
  }

  return (
    <div>
        <div className='flex items-center justify-between'>
          <Title>Addons</Title>
          <Button onClick={openBasicAddAddons}>Add</Button>
        </div>

         {payload?.add_ons?.map((addon, idx) => {
          return (
            <div className='flex items-center justify-between border rounded-lg p-4 mt-3'>
               <div className='flex flex-col gap-y-2'>
                  Name
                  <span>{addonsHashMap && addonsHashMap[addon?.id]?.name}</span>
               </div>

               <div className='flex flex-col gap-y-2'>
                  Amount Type
                  <span>{addon?.amount_type}</span>
               </div>

               <div className='flex flex-col gap-y-2'>
                  Amount
                  <span>{addon?.amount}</span>
               </div>

              <div className='flex flex-col gap-y-2'>
                {/* <span>Block Date</span> */}
                <Button onClick={() =>handleBlock(idx)}>Block</Button>
              </div>

              <div className='flex flex-col gap-y-2'>
                {/* <span>Remove</span> */}
                <Button onClick={() => handleBasicAddonsEdit(idx)}>Edit</Button>
              </div>

              <div className='flex flex-col gap-y-2'>
                {/* <span>Remove</span> */}
                <Button onClick={() => handleBasicAddonsRemove(idx)}>Remove</Button>
              </div>

            </div>
          )
         })}


         <Title As='h2' className='mt-9 mb-9'>Addons Block Pricing</Title>
         
            {payload?.add_ons?.map((addon, idx1 ) => (
             <>
              {addon?.blocks?.length > 0 && (
                <>
                 <Title className='mt-3 text-xl mb-3 font-[900]' key={idx1}>{addonsHashMap && addonsHashMap[addon?.id]?.name}</Title>
                  {addon?.blocks?.map((blocksData, idx2) => (
                      <div key={idx2} className='flex items-center justify-between border rounded-lg p-4 mb-3'>
                      <div>{blocksData?.start_date}</div>
                      <div>{blocksData?.end_date}</div>
                      <div>{blocksData?.amount_type}</div>
                      <div>{blocksData?.amount}</div>
                      {/* <div>{blocksData?.per_guest}</div>
                      <div>{blocksData?.per_night}</div>
                      <div>{blocksData?.per_bedroom}</div> */}
                      <Button onClick={() => handleEditBlock( idx1, idx2 )} >Edit</Button>
                      <Button onClick={() =>  handleBlockRemove( idx1, idx2 )}>Remove</Button>
                      </div>
                  ))}
                </>
              )}
             </>
            
         ))}

        {/* basic */}
        <Dialog closeModal={setOpenBasicAddonDialog} isOpen={openBasicAddonDialog} childrenClass='bg-white p-5 rounded-lg w-[800px]'>
            <select value={basicAddonPayload?.id} onChange={(e) => handleBasicAddonsOnChange(e, 'id')}>
               <option value=''>Choose Addon</option>
               {addons?.map((addon, idx) => {
                 return  <option key={idx} value={addon?.id}>{addon?.name}</option>
               })}
            </select>

            <select value={basicAddonPayload?.amount_type} onChange={(e) => handleBasicAddonsOnChange(e, 'amount_type')}>
               <option value=''>Choose Amount Type</option>
               <option value='flat'>Flat</option>
               <option value='percentage'>Percentage</option>
            </select>

            <CurrencyInput
              currency={payload?.currency}
              label={'Amount'}
              value={basicAddonPayload?.amount}
              onChange={(e) => handleBasicAddonsOnChange(e, 'amount')}
            />

            {toggleData.map((data, idx) => (
              <div key={idx} className='flex items-center justify-between'>
                <span>{data?.label}</span>
                <Toggle 
                  checked={basicAddonPayload[data?.value]} 
                  onChange={(check) => handleBasicAddonsToggle(check, data?.value)} 
                />
              </div>
            ))}

            <div className='flex items-center justify-between'>
              <Button onClick={handleClearBasicAddons}>Clear</Button>
              <Button onClick={handleBasicAddons}>{basicEditIndex === null ? 'Add' : 'Update'}</Button>
            </div>

        </Dialog>

        {/* blocks */}
        <Dialog closeModal={setOpenBlocksDialog} isOpen={openBlocksDialog} childrenClass='bg-white p-5 rounded-lg w-[800px]'>
           <Title>Title</Title>
           <div className='flex items-start gap-x-2'>
                <Calendar
                  startDate={blocksAddonPayload?.start_date}
                  endDate={blocksAddonPayload?.end_date}
                  setEndDate={(value) => setBlocksAddonPayload((prev) => {return {...prev, end_date: value }})}
                  setStartDate={(value) => setBlocksAddonPayload((prev) => {return {...prev, start_date: value }})}
                  daySize={60}
                  numberOfMonths={1}
                  basePrice={blocksAddonPayload?.amount}
                  weekendPrice={blocksAddonPayload?.amount}
                  currencySymbol={payload?.currencySymbol}
                />
              <div>
                  <select value={blocksAddonPayload?.amount_type} onChange={(e) => handleBlocksAddonsOnChange(e, 'amount_type')}>
                    <option value=''>Choose Amount Type</option>
                    <option value='flat'>Flat</option>
                    <option value='percentage'>Percentage</option>
                  </select>

                  <CurrencyInput
                    currency={payload?.currency}
                    label={'Amount'}
                    value={blocksAddonPayload?.amount}
                    onChange={(e) => handleBlocksAddonsOnChange(e, 'amount')}
                  />

                  {toggleData.map((data, idx) => (
                    <div key={idx} className='flex items-center justify-between'>
                      <span>{data?.label}</span>
                      <Toggle 
                        checked={blocksAddonPayload[data?.value]} 
                        onChange={(check) => handleBlocksAddonsToggle(check, data?.value)} 
                      />
                  </div>
                  ))}
              </div>
           </div>

           <div className='flex items-center justify-between'>
              <Button onClick={handleClearBlockAddons}>Clear</Button>
              <Button onClick={handleBlocksDate}>{(blocksEditIndexs?.idx1 === null && blocksEditIndexs?.idx2 === null) ? 'Apply' : 'Update'}</Button>
           </div>

        </Dialog>

    </div>
  )
}

export default Addons