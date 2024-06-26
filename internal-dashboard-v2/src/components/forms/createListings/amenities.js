import React, { useEffect, useState } from 'react'
import Toggle from '../../../ui/input/toggle'
import axios from 'axios';

function Step7({payload, setPayload}) {
  const [amenitiesGroup, setAmenitiesGroup] = useState([]);
  const [amenities, setAmenities] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/amenities-group`)
        setAmenitiesGroup(response.data.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    )()
  },[])

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/amenities-group/query`)
        setAmenities(response.data.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    )()
  },[])
  
  const handleAmenities = ( id ) => {
    const index = payload.amenities.indexOf(id)
    if (index === -1) {
       setPayload((prev) => {return {...prev, amenities:[...prev.amenities, id]}})
    }
    else {
      let updateData = [...payload.amenities]
      updateData.splice(index, 1)
      setPayload((prev) => {return {...prev, amenities:updateData}})
    }

  }



  


  return (
    <div>
       <h1 className='text-2xl font-semibold mb-4'>Amenities</h1>
        {amenitiesGroup && amenitiesGroup?.map(( amenitiesgroupData ) => {
          return (
            <div>
              <h2 className='text-[18px] font-bold'>{amenitiesgroupData.name}</h2>
              {amenities[amenitiesgroupData.id]?.map((amenitiesData) => {
                return (
                  <div>
                     <div className='flex items-center justify-between my-2 flex-wrap'>
                       <div className='flex items-center justify-between w-full'>
                        <p className='text-slate-600'>{amenitiesData.name}</p>
                        <Toggle checked={payload?.amenities?.includes(amenitiesData.id)} onChange={() => handleAmenities(amenitiesData.id)}/>
                       </div>
                     </div>
                  </div>
                )
              })}
            </div>
          )
        })}
    </div>
  )
}

export default Step7