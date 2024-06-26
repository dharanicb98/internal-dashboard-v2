import React, { useState, useEffect } from 'react'
import Dialog from '../../../ui/dialog'
import Toggle from '../../../ui/input/toggle'
import axios from 'axios'
import { INPUT_STYLE } from '../../../constants'


function ExtraServices({payload, setPayload}) {
  const [servicesPayload, setSericesPayload] = useState({id:'', amount_type:'',amount:'', per_guest:'', per_bedroom:'', per_night:'', blocks:[]})
  const [openDiloag, setOpenDialog] = useState(false)
  const [extraServices, setExtraServices] = useState([])

  
  const handleAddServices = () => {
    setPayload((prev) => {return {...prev, extra_services:[...prev.extra_services, servicesPayload]} })
    setSericesPayload({id:'', amount_type:'',amount:'', per_guest:'', per_bedroom:'', per_night:''})
    setOpenDialog((prev) => !prev)
  }

  const handleOnChange = (e, key) => {
    let value = e.target.value 
    setSericesPayload((prev) => {return {...prev, [key]:value}})
  }

  useEffect(() => {
    (async () => {
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/extra-services`);
        setExtraServices(response?.data?.data)
      }
      catch (e) {
       console.log('error', e)
      }
    })()
  }, [])


  return (
    <div>
        <h1>ExtraServices</h1>
        <button onClick={() => setOpenDialog((prev) => !prev)}>Add</button>
        {payload?.extra_services?.length > 0 && (
            payload.extra_services.map((service) => (
                <div className='border flex items-center justify-between p-4 rounded-lg'>
                    <span>{service?.id}</span>
                    <span>{service?.amount_type}</span>
                    <span>{service?.amount}</span>
                    <span>{service?.per_guest}</span>
                    <span>{service?.per_bedroom}</span>
                    <span>{service?.per_night}</span>
                    <button  className='bg-black text-white py-2 px-3 rounded-lg'>Edit</button>
                   <button className='bg-black text-white py-2 px-3 rounded-lg'>Remove</button>
                </div>
            ))
        )}
        <Dialog closeModal={setOpenDialog} isOpen={openDiloag} childrenClass={' bg-white p-4 rounded-md no-scrollbar dark-scrollbar'}>
            <div>
            <div className='w-[400px]'>
            <label>Addons</label>
            <select onChange={(e) => handleOnChange(e, 'id')}  className={`${INPUT_STYLE}`}>
                <option value=''>Choose Addons</option>
                {extraServices?.length > 0 && extraServices?.map((addon, idx) => (
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
               {/* <button onClick={() => setShowBlockCalendar((prev) => !prev)} className='bg-black text-white px-2 py-2 rounded-sm mt-4'>Block Dates</button> */}
            </div>

            <div className='flex items-center justify-between mt-8'>
              <button onClick={() => setOpenDialog((prev) => !prev)} className='bg-black text-white py-2 px-3 rounded-lg'>Close</button>
              <button onClick={handleAddServices} className='bg-black text-white py-2 px-3 rounded-lg'>Add</button>
            </div>
            </div>
            </div>
        </Dialog>
    </div>
  )
}

export default ExtraServices