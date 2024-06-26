import React, { useEffect, useState } from 'react'
import { INPUT_STYLE } from '../../../constants'
import { currencyData } from '../../../utils/common'
import Map from './map'
import axios from 'axios'
import { userTypesConstants } from '../../../constants/userConstants'

function Step1({ payload, setPayload}) {
  const [country, setCountry] = useState()
  const [region, setRegion] = useState()
  const [destination, setDestination] = useState()
  const [processingFee, setProcessingFee] = useState()
  const [hosts, setHosts] = useState()
  const [listingTypes, setListingTypes] = useState()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/attributes/list/country`
        );
        setCountry(response.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/attributes/list/regions`
        );
        setRegion(response.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/attributes/list/destinations`
        );
        setDestination(response.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

 

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/processing-fee`)
        setProcessingFee(response.data.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    )()

  },[])

  useEffect(() => {
    (async () => {
       try{
        let body = {filters : [{col:'user_role', type:'array', val:[userTypesConstants.USER_ROLE_ADMIN, userTypesConstants.USER_ROLE_HOST, userTypesConstants.USER_ROLE_CO_HOST]}]}
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/query`, body)
        setHosts(response.data)
       }
       catch (e) {
        console.log('e', e)
       }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attributes/list/listing-types`)
        setListingTypes(response.data.data)
      }
      catch (e) {
        console.log('e', e)
      }
    })()
  }, [])

  const handleInput = (e, key) => setPayload((prev) => {return {...prev, [key]:e.target.value}});

  const handleAddress = (e, key) => setPayload((prev) => {return {...prev, address: {...prev.address, [key]:e.target.value}}});
  
  const handleCurrency = (e, key) => {
    let value = e.target.value
    setPayload((prev) => {return {...prev, currency:value, currency_symbol: currencyData[value]?.symbol}})
  }

  const handleCountry = (e, name) => {
    let value = e.target.value 
    setPayload((prev) => {return {...prev, address: {...prev.address, country_id:value, country:name}}})
  }



  return (
    <div>
      {/* <center className="text-red-500 font-bold text-lg">Create Listing</center> */}
      <div className="flex flex-col mt-2">
        <label className="text-slate-500">Permalink</label>
        <input
          value={payload?.permalink}
          onChange={(e) => handleInput(e, "permalink")}
          className={`${INPUT_STYLE}`}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-slate-500">Title</label>
        <input
          value={payload?.title}
          onChange={(e) => handleInput(e, "title")}
          className={`${INPUT_STYLE} mt-2`}
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-slate-500">Description</label>
        <textarea
          value={payload?.description}
          onChange={(e) => handleInput(e, "description")}
          className={`${INPUT_STYLE} h-[100px]`}
        />

      </div>



      <div className='flex justify-between'>
        <div className='flex flex-col gap-x-5 items-start w-[100%]'>
          <div className='w-1/2'>
            <div className='flex flex-col mt-2'>
               <label className='text-slate-500'>Host</label>
               <select value={payload?.host_id} onChange={(e) => handleInput(e, 'host_id')} className={`${INPUT_STYLE} w-[50%]`}>
                  <option>Choose Host</option>
                  {hosts && hosts.map((data, idx) => {
                    return <option key={idx} value={data.id}>{data?.fname} {data?.lname}</option>
                  })}
               </select>
            </div>


            <div className='flex flex-col mt-2'>
               <label className='text-slate-500'>Country</label>
               <select onChange={(e) => handleCountry(e, 'mexico')} className={`${INPUT_STYLE} w-[50%]`}>
                <option value=''>Choose Country</option>
                {country && country.map((data, idx) => {
                  return  <option key={idx} value={data.id}>{data.name}</option>
                })}
               </select>
            </div>

            <div className='flex flex-col mt-2'>
              <label className='text-slate-500'>Region</label>
               <select onChange={(e) => handleAddress(e, 'region')} className={`${INPUT_STYLE} w-[50%]`}>
                <option value=''>Choose Region</option>
                {region && region.map((data, idx) => {
                  return <option key={idx} value={data.id}>{data.name}</option>
                })}
               </select>
            </div>

            <div className='flex flex-col mt-2'>
               <label className='text-slate-500'>Destination</label>
               <select  onChange={(e) => handleAddress(e, 'destination')} className={`${INPUT_STYLE} w-[50%]`}>
                 <option>Choose Destination</option>
                 {destination && destination.map((data, idx) => {
                   return <option key={idx} value={data.id}>{data.name}</option>
                 })}
               </select>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>House</label>
             <input onChange={(e) => handleAddress(e, 'house')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>Area</label>
             <input onChange={(e) => handleAddress(e, 'area')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>Street</label>
             <input onChange={(e) => handleAddress(e, 'street')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>Landmark</label>
             <input onChange={(e) => handleAddress(e, 'landmark')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>City</label>
             <input onChange={(e) => handleAddress(e, 'city')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>Pin</label>
             <input onChange={(e) => handleAddress(e, 'pin')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
              <label className='text-slate-500'>Latitude</label>
              <input onChange={(e) => handleAddress(e, 'location_latitude')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
              <label className='text-slate-500'>Longitude</label>
              <input onChange={(e) => handleAddress(e, 'location_longitude')} className={`${INPUT_STYLE} w-[50%]`}/>
            </div>

            <div className='flex flex-col mt-2'>
          <label className='text-slate-500'>Currency</label>
          <select onChange={(e) => handleCurrency(e, 'currency')} className={`${INPUT_STYLE} w-[50%]`}>
            <option value="">Choose Currency</option>
            {Object.keys(currencyData).map((currency, index) => (
                <option key={index} value={currency}>{currencyData[currency]?.symbol} - {currency}</option>
            ))}
          </select>
            </div>

            <div>
              <label className='text-slate-500'>Listing Type</label>
              <select value={payload?.listing_type} onChange={(e) => handleInput(e, 'listing_type')} className={`${INPUT_STYLE} w-[50%]`}>
                <option value=''>Choose listing Type</option>
                {listingTypes && listingTypes?.map((data, idx) => {
                  return <option key={idx} value={data.id}>{data?.name}</option>
                })}
              </select>
            </div>

            <div className='flex flex-col mt-2'>
             <label className='text-slate-500'>Processing Fee</label>
             <select value={payload?.processing_fee} onChange={(e) => handleInput(e, 'processing_fee')} className={`${INPUT_STYLE} w-[50%]`}>
              <option value="">Choose Processing Fee</option>
              {processingFee && processingFee?.map((fee, index) => {
                return <option key={index} value={fee.id}>{fee?.name}</option>
              })}
             </select>
            </div>

          </div>
        </div>

        {/* Map */}
        <div>
          <Map />
        </div>
       </div>


      </div>
   
  );
}

export default Step1;
