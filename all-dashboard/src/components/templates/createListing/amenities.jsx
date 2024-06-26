import ToggleGroup from "ui/input/toggleGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { useAmenitiesSelector } from "store/selectors/listing";
import { updateData } from "slices/createListing";
import { useCreateListingDataSelector } from "selectors/createListing";

export default function Amenities() {
  const dispatch = useDispatch();
  const listingData = useCreateListingDataSelector();
  const amenities = useAmenitiesSelector();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  return (
    <div className="flex flex-wrap flex-col">
      {amenities?.amenitiesCategory?.map((category, index) => (
        <div className="mt-10 sm:mt-3 " key={index}>
          <p className="text-[16px] sm:mb-4  font-[400] text-[#6B6B6B]">
            {amenities?.amenities?.[category?.id].length > 0 && category.name}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1">
            {amenities?.amenities?.[category?.id] &&
              amenities.amenities[category.id].map((item, idx) => (
                <div key={idx} className="sm:mb-[10px] ">
                  <div className="text-lg md:border px-6 py-2.5 md:border-grey-light md:rounded-2xl md:h-fit">
                    <ToggleGroup
                      titleClassName={"text-[#000000] font-[400] text-[18px] "}
                      checked={!!listingData.amenities.includes(item.id)}
                      handleChange={(checked) => {
                        let amenities = [...listingData.amenities];
                        if (checked) {
                          amenities.push(item.id);
                        } else {
                          amenities = amenities.filter(
                            (nItem) => item.id !== nItem
                          );
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
        </div>
      ))}
    </div>
  );
}
