import GroupWrapper from "components/templates/listing/general/groupWrapper";
import Divider from "ui/divider";
import ToggleGroup from "ui/input/toggleGroup";
import React from "react";
import { useDispatch } from "react-redux";
import {
  useAmenitiesSelector,
  useListingDetailsSelector,
} from "store/selectors/listing";
import { updateListingDetails } from "store/slices/listing";

export default function AmenitiesContent() {

  const dispatch = useDispatch();
  const listingData = useListingDetailsSelector();
  const amenities = useAmenitiesSelector();

  const handleUpdateData = (key, value) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  console.log("amenities==========>",amenities);

  return (
    <div className="flex flex-col flex-wrap">
      {amenities?.amenitiesCategory?.map((category, index) => {
        if (amenities?.amenities?.[category?.id].length > 0){
          return(
            <div className="mt-8 w-[100%] md:mt-7" key={index}>
              <p className="text-[16px] leading-[22px] font-[400] text-[#6B6B6B] mb-4">{category.name}</p>
              <div className=" flex justify-between flex-wrap">
              {amenities?.amenities?.[category?.id] && amenities.amenities[category.id].map((item, idx) => (
                <div key={idx} className="w-[40%] md:w-[100%] md:my-1.5">
                  <div className="text-lg md:border px-6 py-2.5 md:border-grey-light md:rounded-2xl md:h-fit ">
                    <ToggleGroup
                      titleClassName={'text-[#000000] font-[400] text-[18px] leading-[22px]'}
                      checked={!!listingData.amenities.includes(item.id)}
                      handleChange={(checked) => {
                        let amenities = [...listingData.amenities];
                        if (checked) {
                          amenities.push(item.id);
                        }
                        else {
                          amenities = amenities.filter((nItem) => item.id !== nItem);
                        }
                        handleUpdateData("amenities", amenities);
                      }}
                      title={item.name}
                      icon={item.icon_path}
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              ))}
              </div>
              <Divider className="!mt-7 md:hidden" />
            </div>
          )
        }
      })}
    </div>
  );
}
