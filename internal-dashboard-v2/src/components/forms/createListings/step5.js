import React, { useEffect, useState } from 'react'
import SelectCheckInCheckoutTime from '../../input/selectCheckInCheckout'
import axios from 'axios'
import Toggle from '../../input/toggle'
import { INPUT_STYLE } from '../../../constants'
import Checkbox from '../../input/checkbox'

function Step5({ payload, setPayload }) {
   console.log('step 5')
  const [houseRules, setHouseRules] = useState([])
 
  useEffect(() => {
    async function fetchData() {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/houserules`)
        setHouseRules(response.data.data)
    }
    fetchData()

   
  }, [])

  const handleToggle = (key) => {
     setPayload((prev) =>  {return {...prev, [key]: !prev[key]}})
  }

  const handleHouseRules = (id) => {
     const index = payload?.rules.indexOf(id)
     if (index === -1) {
        setPayload((prev) => {return {...prev, rules:[...prev.rules, id]}})
     }
     else {
        let updateIds = [...payload?.rules]
        updateIds.splice(index, 1)
        setPayload((prev) => {return {...prev, rules:[...updateIds]}})
     }
  }
  
  const handleInput = (e, type) => {
    let value = e.target.value

    switch (type) {
      case 'custom_rule':
        setPayload((prev) => {return {...prev, custom_rule:value}})
        break

      case 'wifi_network_name':
         setPayload((prev) => {return {...prev, wifi_network_name:value}})
         break

      case 'wifi_network_password':
         setPayload((prev) => {return {...prev, wifi_network_password:value}})
         break

      case 'wifi_download_speed':
         setPayload((prev) => {return {...prev, wifi_download_speed:value}})
         break
      
      case 'wifi_upload_speed':
         setPayload((prev) => {return {...prev, wifi_upload_speed:value}})
         break

      default:
        break 
     }
  }
  
  

  return (
    <>
     <h1 className='my-5'>House Rules</h1>
      <SelectCheckInCheckoutTime fromTitle={'Checkin Time'} toTitle={'Checkout Time'} setPayload={setPayload} fromKey={'check_in_time'} toKey={'check_out_time'}
       fromValue={payload?.check_in_time} 
       toValue={payload?.check_out_time}
      />

     <div className='border-[1px] border-black rounded-lg p-3 mt-3 w-[450px]'>
       <div className='flex items-center justify-between px-2'>
          <h2 className='text-slate-600'>Quick Hours</h2>
          <Toggle checked={payload?.is_quite_hours} onChange={() => handleToggle('is_quite_hours')}/>
       </div>

        <div className='mt-3'>
        <SelectCheckInCheckoutTime 
          className='w-[89%]'
          fromTitle={'From'} 
          toTitle={'To'} 
          setPayload={setPayload} 
          fromKey={'quite_hours_from'} 
          toKey={'quite_hours_to'}
          fromValue={payload?.quite_hours_from} 
          toValue={payload?.quite_hours_to}/>
          
        </div>
     </div>
     
     <h1 className='font-bold text-lg my-4'>Wifi Details</h1>
     <div className='flex justify-between'>
         <div className='w-[45%]'>
         <div className='flex flex-col'>
            <label className='text-slate-600'>Network Name</label>
            <input type="text" value={payload?.wifi_network_name} onChange={(e) => handleInput(e, 'wifi_network_name')} className={`${INPUT_STYLE}`}/>
         </div>
         <div className='flex flex-col mt-2'>
            <label className='text-slate-600'>Wifi password</label>
            <input type="text" value={payload?.wifi_network_password} className={`${INPUT_STYLE}`} onChange={(e) => handleInput(e, 'wifi_network_password')}/>
         </div>
         </div>
          
         <div className='w-[45%]'>
         <div className='flex flex-col'>
            <div>
             <p className='text-slate-600'>Download Speed</p>
             <input type="number" value={payload?.wifi_download_speed} className={`${INPUT_STYLE}`} onChange={(e) => handleInput(e, 'wifi_download_speed')}/>
             {/* <p><span className='text-3xl font-semibold'>{wifiDownloadSpeed}</span>Mbps</p> */}
            </div>

            <div className='mt-2'>
             <p className='text-slate-600'>Upload Speed</p>
             <input type="number" value={payload?.wifi_upload_speed} className={`${INPUT_STYLE}`} onChange={(e) => handleInput(e, 'wifi_upload_speed')}/>
             {/* <p><span className='text-3xl font-semibold'>{wifiUploadSpeed}</span>Mbps</p> */}
            </div>
         </div>
          {/* <button className='bg-black text-white px-6 py-2 rounded-md mt-4 cursor-pointer'>Test Internet Speed</button> */}
         </div>
     </div>

     <h2 className='my-4 font-bold text-lg'>Select House Rules</h2>
     <div className="flex items-center flex-wrap gap-x-24">
       {houseRules.map((houseRule) => (
        <div className='flex items-center my-5'>
           <Checkbox checked={payload?.rules.includes(houseRule.id)}  onChange={() => handleHouseRules(houseRule.id)} />
           <img src={`${houseRule.icon_path}`} alt={houseRule.name} className={`w-10 h-8`}/>
           <p>{houseRule.name}</p>
        </div>
       ))}
     </div>

     <div>
        <div className='flex justify-between items-center  my-4'>
          <h6>Add Custom Rule</h6>
          <Toggle checked={payload?.is_custom_rule} onChange={() => handleToggle('is_custom_rule')}/>
        </div>
        <div>
           <textarea value={payload?.custom_rule} onChange={(e) => handleInput(e, 'custom_rule')} className={`${INPUT_STYLE} h-[100px]`}/>
        </div>
     </div>

    </>
  )
}

export default Step5