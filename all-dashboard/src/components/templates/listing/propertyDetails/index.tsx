import GroupWrapper from "components/templates/listing/general/groupWrapper";
import CounterGroup from "ui/input/counterGroup";
import EditableTextField from "ui/input/editableTextfield";
import ToggleGroup from "ui/input/toggleGroup";
import React from "react";
import CategoryCheckbox from "./categoryCheckbox";
import { updateObjectArray } from "utils/common";
import Divider from "ui/divider";
import dynamic from "next/dynamic";
import { useLocationSelector } from "store/selectors/location";
import {
  useCatagoriesSelector,
  useCountrySelector,
  useDestinationsSelector,
  useListingDetailsSelector,
  usePetsSelector,
  useRegionsSelector,
} from "store/selectors/listing";
import { ListingDataType } from "types/listing";
import { useDispatch } from "react-redux";
import { updateListingDetails } from "store/slices/listing";
import OutlinedInput from "ui/input/outlinedInput";

const Map = dynamic(() => import("ui/map"), {
  ssr: false,
});

export default function PropertyContent(props: PropertyContentProps) {
  const {} = props;
  const dispatch = useDispatch();
  const location = useLocationSelector();
  const listingDetails = useListingDetailsSelector();
  const petList = usePetsSelector();
  const catagories = useCatagoriesSelector();

  const regionsData = useRegionsSelector();
  const destinationsData = useDestinationsSelector();
  const countryData = useCountrySelector();
  // console.log("countryData=================>",countryData)

  const handleChangeListingDetails = (
    key: keyof ListingDataType,
    value: ListingDataType[keyof ListingDataType]
  ) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  // console.log("page 1 title", listingDetails);
  // console.log("category===", catagories);
  // console.log("location===", location);

  const handleChangeAddress = (key, value) => {
    const prevAddress = { ...listingDetails.address, [key]: value };
    dispatch(updateListingDetails({ address: prevAddress }));
    console.log("update");
  };

  // console.log("listingDetails.categories============>",listingDetails.categories);

  return (
    <div>
      <GroupWrapper
        name="Title"
        containerClass="!mb-3 mb-2"
        titleClass="text-base"
      >
        <div>
          <EditableTextField
            defaultValue={listingDetails.title}
            handleChange={(value) => handleChangeListingDetails("title", value)}
            textClass="text-xl font-semibold"
          />
        </div>

        <div className="!mb-3">
          <label>Permalink</label>
          <p>{listingDetails?.permalink}</p>
          <a
            target="_blank"
            href={`${
              process.env.NEXT_PUBLIC_WEBSITE_URL || ""
            }/listing/${listingDetails?.permalink}`}
          >
            {process.env.NEXT_PUBLIC_WEBSITE_URL || ""}/listing/
            {listingDetails?.permalink}
          </a>
        </div>
      </GroupWrapper>
      {/* {console.log('page 1 title')} */}
      <Divider className="!my-8" />
      <GroupWrapper name="Description" containerClass="!mb-3 mb-2">
        <div>
          <EditableTextField
            defaultValue={listingDetails.description}
            handleChange={(value) =>
              handleChangeListingDetails("description", value)
            }
            textClass="text-xl font-normal md:text-lg md:leading-7"
          />
        </div>
      </GroupWrapper>
      <Divider className="!my-8" />
      <GroupWrapper
        name="Where is your Property Located"
        titleClass="text-lg md:text-base"
        containerClass="!mb-3 mb-2"
      >
        <Map
          initialLocation={location}
          value={{
            lat: listingDetails.location_latitude,
            lng: listingDetails.location_longitude,
            // landmark: listingDetails?.address?.landmark,
            // city: listingDetails?.address?.city,
            // postal_code: listingDetails?.address?.pin,
            // country: listingDetails?.address?.country,
          }}
          onChange={(value) => {
            handleChangeListingDetails("location_latitude", value.lat);
            handleChangeListingDetails("location_longitude", value.lng);
            // handleChangeListingDetails("address", {...listingDetails?.address,
            //   landmark:value?.landmark,
            //   city:value?.city,
            //   pin:value?.postal_code,
            //   country:value?.country,
            //   country_id: countryData?.country?.find(e => e.name == value?.country)?.id || undefined
            // });
          }}
        />
        {/* <div className="border-0 rounded-lg mt-3 mb-2 border-red"> */}
        <div className="border rounded-lg m[48%] mb-3   border-gray">
          <select
            value={listingDetails?.address?.country_id}
            onChange={(e) => handleChangeAddress("country_id", e.target.value)}
            className="w-full text-grey-dark 
            !outline-none !placeholder:font-[400] placeholder:text-[rgba(60, 60, 60, 0.68)]
            text-[14px] px-3 mb-2 p[48%] !border-l-0 !border-r-0 !border-t-0 !border-gray-400  my-1"
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

          {/* <OutlinedInput value={listingDetails?.address?.region} className="!rounded-[0px]  border-0 my-1-0 border-0 my-1-0 border-0 my-1-0 !border-l-0 !border-r-0 !border-t-0 border-gray my-1rey" placeholder="Region"
              onChange={(e) => handleChangeAddress("region", e.target.value)}
            /> */}

          <select
            value={listingDetails?.address?.region}
            onChange={(e) => handleChangeAddress("region", e.target.value)}
            className="w-full text-grey-dark 
            !placeholder:font-[400] placeholder:text-[rgba(60, 60, 60, 0.68)]
            text-[14px] px-3 mb-2 p[48%] !border-l-0 !border-r-0 !border-t-0 !border-gray-400 my-1"
          >
            <option>Choose Region</option>
            {(regionsData || [])
              .filter((e) => e.parent_id == listingDetails?.address?.country_id)
              ?.map((data, index) => {
                return (
                  <option key={index} value={data?.id}>
                    {data?.name}
                  </option>
                );
              })}
          </select>

          <select
            value={listingDetails?.address?.destination}
            onChange={(e) => handleChangeAddress("destination", e.target.value)}
            className="w-full text-grey-dark 
            !placeholder:font-[400] placeholder:text-[rgba(60, 60, 60, 0.68)]
            text-[14px] px-3 mb-2 p[48%] !border-0 my-1"
          >
            <option>Choose Destination</option>
            {(destinationsData || [])
              .filter((e) => e.parent_id == listingDetails?.address?.region)
              ?.map((data, index) => {
                return (
                  <option key={index} value={data?.id}>
                    {data?.name}
                  </option>
                );
              })}
          </select>
        </div>
        {/* <OutlinedInput value={listingDetails?.address?.destination} className="!rounded-[0px]  border-l-0 border-r-0 border-b-0 !border-grey" placeholder="Destination"
              onChange={(e) => handleChangeAddress("destination", e.target.value)}
            /> */}
        <div className="border rounded-lg mb-3  border-gray p[48%] ">
          <OutlinedInput
            value={listingDetails?.address?.house}
            className="!rounded-[0px]  border-l-0 border-r-0 border-t-0 !border-grey"
            label="House,Flat, bldg, etc."
            onChange={(e) => handleChangeAddress("house", e.target.value)}
          />

          <OutlinedInput
            value={listingDetails?.address?.area}
            className="!rounded-[0px]  border-l-0 border-r-0 border-t-0 !border-grey"
            label="Area/Village (If applicable)"
            onChange={(e) => handleChangeAddress("area", e.target.value)}
          />

          <OutlinedInput
            value={listingDetails?.address?.street}
            className="!rounded-[0px]  border-l-0 border-r-0 border-t-0 !border-grey"
            label="Street address"
            onChange={(e) => handleChangeAddress("street", e.target.value)}
          />

          <OutlinedInput
            value={listingDetails?.address?.landmark}
            className="!rounded-[0px]  border-l-0 border-r-0 border-t-0 !border-grey"
            label="Nearby landmark (If applicable)"
            onChange={(e) => handleChangeAddress("landmark", e.target.value)}
          />

          <OutlinedInput
            value={listingDetails?.address?.city}
            className="!rounded-[0px]  border-l-0 border-r-0 border-t-0 !border-grey"
            label="city/town"
            onChange={(e) => handleChangeAddress("city", e.target.value)}
          />

          <OutlinedInput
            value={listingDetails?.address?.pin}
            className="!rounded-[0px]  border-l-0 border-r-0 border-t-0 !border-grey"
            label="PIN code"
            onChange={(e) => handleChangeAddress("pin", e.target.value)}
          />

          <OutlinedInput
            value={listingDetails?.address?.country}
            className="!rounded-[0px]  border-0 !border-grey"
            label="Country/Province"
            onChange={(e) => handleChangeAddress("country", e.target.value)}
          />
        </div>
      </GroupWrapper>
      <Divider className="!my-8" /> {/*gap-x-6*/}
      <GroupWrapper
        name="Category's"
        titleClass="text-lg md:text-base"
        containerClass="!mb-3 mb-2"
      >
        <div className="grid grid-cols-3 mb-2 xl:grid-cols-3 md:grid-col[48%] xs:grid-col[48%] sm:grid-col[48%] gap-6">
          {catagories?.map((item, idx) => (
            <CategoryCheckbox
              className="!h-[94px] xs:!min-w-[150px]"
              title={item.name}
              isChecked={!!listingDetails.categories?.includes(item.id)}
              handleCheck={(checked) => {
                let filterCategories = [...listingDetails.categories];
                // filterCategories = [];
                if (checked) {
                  filterCategories.push(item.id);
                } else {
                  filterCategories = filterCategories.filter(
                    (nItem) => item.id !== nItem
                  );
                }
                handleChangeListingDetails("categories", filterCategories);
              }}
              icon={item.icon_path}
              key={idx}
            />
          ))}
        </div>
      </GroupWrapper>
      <Divider className="!my-8" />
      <GroupWrapper name="Guests and Accommodation">
        <div className="flex justify-between flex-wrap">
          {/* <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.no_of_guests_max}
              handleChange={(value) =>
                handleChangeListingDetails("no_of_guests_max", value)
              }
              title="Number of Guests"
              titleClass="font-medium text-xl"
              description="Number of guests can stay in your property"
            />
          </div>
         <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.max_free_guests}
              handleChange={(value) =>
                handleChangeListingDetails("max_free_guests", value)
              }
              title="Max Free Guests"
              titleClass="font-medium text-xl"
              description="Maximum number of free guests can stay in your property"
            />
          </div> 
          <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.max_allowed_guests}
              handleChange={(value) =>
                handleChangeListingDetails("max_allowed_guests", value)
              }
              title="Max Allowed Guests"
              titleClass="font-medium text-xl"
              description="Maximum number of guests can stay in your property"
            />
          </div>
          <div className="!mt-3 mb-2 w-[48%] md:w-full ">
            <CounterGroup
              value={listingDetails?.no_of_bedrooms_max}
              handleChange={(value) =>
                handleChangeListingDetails("no_of_bedrooms_max", value)
              }
              title="Max Number of Bedrooms"
              titleClass="font-medium text-xl"
              description="Maximum number of bedrooms in your property"
            />
          </div>
          <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.no_of_beds_max}
              handleChange={(value) =>
                handleChangeListingDetails("no_of_beds_max", value)
              }
              title="Max Number of Beds"
              titleClass="font-medium text-xl"
              description="Maximum number of beds in your property"
            />
          </div>
          <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.no_of_washroom_max}
              handleChange={(value) =>
                handleChangeListingDetails("no_of_washroom_max", value)
              }
              title="Max Number of Washrooms"
              titleClass="font-medium text-xl"
              description="Maximum number of washrooms in your property"
            />
          </div>
          <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.max_bookings_days}
              handleChange={(value) =>
                handleChangeListingDetails("max_bookings_days", value)
              }
              title="Max Number of Booking Days"
              titleClass="font-medium text-xl"
              description="Maximum number of booking days in your property"
            />
          </div>
          <div className="!mt-3 mb-2 w-[48%] md:w-full">
            <CounterGroup
              value={listingDetails?.no_of_pets_allowed}
              handleChange={(value) =>
                handleChangeListingDetails("no_of_pets_allowed", value)
              }
              title="Number of Pets Allowed"
              titleClass="font-medium text-xl"
              description="Maximum number of pets in your property"
            />
          </div> */}
        </div>
        <Divider className="!my-8" />
        <div className="mt-3 mb-2 flex justify-between md:flex-wrap md:gap-10">
          <div className="w-[48%] md:w-full">
            <p className="text-xl font-medium mb-8">Accommodation</p>
            <div className="flex flex-col gap-8">
              {listingDetails?.accommodation?.map((item, idx) => (
                <div key={idx} className="h-11">
                  <CounterGroup
                    value={item.value}
                    handleChange={(value) => {
                      const prevAccommodations = updateObjectArray(
                        listingDetails.accommodation,
                        (obj: any) => obj._id === item._id,
                        "value",
                        value
                      );

                      handleChangeListingDetails(
                        "accommodation",
                        prevAccommodations
                      );
                    }}
                    titleClass="text-xl"
                    title={item.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-[48%] pl-10 md:w-full md:pl-0">
            <p className="text-xl font-medium mb-8">Pets</p>
            <div className="flex flex-col gap-8">
              {petList?.map((item, idx) => (
                <div key={idx} className="h-11 pt-[6px]">
                  <ToggleGroup
                    checked={!!listingDetails.pets.includes(item.id)}
                    handleChange={(checked) => {
                      let filterPets = [...listingDetails.pets];
                      if (checked) {
                        filterPets.push(item.id);
                      } else {
                        filterPets = filterPets.filter(
                          (nItem) => item.id !== nItem
                        );
                      }
                      handleChangeListingDetails("pets", filterPets);
                    }}
                    title={item.name}
                    titleClassName=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </GroupWrapper>
    </div>
  );
}

interface PropertyContentProps {}
