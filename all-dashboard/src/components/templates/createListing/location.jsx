import { useDispatch } from "react-redux";
import { useCreateListingDataSelector } from "selectors/createListing";
import {
  useRegionsSelector,
  useDestinationsSelector,
  useCountrySelector,
} from "selectors/listing";
import { updateData } from "slices/createListing";
import dynamic from "next/dynamic";
import OutlinedInput from "ui/input/outlinedInput";
import { useEffect } from "react";
const Map = dynamic(() => import("ui/map"), { ssr: false });

function Location() {
  const listingData = useCreateListingDataSelector();
  const regionsData = useRegionsSelector();
  const destinationsData = useDestinationsSelector();
  const countryData = useCountrySelector();

  useEffect(() => {
    let userData = localStorage.getItem("token");
    let parseData = JSON.parse(userData);
    dispatch(updateData({ host_id: parseData?.user_id }));
  }, []);

  const dispatch = useDispatch();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  const handleChangeAddress = (key, value) => {
    const prevAddress = { ...listingData.address, [key]: value };
    dispatch(updateData({ address: prevAddress }));
  };

  return (
    <div>
      <p className="text-1xl mb-1"> Confirm your address</p>
      <p className="text-grey-dark text-sm mb-4 leading-6">
        Your address is only shared with guests after they,ve made a
        reservation.
      </p>
      <Map
        initialLocation={{ lat: 37.0902, lng: 95.7129 }}
        value={{
          lat: listingData.location_latitude,
          lng: listingData.location_longitude,
        }}
        onChange={(value) => {
          handleUpdateData("location_latitude", value.lat);
          handleUpdateData("location_longitude", value.lng);
          handleUpdateData("address", {
            ...listingData?.address,
            // street:value?.formatted_address,
            landmark: value?.landmark,
            city: value?.city,
            pin: value?.postal_code,
            country: value?.country,
            country_id:
              countryData?.country?.find((e) => e.name == value?.country)?.id ||
              undefined,
          });
        }}
      />

      <div className="h-[532px] rounded-lg mt-4 border-grey">
        <div className="h-[150px]   border-2 rounded-lg">
          <div className="border-b-2 h-[49px] rounded-t-box">
            <select
              value={listingData?.address?.country_id}
              onChange={(e) =>
                handleChangeAddress("country_id", e.target.value)
              }
              className="w-full h-full bg-red text-grey-dark rounded-lg
      !outline-none !placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)]
      text-base px-4 py-2 !border-0"
            >
              <option value="">Country</option>
              {countryData?.country?.map((data, index) => {
                return (
                  <option key={index} value={data?.id}>
                    {data?.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <OutlinedInput value={listingData?.address?.region} className="!rounded-[0px]  border-l-0 border-r-0 border-b-0 !border-grey" placeholder="Region"
        onChange={(e) => handleChangeAddress("region", e.target.value)}
      /> */}
          <div className="border-b-2 h-[49px] rounded-t-box items-center">
            <select
              value={listingData?.address?.region}
              onChange={(e) => handleChangeAddress("region", e.target.value)}
              className="w-full h-full text-grey-dark 
       !placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)]
       text-base px-4 py-2 !border-0"
            >
              <option>Choose Region</option>
              {(regionsData || [])
                .filter((e) => e.parent_id == listingData?.address?.country_id)
                ?.map((data, index) => {
                  return (
                    <option key={index} value={data?.id}>
                      {data?.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="border-b-0 h-[49px] rounded-t-box ">
            <select
              value={listingData?.address?.destination}
              onChange={(e) =>
                handleChangeAddress("destination", e.target.value)
              }
              className="w-full h-full rounded-b-lg text-grey-dark 
      !placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)]
      text-base px-4 py-2 !border-0"
            >
              <option>Choose Destination</option>
              {(destinationsData || [])
                .filter((e) => e.parent_id == listingData?.address?.region)
                ?.map((data, index) => {
                  return (
                    <option key={index} value={data?.id}>
                      {data?.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        {/* <OutlinedInput value={listingData?.address?.destination} className="!rounded-[0px]  border-l-0 border-r-0 border-b-0 !border-grey" placeholder="Destination"
        onChange={(e) => handleChangeAddress("destination", e.target.value)}
      /> */}
        <div className="border-2  mt-5 rounded-lg">
          <div className="border-t-0 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.house}
              className=" rounded-b-0 text-base h-full border-0 !border-grey"
              placeholder="House,Flat, bldg, etc."
              onChange={(e) => handleChangeAddress("house", e.target.value)}
            />
          </div>
          <div className="border-t-0 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.area}
              className="!rounded-[0px] text-base h-full  border-l-0 border-r-0 border-b-0 !border-grey"
              placeholder="Area/Village (If applicable)"
              onChange={(e) => handleChangeAddress("area", e.target.value)}
            />
          </div>
          <div className="border-t-0 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.street}
              className="!rounded-[0px] h-full text-base border-l-0 border-r-0 border-b-0 !border-grey"
              placeholder="Street address"
              onChange={(e) => handleChangeAddress("street", e.target.value)}
            />
          </div>
          <div className="border-t-0 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.landmark}
              className="!rounded-[0px] h-full text-base border-l-0 border-r-0 border-b-0 !border-grey"
              placeholder="Nearby landmark (If applicable)"
              onChange={(e) => handleChangeAddress("landmark", e.target.value)}
            />
          </div>
          <div className="border-t-0 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.city}
              className="!rounded-[0px] h-full text-base border-l-0 border-r-0 border-b-0 !border-grey"
              placeholder="city/town"
              onChange={(e) => handleChangeAddress("city", e.target.value)}
            />
          </div>
          <div className="border-t-0 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.pin}
              className="!rounded-[0px] h-full text-base border-l-0 border-r-0 border-b-0 !border-grey"
              placeholder="PIN code"
              onChange={(e) => handleChangeAddress("pin", e.target.value)}
            />
          </div>
          <div className="border-t-2 h-[50px]">
            <OutlinedInput
              value={listingData?.address?.country}
              className="rounded-0  h-full text-base border-0 !border-grey"
              placeholder="Country/Province"
              onChange={(e) => handleChangeAddress("country", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
