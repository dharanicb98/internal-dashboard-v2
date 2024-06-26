import React from 'react'
import { useSelector } from 'react-redux'
import Checkbox from '../../ui/input/checkbox'
import Title from './title'
import Description from './description'

function Offers({payload, setPayload}) {
 const attributes = useSelector( (state) => state.attributes )
 const offers = attributes?.offers?.data

 const handleOffers = ( id ) => {
    let checkIdIndex = payload.offers.indexOf( id )

    if ( checkIdIndex === -1 ) {
        setPayload(prev => {return {...prev, offers:[...prev.offers, id]}})
    }
    else {
      let updateNewID = [...payload.offers]
      updateNewID.splice( checkIdIndex, 1 );
      setPayload(prev => {return {...prev, offers:[...updateNewID]}});
    }
 }

  return (
    <div>
        <Title>Offers</Title>
        <Description  description='Enhance your getaway by selecting from a range of special offers for your property'/>
        <div className='grid grid-cols-4 gap-6 mt-6'>
            {offers?.map((offer, idx) => (
                <div onClick={() => handleOffers(offer?.id)} key={idx} style={{borderColor: payload?.offers?.includes(offer.id) ?'black':'' }}
                    className={`border border-[#D9D9D9] flex flex-col items-center justify-center mt-2  w-[178px] h-[93px] rounded-xl relative cursor-pointer`}>
                    <span className='text-[#5C5C5C]  leading-6 text-sm font-normal'>{offer?.title}</span>
                    <Checkbox checked={payload?.offers?.includes(offer.id)} className='absolute top-4 right-3 cursor-pointer'/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Offers