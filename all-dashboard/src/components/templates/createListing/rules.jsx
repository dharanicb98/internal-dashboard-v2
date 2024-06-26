import ToggleGroup from "ui/input/toggleGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { updateData } from "slices/createListing";
import { useCreateListingDataSelector } from "selectors/createListing";
import Toggle from "ui/input/toggle";
import TimerSelect from "ui/times/timeSelect";
import { useRulesSelector } from "store/selectors/listing";
import Textarea from "ui/input/textarea";

export default function Rules() {
  const dispatch = useDispatch();
  const listingData = useCreateListingDataSelector();
  const rules = useRulesSelector();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  return (
    <div>
      <p className="before:content-['*'] before:text-primary mb-1.5 text-base">
        Select guest
      </p>
      <p className="text-sm leading-4 md:leading-5">
        Guests are expected to follow your rules and can be removed from
        HolidayKeepers if they cause issue
      </p>
      <div className="w-[500px] my-8 md:w-full">
        <div className="">
          <TimerSelect
            fromValue={listingData.check_in_time}
            toValue={listingData.check_out_time}
            onChange={(key, value) => handleUpdateData(key, value)}
            fromTitle="Check-In Time"
            toTitle="Check-Out Time"
            fromKey="check_in_time"
            toKey="check_out_time"
          />
        </div>
        <div className="border border-grey-dark rounded-2xl p-3 mt-8">
          <div className="flex items-center justify-between">
            <p className="text-lg">Quite hours</p>
            <Toggle
              checked={listingData.is_quite_hours}
              onChange={(check) => handleUpdateData("is_quite_hours", check)}
            />
          </div>
          <div className="mt-3 md-m:w-3/5">
            <TimerSelect
              fromValue={listingData.quite_hours_from}
              toValue={listingData.quite_hours_to}
              onChange={(key, value) => handleUpdateData(key, value)}
              size="small"
              fromKey="quite_hours_from"
              toKey="quite_hours_to"
            />
          </div>
        </div>
      </div>
      <div>
        {rules.map((item, idx) => (
          <div
            key={idx}
            className="text-lg md:border md:px-6 py-2.5 md:border-grey-light md:rounded-2xl md:h-fit mb-4 last:mb-0"
          >
            <ToggleGroup
              titleClassName="text-lg"
              checked={!!listingData.rules.includes(item.id)}
              handleChange={(checked) => {
                let rules = [...listingData.rules];
                if (checked) {
                  rules.push(item.id);
                } else {
                  rules = rules.filter((nItem) => item.id !== nItem);
                }
                handleUpdateData("rules", rules);
              }}
              title={item?.name}
              icon={item?.icon_path}
              width={30}
              height={30}
            />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-grey border-2 p-4 bg-smoke min-w-[370px] md:min-w-full mt-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <p className="text-lg">Add custom rules</p>
          <Toggle
            checked={listingData.is_custom_rule}
            onChange={(check) => handleUpdateData("is_custom_rule", check)}
          />
        </div>

        <div className="flex justify-center">
          <Textarea
            row={5}
            value={listingData.custom_rule}
            onChange={(value) => handleUpdateData("custom_rule", value)}
            className="text-sm border border-grey"
          />
        </div>
      </div>
    </div>
  );
}
