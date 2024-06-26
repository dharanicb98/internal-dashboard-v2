import React, { useState } from 'react'
import { currencyData } from '../../../utils/common';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6'; 
import axios from 'axios';
import Step7 from './amenities';
import Step8 from './step8';
import LongTermDiscount from './longTermDiscount';
import Offers from './offers';
import ExtraServices from './extraServices';
import Step12 from './step12';

function CreateListings() {
  const [stepper, setStepper] = useState(1)
  const [payload, setPayload] = useState({
    permalink:'',
    title:'',
    description:'',
    address:{ country:'', country_id:'', region:'', destination:'', house:'', area:'', street:'', landmark:'', city:'', pin:''},
    location_latitude:'',
    location_longitude:'',
    currency:'',
    currency_symbol:'',
    is_custom_rule:false,
    custom_rule:'',
    check_in_time:'12:00 AM',
    check_out_time:'12:00 AM',
    is_quite_hours:false,
    quite_hours_from:'12:00 AM',
    quite_hours_to:'12:00 AM',
    rules:[],
    categories:[],
    offers:[],
    add_ons:[],
    amenities:[],
    extra_services:[],
    long_term_discount:[],
    no_of_guests_max:0,
    no_of_bedrooms_max:0,
    no_of_beds_max:0,
    no_of_washroom_max:0,
    max_allowed_guests:0,
    max_free_guests:0,
    max_bookings_days:0,
    no_of_pets_allowed:0,
    price_per_additional_guest:0,
    is_self_checkin:false,
    is_instant_book:false,
    wifi_network_name:'',
    wifi_network_password:'',
    wifi_upload_speed:0,
    wifi_download_speed:0,
    extra_guests: {max_free:0, additional_cost:0, blocks:[]},
    reservation_length: {min_days:0, max_days: 0, blocks:[]},
    basic_pricing:{ base_price: 0, weekend_price: 0, security_deposit: 0, blocks: []},
    guests: {children: 0, adults: 0, infants: 0},
    processing_fee:'',
    host_id:'',


  })

  const handleNext = () => {
    if (stepper > 0 && stepper < 13) setStepper((prev) => prev + 1);
  }

  const handleBack = () => {
    if (stepper > 1 ) setStepper((prev) => prev - 1)
  }

  const handleInput = (e, type) => {
    let value = e.target.value

    switch (type) {
      case 'is_custom_rule':
        setPayload((prev) => {return {...prev, is_custom_rule: !prev.is_custom_rule}})
        break

      case 'custom_rule':
        setPayload((prev) => {return {...prev, custom_rule:value}})
        break
      
      case 'check_in_time':
        setPayload((prev) => {return {...prev, check_in_time:value}})
        break

      case 'check_out_time':
        setPayload((prev) => {return {...prev, check_out_time:value}})
        break

      case 'is_quite_hours':
        setPayload((prev) => {return {...prev, is_quite_hours: !prev.is_quite_hours}})
        break

      case 'quite_hours_from':
        setPayload((prev) => {return {...prev, quite_hours_from:value}})
        break

      case 'quite_hours_to':
        setPayload((prev) => {return {...prev, quite_hours_to:value}})
        break
      
      case 'rules':
        setPayload((prev) => {return {...prev, rules:[...value]}})
        break 

      default:
        break 
     }
  }

  const handlePublish = async () => {
    try {
      // const response = await axios.post('https://rentmyhotel.com/be/api/v2/listing/new', payload)
    }
    catch (e) {
      console.log(e)
    }
  }


  
  return (
    <div className='flex flex-col justify-between h-full'>
        <div>
          {stepper === 1 && <Step1 handleInput={handleInput} payload={payload} setPayload={setPayload} />}
          {stepper === 2 && <Step2 handleInput={handleInput} payload={payload} setPayload={setPayload} />}
          {stepper === 3 && <Step3 handleInput={handleInput} payload={payload} setPayload={setPayload} />}
          {stepper === 4 && <Step4 handleInput={handleInput} payload={payload} setPayload={setPayload} />}
          {stepper === 5 && <Step5 handleInput={handleInput} payload={payload} setPayload={setPayload}/>}
          {stepper === 6 && <Step6 handleInput={handleInput} payload={payload} setPayload={setPayload}/>}
          {stepper === 7 && <Step7 handleInput={handleInput} payload={payload} setPayload={setPayload}/>}
          {stepper === 8 && <Step8 handleInput={handleInput} payload={payload} setPayload={setPayload}/>}
          {stepper === 9 && <LongTermDiscount payload={payload} setPayload={setPayload}/>}
          {stepper === 10 && <ExtraServices payload={payload} setPayload={setPayload}/>}
          {stepper === 11 && <Offers payload={payload} setPayload={setPayload} />}
          {stepper === 12 && <Step12 payload={payload} setPayload={setPayload}/>}
        </div>

        <div className='py-5 flex items-center justify-between  my-10'>
          <button className='bg-black text-white px-4 py-2 rounded-md cursor-pointer' onClick={handleBack}>Back</button>
          {stepper === 13 ? 
          <button className='bg-black text-white px-4 py-2 rounded-md cursor-pointer' onClick={handlePublish}>Publish</button> : 
          <button className='bg-black text-white px-4 py-2 rounded-md cursor-pointer' onClick={handleNext}>Next</button>}
        </div>

    </div>
  )
}

export default CreateListings