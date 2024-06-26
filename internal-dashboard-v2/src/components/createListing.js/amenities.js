import React from 'react'
import { useSelector } from 'react-redux'
import Toggle from '../../ui/input/toggle';

function Amenities({payload, setPayload}) {
  const amenities = useSelector((state) => state.attributes.amenitiesQuery);
  const amenitiesGroup = useSelector((state) => state.attributes.amenitiesGroup)

 
  const handleAmenities = ( id ) => {
    const index = payload.amenities.indexOf( id )

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
        <h1 className='leading-[38.73px] text-[32px] font-medium'>Amenities</h1>
        <div className='mt-3'><span className='text-[#000000] leading-6 text-xl font-normal mt-3'>Personalize your listing with unique amenities, highlighting your property's exceptional comforts for an unparalleled guest experience</span></div>
        {amenitiesGroup?.data && amenitiesGroup.data.map(( amenitiesgroupData ) => {
          return (
            <div className='mt-8'>
              <h2 className='leading-6 font-medium text-lg'>{amenitiesgroupData?.name}</h2>
              <div className='grid grid-cols-2 gap-3'>
                {amenities.data[amenitiesgroupData.id]?.map((amenitiesData) => {
                 return (
                        <div className='flex items-center justify-between my-2 pl-2 pr-8'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center gap-x-1'>
                            <img src={amenitiesData?.icon_path} className='w-6 h-5'/>
                            <p className='text-[#5C5C5C]  leading-6 text-base font-normal'>{amenitiesData?.name}</p>
                            </div>
                            <Toggle checked={payload?.amenities?.includes(amenitiesData.id)} onChange={(check) => handleAmenities( amenitiesData.id, check)}/>
                        </div>
                        </div>
                )})}
              </div>
              <hr className='mt-6 border-[#D9D9D9]'/>
            </div>
          )
        })}
    </div>
  )
}

export default Amenities