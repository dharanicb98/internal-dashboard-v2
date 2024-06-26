import React, { useState } from 'react'
import Title from './title'
import Button from './button'
import { useSelector } from 'react-redux'
import Dialog from '../../ui/dialog'
import Toggle from '../input/toggle'
import Calendar from '../../ui/calender'
import CurrencyInput from '../../ui/input/currenyInput'
import { formatBlocksFormat, formatCalendarFormat } from '../../utils/common'


const toggleData = [
  {label:'Per Night', value:'per_night'},
  {label:'Per Guest', value:'per_guest'},
  {label:'Per Bedroom', value:'per_bedroom'},

]

function ExtraServices( { payload, setPayload } ) {
  //basic states
  const [basicServicesPayload, setBasicServicesPayload] = useState({id:'', amount_type:'', per_guest:false, per_bedroom:false, per_night:false, amount:0})
  const [showBasicServiceDialog, setShowBasicServiceDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [blockId, setBlockId] = useState( null )

  //block states 
  const [showBlocksServiceDialog, setShowBlocksServiceDialog] = useState(false)
  const [blocksServicePayload, setBlocksServicePayload] = useState({start_date:null, end_date:null,  amount_type:'', per_guest:false, per_bedroom:false, per_night:false, amount:0});
  const [blockEditIndexs, setBlocksEditIndexs] = useState({idx1:null, idx2:null});

  const attributes = useSelector(( state ) =>  state.attributes )
  const extraServices = attributes?.extraServices?.data 
  const extraServicesHashMap = attributes?.extraServices?.hashMap

  //format dates 
  const blocksDateFormat = ( date ) => formatBlocksFormat(date) 
  const calendarDateFormat = ( date ) => formatCalendarFormat( date )

  //basic 
  const handleBasicOnChange = ( e, key ) => {
    let value = e.target.value 
    setBasicServicesPayload((prev) => {return {...prev, [key]:value}})
  }

  const handleBasicToggle = (check, key) => {
    setBasicServicesPayload((prev) => {return {...prev, [key]:check}})
  }

  const handleBasicClear = () => {
   setBasicServicesPayload({id:'', amount_type:'', per_guest:false, per_bedroom:false, per_night:false, amount:0})
  }

  const handleBasicServices =  () => {
    
    if (editIndex === null) {
      //create entry
      setPayload((prev) => {return {...prev, extra_services:[...prev.extra_services, basicServicesPayload]}})
    }
    else {
      //update entry
      let data = [...payload.extra_services]
      data[editIndex] = {...basicServicesPayload};
      setPayload((prev) => {return {...prev, extra_services:data}})
    }

    setBasicServicesPayload({id:'', amount_type:'', per_guest:false, per_bedroom:false, per_night:false, amount:0})
    setShowBasicServiceDialog((prev) => !prev)
    setEditIndex(null)
   
  }

  const handleRemoveBasicServices = ( idx ) => {
    let servicesData = [...payload?.extra_services]
    servicesData.splice(idx, 1 )
    setPayload((prev) => {return {...prev, extra_services:servicesData}})
  }

  const handleBasicEdit = ( idx ) => {
    const data = [...payload.extra_services]
    const { id, amount_type, amount, per_guest, per_bedroom, per_night, blocks } = data[idx]
    setBasicServicesPayload({id, amount_type, amount, per_guest, per_bedroom, per_night, blocks})
    setShowBasicServiceDialog((prev) => !prev);
    setEditIndex( idx )
  }

  const showBlocksDialog = ( idx ) => {
    setBlockId(idx)
    setShowBlocksServiceDialog((prev) => !prev)
  }
   

  //blocks
  const handleBlocksOnChange = (e, key) => {
    let value = e.target.value
    setBlocksServicePayload((prev) => {return {...prev, [key]: value}})
  }

  const handleBlocksToggle = (check , key) => {
    setBlocksServicePayload((prev) => {return {...prev, [key]: check}})
  }

  const handleClearBlocks = () => {
    setBlocksServicePayload({start_date:null, end_date:null, amount_type:'', per_guest:false, per_bedroom:false, per_night:false, amount:0})
  }

  const handleBlockServices = () => {
    let extraServices = [...payload.extra_services];
    let startDate = blocksDateFormat(blocksServicePayload.start_date)
    let endDate = blocksDateFormat(blocksServicePayload.end_date)

    if ( blockEditIndexs?.idx1 === null && blockEditIndexs.idx2 === null ) {
        extraServices[blockId] = {...extraServices[blockId], blocks: [...extraServices[blockId].blocks, { start_date:startDate, end_date:endDate, 
          amount:blocksServicePayload.amount, amount_type:blocksServicePayload.amount_type, per_night:blocksServicePayload.per_night, 
          per_guest:blocksServicePayload.per_guest, per_bedroom:blocksServicePayload.per_bedroom }]}
    }
    else {
       extraServices[blockEditIndexs.idx1].blocks[blockEditIndexs.idx2] = {
        start_date:startDate, 
        end_date:endDate, 
        amount:blocksServicePayload.amount, 
        amount_type:blocksServicePayload.amount_type, 
        per_night:blocksServicePayload.per_night, 
        per_guest:blocksServicePayload.per_guest, 
        per_bedroom:blocksServicePayload.per_bedroom
       }
    } 

    setPayload((prev) => {return {...prev, extra_services:extraServices}})
    setShowBlocksServiceDialog((prev) => !prev);
    setBlocksEditIndexs({idx1:null, idx2:null});
    setBlockId( null )
    setBlocksServicePayload({start_date:null, end_date:null, id:'', amount_type:'', per_guest:false, per_bedroom:false, per_night:false, amount:0})


  }

  const handleBlocksEdit = ( idx1, idx2 ) => {
    const services = [...payload.extra_services]
    const {start_date, end_date, amount_type, amount, per_night, per_guest, per_bedroom} = services[idx1].blocks[idx2]
    const startDate = formatCalendarFormat( start_date );
    const endDate = formatCalendarFormat( end_date );
    setBlocksServicePayload({start_date:startDate, end_date: endDate, amount_type, amount, per_night, per_guest, per_bedroom});
    setBlocksEditIndexs({idx1, idx2});
    setShowBlocksServiceDialog((prev) => !prev);
  }

  const handleBlocksRemove = ( idx1, idx2 ) => {
    const services = [...payload.extra_services]
    services[idx1].blocks.splice( idx2, 1 )
    setPayload((prev) => {return {...prev, extra_services:services}})
  }

  return (
    <div>
        <div className='flex items-center justify-between'>
          <Title>Extra Services</Title>
          <Button onClick={() => setShowBasicServiceDialog((prev) => !prev)}>Add</Button>
        </div>

        {payload?.extra_services?.map((services, idx) => (
          <div key={idx} className='flex items-start justify-between border p-4 rounded-lg mt-4'>
              <div className='flex flex-col'>
                <span>Id</span>
                <span>{services?.id}</span>
              </div>

              <div className='flex flex-col'>
                <span>Amount Type</span>
                <span>{services?.amount_type}</span>
              </div>

              <div className='flex flex-col'>
                <span>Amount</span>
                <span>{services?.amount}</span>
              </div>

              <Button onClick={() => showBlocksDialog(idx)}>Block</Button>
              <Button onClick={() => handleBasicEdit( idx )}>Edit</Button>
              <Button onClick={() => handleRemoveBasicServices(idx)}>Delete</Button>
              
          </div>
        ))}
        
        {payload?.extra_services?.map((service, idx1) => (
           service?.blocks?.length > 0 && (
            <div key={idx1}>
              <Title>{service?.id}</Title>
              {service?.blocks?.map((block, idx2) => (
                <div key={idx2} className='flex items-center justify-between p-4 border rounded-lg'>
                     <div className='flex flex-col '>
                       <span>Start Date</span>
                       <span>{block?.start_date}</span>
                     </div>
                     <div className='flex flex-col '>
                       <span>End Date</span>
                       <span>{block?.end_date}</span>
                     </div>

                     <div className='flex flex-col '>
                       <span>Amount Type</span>
                       <span>{block?.amount_type}</span>
                     </div>

                     <div className='flex flex-col '>
                       <span>Amount</span>
                       <span>{block?.amount}</span>
                     </div>

                     <Button onClick={() => handleBlocksEdit(idx1, idx2)}>Edit</Button>

                     <Button onClick={() => handleBlocksRemove(idx1, idx2)}>Delete</Button>

                </div>
              ))}
            </div>
           )
        ))}




        <Dialog closeModal={setShowBasicServiceDialog} isOpen={showBasicServiceDialog} childrenClass='bg-white w-[400px] p-4 flex flex-col'>
               <select value={basicServicesPayload?.id} onChange={(e) => handleBasicOnChange(e, 'id')}>
                 <option value=''>Choose Service</option>
                 {extraServices?.map((data, idx) => (
                  <option key={idx} value={data?.id}>{data?.name}</option>
                 ))}
               </select>

               <select value={basicServicesPayload?.amount_type} onChange={(e) => handleBasicOnChange(e, 'amount_type')}>
                  <option value=''>Choose Option</option>
                  <option value='flat'>Flat</option>
                  <option value='percentage'>Percentage</option>
               </select>

               <CurrencyInput
                 currency={payload?.currency}
                 label={'Amount'}
                 value={basicServicesPayload?.amount}
                 onChange={(e) => handleBasicOnChange(e, 'amount')}
               />

               

               {toggleData.map((data, idx) => (
                    <div key={idx} className='flex items-center justify-between'>
                      <span>{data?.label}</span>
                      <Toggle 
                        checked={basicServicesPayload[data?.value]} 
                        onChange={(check) => handleBasicToggle(check, data?.value)} 
                      />
                  </div>
                  ))}
             
            <div className='flex items-center justify-between mt-2'>
              <Button onClick={handleBasicClear} >Clear</Button>
              <Button onClick={handleBasicServices}>{editIndex === null ?  'Add' : 'Update'}</Button>

            </div>

        </Dialog>


        <Dialog closeModal={setShowBlocksServiceDialog} isOpen={showBlocksServiceDialog} childrenClass='bg-white w-[800px] p-4'>
              <Title>Title</Title>
              <div className='flex'>
                <Calendar
                  startDate={blocksServicePayload?.start_date}
                  endDate={blocksServicePayload?.end_date}
                  setEndDate={(value) => setBlocksServicePayload((prev) => {return {...prev, end_date: value }})}
                  setStartDate={(value) => setBlocksServicePayload((prev) => {return {...prev, start_date: value }})}
                  daySize={60}
                  numberOfMonths={1}
                  basePrice={blocksServicePayload?.amount}
                  weekendPrice={blocksServicePayload?.amount}
                  currencySymbol={payload?.currencySymbol}
                />

                <div>
                    <select value={blocksServicePayload?.amount_type} onChange={(e) => handleBlocksOnChange(e, 'amount_type')}>
                      <option value=''>Choose Option</option>
                      <option value='flat'>Flat</option>
                      <option value='percentage'>Percentage</option>
                    </select>

                    <CurrencyInput
                        currency={payload?.currency}
                        label={'Amount'}
                        value={blocksServicePayload?.amount}
                        onChange={(e) => handleBlocksOnChange(e, 'amount')}
                    />

                    {toggleData.map((data, idx) => (
                      <div key={idx} className='flex items-center justify-between'>
                        <span>{data?.label}</span>
                        <Toggle 
                          value={blocksServicePayload[data?.value]} 
                          onChange={(check) => handleBlocksToggle(check, data?.value)} 
                        />
                      </div>
                    ))}

                    <div>
                      <Button onClick={handleClearBlocks}>Clear</Button>
                      <Button onClick={handleBlockServices}>{(blockEditIndexs?.idx1 === null && blockEditIndexs?.idx2) ? 'Block': 'Update'}</Button>
                    </div>

                </div>

              </div>
        </Dialog>

    </div>
  )
}

export default ExtraServices