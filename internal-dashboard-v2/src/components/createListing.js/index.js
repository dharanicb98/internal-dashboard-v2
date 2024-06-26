import React,{ useState} from 'react'
import Button from './button'
import BasicPropertyDetails from './basicPropertyDetails'
import Step2 from './step2'
import Categories from './categories'
import Amenities from './amenities'
import HouseRules from './houseRules'
import Photos from './photos'
import BasicPricing from './basicPricing'
import ExtraGuests from './extraGuests'
import ReservationLength from './reservationLength'
import Offers from './offers'
import Addons from './addons'
import LongTermDiscounts from './longTermDiscounts'
import ExtraServices from './extraServices'
import { createListing, updateListing } from '../../services/listingsServices'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loaderStart, loaderSuccess, error } from '../../store/reducers/loaderSlice'

function CreateListing({isDefault=true, payload, setPayload, params=''}) {
  const [stepper, setStepper] = useState( 5 );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = [ 
    {value: 0, component:<BasicPropertyDetails payload={payload} setPayload={setPayload}/>},
    {value:1, component: <Step2 payload={payload} setPayload={setPayload} />},
    {value:2, component: <Categories payload={payload} setPayload={setPayload}/>},
    {value:3, component: <Amenities payload={payload} setPayload={setPayload}/> },
    {value:4, component: <HouseRules payload={payload} setPayload={setPayload}/> },
    {value:5, component: <Photos payload={payload} setPayload={setPayload}/> },
    {value:6, component: <BasicPricing payload={payload} setPayload={setPayload}/>},
    {value:7, component: <ExtraGuests payload={payload} setPayload={setPayload}/>},
    {value:8, component: <ReservationLength payload={payload} setPayload={setPayload}/>},
    {value:9, component: <Offers payload={payload} setPayload={setPayload}/>},
    {value:10, component: <Addons payload={payload} setPayload={setPayload}/> },
    {value:11, component: <LongTermDiscounts payload={payload} setPayload={setPayload}/>},
    {value:12, component: <ExtraServices payload={payload} setPayload={setPayload}/>}
  ]

  const handleNext = () => {
    if ( stepper === tabs.length) {
        //publish
        handlePublish()
    }
    else {
      //next
        setStepper((prev) => prev + 1)
    }
  }

  const handlePublish = async () => {
    try {

      if ( isDefault ) {
        dispatch(loaderStart())
        const create = await createListing( payload )
        dispatch(loaderSuccess())
        console.log('create listing', create)
        navigate('/listings')
      }
      else {
        if ( params ) {
          dispatch(loaderStart())
          const update = await updateListing(params, payload)
          dispatch(loaderSuccess())
          console.log('update listing', update)
        }
      }
    }
    catch ( err ) {
       console.log('error in apis')
    }
  }

  const handleBack = () => {
    if ( stepper <= tabs.length ) {
        setStepper((prev) => prev - 1)
    }
    return
  }


  return (
    <div className=''>
        <div className='flex items-center justify-between'>
          {/* <h1 className='text-[#000000] leading-9 text-2xl font-medium'>{!isDefault ? 'Create Listing' : 'Update Listing'}</h1> */}
          {/* <Button onClick={handleNext}>Next</Button> */}
        </div>

        {tabs.map((tab, idx) => {
          return (
            <div key={idx} className={`${tab.value === stepper ? 'block' : 'hidden'}`}>
            {tab.component}
         </div>
          )
        })}
        
        <div  className='flex items-center justify-between  my-10 '>
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>{tabs.length === stepper ? 'Publish': 'Next'}</Button>
        </div>
    </div>
  )
}

export default CreateListing