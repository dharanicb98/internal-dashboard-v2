import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Dialog from '../../../ui/dialog'
import { INPUT_STYLE } from '../../../constants'
import Toggle from '../../../ui/input/toggle'
import Calendar from '../../../ui/calender'

function LongTermDiscount({payload,  setPayload}) {
  const [addons, setAddons] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [showBlocksCalendar, setShowBlockCalendar] = useState(false)
  const [addonsPayload, setAddonsPayload] = useState({ id:'',amount_type:'',  amount:'',  per_night:'', per_guest:'', per_bedroom:'', blocks:[]})



  useEffect(() => {
    (async () => {
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/addons`);
        setAddons(response?.data?.data)
      }
      catch (e) {
       console.log('error', e)
      }
    })()
  }, [])

  const handleAddBasicAddons = () => {
    setPayload((prev) =>  {return {...prev, add_ons:[...prev.add_ons, addonsPayload]}})
    setAddonsPayload({ id:'',amount_type:'',  amount:'',  per_night:'', per_guest:'', per_bedroom:'', blocks:[]})
    // close dialog box
    setShowDialog((prev) => !prev)
  }

  const handleEdit = () => {
    setShowDialog((prev) => !prev)
  }

  const handleOnChange = ( e, key) => {
    let value = e.target.value 
    setAddonsPayload((prev) => { return {...prev, [key]:value}})
  }



  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Addons</h1>
        <button onClick={() => setShowDialog((prev) => !prev)}>Add+</button>
      </div>

      <div className='mt-4'>
        {payload?.add_ons?.length > 0 && (
           payload.add_ons.map((addons, idx) => (
            <div key={idx} className='border border-black flex items-center justify-between rounded-md p-4 mt-6'>
              <div>{addons?.id}</div>
              <div> {addons?.amount}</div>
              <div>{addons?.amount_type}</div>
              <div>{addons?.per_night}</div>
              <div>{addons?.per_guest}</div>
              <div>{addons?.per_bedroom}</div>
              <button onClick={() => handleEdit()} className='bg-black text-white py-2 px-3 rounded-lg'>Edit</button>
              <button className='bg-black text-white py-2 px-3 rounded-lg'>Remove</button>
            </div>
           ))
        )}
      </div>



      
      <Dialog closeModal={setShowDialog} isOpen={showDialog} childrenClass={' bg-white p-4 rounded-md no-scrollbar dark-scrollbar'}>
         <div className='flex items-start gap-x-3'>

            <div className='w-[400px]'>
            <label>Addons</label>
            <select onChange={(e) => handleOnChange(e, 'id')}  className={`${INPUT_STYLE}`}>
                <option value=''>Choose Addons</option>
                {addons?.length > 0 && addons?.map((addon, idx) => (
                  <option key={idx} value={addon.id}>{addon.name}</option>
                ))}
            </select>

            <div className='mt-6'>
              <label>Amount Type</label>
                <select onChange={(e) => handleOnChange(e, 'amount_type')} className={`${INPUT_STYLE}`}>
                  <option value=''>Choose Type</option>
                  <option value='flat'>Flat</option>
                  <option value='percentage'>Percentage</option>
                </select>
            </div>

            <div className='mt-6'>
              <label>Amount</label>
              <input onChange={(e) => handleOnChange(e, 'amount')} className={`${INPUT_STYLE}`}/>
            </div>

            <div className='flex items-center justify-between mt-6'>
              <label>Per Guest</label>
              <Toggle onChange={(e) => handleOnChange(e, 'per_guest')} />
            </div>

            <div className='flex items-center justify-between mt-6'>
              <label>Per Night</label>
              <Toggle onChange={(e) => handleOnChange(e, 'per_night')} />
            </div>

            <div className='flex items-center justify-between mt-6'>
              <label>Per Bedroom</label>
              <Toggle onChange={(e) => handleOnChange(e, 'per_bedroom')}/>
            </div>

            <div className='flex justify-end'>
               <button onClick={() => setShowBlockCalendar((prev) => !prev)} className='bg-black text-white px-2 py-2 rounded-sm mt-4'>Block Dates</button>
            </div>

            <div className='flex items-center justify-between mt-8'>
              <button onClick={() => setShowDialog((prev) => !prev)} className='bg-black text-white py-2 px-3 rounded-lg'>Close</button>
              <button onClick={handleAddBasicAddons} className='bg-black text-white py-2 px-3 rounded-lg'>Add</button>
            </div>
            </div>
            

            {showBlocksCalendar && (
              <div className='w-[400px]'>
                <Calendar/>
              </div>
            )}
            
           
         </div>
      </Dialog>
      
    </div>
  )
}

export default LongTermDiscount