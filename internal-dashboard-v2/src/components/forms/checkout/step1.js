import React, { useEffect, useState } from 'react'
import { getListingId } from '../../../services/checkoutServices';
import Input from '../../popup/Input';
import { currencyData } from '../../../utils/common';
import Button from '../../button';
import { INPUT_STYLE } from '../../../constants';
import Calendar from '../../../ui/calender';
import SelectDropdown from '../../dropdown/ index';
import Guests from './guests';
import Services from './services';


const Step1 = ({ payload, setPayload }) => {
    const [data, setData] = useState([]);
    const [addonsList, setAddonsList] = useState([])


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await getListingId();
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (item) => {
        let addonsList = data.filter(each => (each.listing_id === item))[0].add_ons
        setPayload({ ...payload, listing_id: item })
        setAddonsList(addonsList ? [...addonsList] : [])
    }

    let ListingId = data.map((each) => {
        const { title, listing_id } = each;
        return { value: title, id: listing_id };
    });

    return (
        <div className='px-4 py-4'>
            <h1 className='text-gray-900 text-[18px] mb-4 font-bold'>STEP-1</h1>
            <div className="flex gap-2">
                <SelectDropdown
                    options={ListingId}
                    onChange={(item) => handleChange(item)}
                    placeholder='Search Items'
                    label={"Listing ID"}
                    className={"w-full z-10"}
                />

            </div>
            <div className='flex gap-2 mt-4'>
                <Input
                    value={payload.options.currency}
                    onChange={(e) => setPayload(prev => { return { ...prev, options: { ...prev.option, currency: e.target.value.split(" ")[0] } } })}
                    required={true}
                    ReadInput={`w-full mt-1 h-[50px]`}
                    className={"w-full flex flex-col justify-center mb-4"}
                    label={"Currency"}
                    type={"currency"}
                    defaultValue={(currency) => payload.user_currency === currency ? true : false}
                />
            </div>
            <div className="flex flex-col z-10 gap-2">
                <Guests payload={payload} setPayload={setPayload} />
            </div>
            {/* <div className="flex flex-col z-10 gap-2">
                <Services addonsList={addonsList} payload={payload} setPayload={setPayload} />
            </div> */}
            <div className="flex gap-2 text-center justify-center items-center mt-4">
                <Calendar
                    startDate={payload?.checkin}
                    endDate={payload?.checkout}
                    setStartDate={(value) => setPayload((prev) => { return { ...prev, checkin: value } })}
                    setEndDate={(value) => setPayload((prev) => { return { ...prev, checkout: value } })}
                />
            </div>
        </div>
    )
}

export default Step1