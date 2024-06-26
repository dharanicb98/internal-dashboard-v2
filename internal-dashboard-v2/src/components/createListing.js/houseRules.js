import React from 'react'
import { useSelector } from 'react-redux'
import SelectCheckInCheckoutTime from '../input/selectCheckInCheckout'
import Toggle from '../../ui/input/toggle'
import Input from './input'
import Checkbox from '../../ui/input/checkbox'
import { INPUT_STYLE } from '../../constants'

const wifiData = [
    {label:'Network Name', key:'wifi_network_name'},
    {label:'Wifi password', key:'wifi_network_password'},
    {label:'Download Speed', key:'wifi_download_speed'},
    {label:'Upload Speed', key:'wifi_upload_speed'}
]

function HouseRules({payload, setPayload}) {
 const attributes = useSelector((state) => state.attributes)

 const houseData = attributes?.houseRules?.data


 const handleInput = (e, key) => {
    let value = e.target.value 
    setPayload((prev) => {return {...prev, [key]:value}})
 }

 const handleToggle= ( check, key ) => {
    setPayload((prev) => {return {...prev, [key]:check}})
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

 console.log('payload', payload)

  return (
    <div>
        <h1 className='leading-[38.73px] text-[32px] font-medium'>House Rules</h1>
        <div className='mt-3'><span className='text-[#000000] leading-6 text-xl font-normal'>Easily set your check-in and checkout times to match your preferences, customizing your stay with simplicity</span></div>
        
        <div className='grid grid-cols-2 gap-2 mt-10'>
            <div className='rounded-lg p-3 w-[450px] bg-[#F4F4F4]'>
                <div className='flex items-center justify-between px-2'>
                    <h2 className='text-slate-600'>Quick Hours</h2>
                    <Toggle checked={payload?.is_quite_hours} onChange={(check) => handleToggle(check, 'is_quite_hours')}/>
                </div>

                <div className='mt-3'>
                    <SelectCheckInCheckoutTime 
                    className='w-[89%] bg-white'
                    fromTitle={'From'} 
                    toTitle={'To'} 
                    setPayload={setPayload} 
                    fromKey={'quite_hours_from'} 
                    toKey={'quite_hours_to'}
                    fromValue={payload?.quite_hours_from} 
                    toValue={payload?.quite_hours_to}/>
                    
                </div>
            </div>

            <div>
                <SelectCheckInCheckoutTime 
                fromTitle={'Checkin Time'} 
                toTitle={'Checkout Time'} 
                setPayload={setPayload} 
                fromKey={'check_in_time'} 
                toKey={'check_out_time'}
                fromValue={payload?.check_in_time} 
                toValue={payload?.check_out_time}
                />
            </div>
        </div>

        <div className='mt-16'><span className='text-[#000000] leading-6 text-xl font-normal'>As a user, effortlessly set up your WiFi by entering details for a smooth and personalized connection with preferred download/upload speeds.</span></div>

        <div className='grid grid-cols-2 gap-3 mt-5'>
            {wifiData?.map((data, idx) => {
                return (
                <Input 
                 key={idx} label={data.label}
                 value={payload[data.key]} onChange={(e) => handleInput(e, data.key)} />
                )
            })}
        </div>
        
       <div className='mt-16'><span className='text-[#000000] leading-6 text-xl font-normal'>Select from straightforward guidelines to ensure a comfortable and enjoyable stay at your rentals</span></div>
        <div className="grid grid-cols-3 gap-5 mt-2">
            {houseData?.map((houseRule) => (
              <div className='flex items-center'>
                <Checkbox checked={payload?.rules.includes(houseRule.id)} onChange={() => handleHouseRules(houseRule.id)}/>
                <img src={`${houseRule.icon_path}`} alt={houseRule.name} className={`w-10 h-8`}/>
                <p  className='text-[#5C5C5C]  leading-6 text-base font-normal'>{houseRule.name}</p>
              </div>
            ))}
        </div>

       <div className='mt-16'><span className='text-[#000000] leading-6 text-xl font-normal'>Set specific rules for your stay, ensuring a unique and comfortable experience</span></div>
        <div className='mt-3 bg-[#F4F4F4] p-5 rounded-lg'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-[#5C5C5C] leading-6 text-base font-normal'>Add Custom Rule</span>
            <Toggle checked={payload?.is_custom_rule} onChange={(check) => handleToggle(check, 'is_custom_rule')} />
          </div>

        <div><textarea value={payload?.custom_rule} onChange={(e) => handleInput(e, 'custom_rule')}  className={`${INPUT_STYLE} h-[100px]`}/> </div>
     </div>

    </div>
  )
}

export default HouseRules