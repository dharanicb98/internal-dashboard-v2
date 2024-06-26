import React, { useMemo } from 'react';
import Input from './input';
import Map from '../../ui/map';
import { INPUT_STYLE } from '../../constants'
import { useSelector } from 'react-redux';

const basicPropertyData = [
  { key: 'permalink', label: 'Permalink' },
  { key: 'title', label: 'Title' },
  { key: 'Description', label: 'Description', type: 'textarea' },
];

const locationData = [
  { key: 'house', label: 'House' , value:'address'},
  { key: 'area', label: 'area', value:'address'},
  { key: 'street', label: 'Street', value:'address' },
  { key: 'landmark', label: 'Landmark', value:'address' },
  { key: 'city', label: 'City', value:'address' },
  { key: 'pin', label: 'Pin', value:'address' },
  { key: 'location_latitude', label: 'Latitude', value:'lat-long' },
  { key: 'location_longitude', label: 'Longitude', value:'lat-long' },
];

const BasicPropertyDetails = ({ payload, setPayload }) => {

  const attributes = useSelector((state) =>  state.attributes)

  const handleOnChangeBasicPropertyDetails = (e, key) => setPayload((prev) => ({ ...prev, [key]: e.target.value }));

  const handleAdress = (e, key) => {
    let value = e.target.value;

    if (key === 'location_latitude' || key === 'location_longitude') {
      setPayload((prev) => ({ ...prev, [key]: value }));
    } 
    else {
      setPayload((prev) => ({ ...prev, address: {...prev.address, [key]: value} }));
    }
  };

  const handleOnChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      {basicPropertyData.map((data, index) => (
        <Input
          key={index}
          className='mt-6'
          label={data.label}
          value={payload[data.key]}
          onChange={(e) => handleOnChangeBasicPropertyDetails(e, data.key)}
        />
      ))}

      <div className='flex items-center justify-between'>
            <div className={`flex flex-col mt-6 w-[25%]`}>
              <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>Host</label>
              <select className={`${INPUT_STYLE} mt-1`}>
                <option>Choose Host</option>
              </select>
            </div>

            <div className={`flex flex-col mt-6 w-[25%]`}>
              <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>Listing Type</label>
              <select className={`${INPUT_STYLE} mt-1`}>
                <option>Choose Listing Type</option>
              </select>
            </div>

            <div className={`flex flex-col mt-6 w-[25%]`}>
              <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>Processing Fee</label>
              <select className={`${INPUT_STYLE} mt-1`}>
                <option>Choose Processing Fee</option>
              </select>
            </div>
      </div>

      <div className='flex justify-between items-start mt-8 h-full gap-x-3'>
        <div className='w-full'>
        
        <div className={`flex flex-col mt-6`}>
          <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>Country</label>
          <select className={`${INPUT_STYLE} mt-1`}>
            <option>Choose Country</option>
           </select>
        </div>

        <div className={`flex flex-col mt-6`}>
          <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>Region</label>
          <select className={`${INPUT_STYLE} mt-1`}>
            <option>Choose Region</option>
           </select>
        </div>

        <div className={`flex flex-col mt-6`}>
          <label className='text-[#5C5C5C] leading-6 text-lg font-normal'>Destination</label>
          <select className={`${INPUT_STYLE} mt-1`}>
            <option>Choose Destination</option>
           </select>
        </div>
       

        {locationData.map((data, index) => (
            <Input
              key={index}
              className='mt-6'
              label={data.label}
              value={ data.value === 'address' ? payload?.address[data.key] : payload[data.key]}
              onChange={(e) => handleAdress(e, data.key)}
            />
          ))}
        </div>

        <div className='h-[100%] mt-8'>
          <Map payload={payload} setPayload={setPayload}
            onChange={(value) => {
                handleOnChange('location_latitude',  value.lat);
                handleOnChange('location_longitude',  value.lng);
                handleOnChange("address", {...payload?.address, 
                    street:value?.formatted_address,
                    landmark:value?.landmark,
                    city:value?.city,
                    pin:value?.postal_code,
                    // country:value?.country,
                    // country_id: countryData?.country?.find(e => e.name == value?.country)?.id || undefined
                  });

            }
            }
           />
        </div>
      </div>
    </div>
  );
};

export default BasicPropertyDetails;
