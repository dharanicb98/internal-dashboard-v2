import React, { useEffect, useState } from 'react'
import { getOffers } from '../../../services/offersServices'
import Checkbox from '../../../ui/input/checkbox'

function Offers({payload, setPayload}) {
   const [offers, setOffers] = useState()

   useEffect(() => {
     (async () => {
        try{
          const response = await getOffers();
          setOffers(response.data.data)
        }
        catch (e) {
            console.log(e)
        }
     })()
   }, [])


   const handleOffers = ( id ) => {
     const index = payload.offers.indexOf( id )

    if (index === -1) {
        setPayload((prev) =>  {return {...prev, offers:[...prev.offers, id]}})
    }
    else {
        let updateData = [...payload.offers]
        updateData.splice(index, 1)
        setPayload((prev) =>  {return {...prev, offers:updateData}})
    }

   }

  return (
    <div>
        <h1 className='text-2xl font-semibold mb-4'>Offers</h1>
        <div className='flex items-center flex-wrap gap-x-10'>
            {offers && offers.map((offer, idx) => {
                return (
                    <div onClick={() => handleOffers(offer.id)} key={idx} style={{border: payload?.offers?.includes(offer.id) ?'1px solid black':'' }} className={`relative border border-slate-200 w-[200px] h-[90px] my-2 rounded-md flex items-center justify-center`}>
                        <p className='text-sm'>{offer.title}</p>
                        <Checkbox className='absolute top-2 right-2 cursor-pointer' checked={payload?.offers.includes(offer.id)} onChange={() => handleOffers(offer.id)}/>
                    </div>
                )
            })}
        </div>

        {/* <h2>Processing Fee</h2> */}

    </div>
  )
}

export default Offers