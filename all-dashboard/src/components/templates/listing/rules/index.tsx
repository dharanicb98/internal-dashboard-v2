import GroupWrapper from "components/templates/listing/general/groupWrapper";
import ToggleGroup from "ui/input/toggleGroup";
import React from "react";
import WifiDetails from "./wifiDetails";
import CustomRules from "./customRulesInput";
import StepperCard from "./stepperCard";
import AddCard from "components/templates/listing/general/cards/addCard";
import MediaDialog, {
  MediaContentType,
} from "components/templates/listing/general/dialogues/highlightDialog";
import Timer from "./timer";
import Divider from "ui/divider";
import {
  useListingDetailsSelector,
  useRulesSelector,
} from "store/selectors/listing";
import { useDispatch } from "react-redux";
import { ListingDataType } from "types/listing";
import { updateListingDetails } from "store/slices/listing";
import { generateUUID } from "utils/common";
import { isEqual } from "lodash";
import Textarea from "ui/input/textarea";
import TimerSelect from "ui/times/timeSelect";

export default function RulesContent(props: RulesContentProps) {
  const { } = props;
  const dispatch = useDispatch();
  const listingDetails = useListingDetailsSelector();
  const rulesList = useRulesSelector();
  const [showStepperDialog, setShowStepperDialog] =
    React.useState<MediaContentType | null>(null);

  const handleChangeListingDetails = (
    key: keyof ListingDataType,
    value: ListingDataType[keyof ListingDataType]
  ) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  return (
    <div>
      <MediaDialog
        open={!!showStepperDialog}
        onClose={(value) => {
          if (value && !isEqual(showStepperDialog, value)) {
            const addedMedia = [
              ...listingDetails.check_in_ins,
              {
                ...value,
                path: value.media,
                _id: generateUUID(),
              },
            ];
            handleChangeListingDetails("check_in_ins", addedMedia as any);
          }
          setShowStepperDialog(null);
        }}
        defaultValues={showStepperDialog}
      />
      <GroupWrapper
        name="House rules"
        description="Guests are expected to follow your rules and can be removed from HolidayKeepers if they cause issue"
        descriptionClass="text-xl md:text-sm"
        titleClass="text-base mb-4 md:mb-1.5"
        containerClass="md:mb-4"
      >
        <div className="grid grid-cols-2 gap-x-8 mt-6 md:grid-cols-1 md:gap-y-2.5">
            <TimerSelect
              fromValue={listingDetails.check_in_time}
              toValue={listingDetails.check_out_time}
              // onChange={(key, value) => onChange(key, value)}
              onChange={(key, value) => handleChangeListingDetails(key, value)}
              fromTitle="Check-In Time"
              toTitle="Check-Out Time"
              fromKey="check_in_time"
              toKey="check_out_time"
              timerSelectContainerClassName= "hidden md:flex"
            />
          <div>
            {rulesList.map((item, nIdx) => (
              <div
                key={nIdx}
                // className="mt-4 first:mt-0 text-lg flex items-center w-full justify-between"
                className="text-lg md:border px-6 py-2.5 md:border-grey-light md:rounded-2xl md:h-fit md:mt-2.5 first:md:mt-0"
              >
                <ToggleGroup
                  checked={!!listingDetails.rules.includes(item.id)}
                  handleChange={(checked) => {
                    let filterRules = [...listingDetails.rules];
                    if (checked) {
                      filterRules.push(item.id);
                    } else {
                      filterRules = filterRules.filter(
                        (nItem) => item.id !== nItem
                      );
                    }
                    handleChangeListingDetails("rules", filterRules);
                  }}
                  title={item.name}
                />
              </div>
            ))}
          </div>
          <div>
            <Timer
              onChange={(key, value) => handleChangeListingDetails(key, value)}
              value={{
                is_quite_hours: listingDetails.is_quite_hours,
                check_in_time: listingDetails.check_in_time,
                check_out_time: listingDetails.check_out_time,
                quite_hours_from: listingDetails.quite_hours_from,
                quite_hours_to: listingDetails.quite_hours_to,
              }}
            />
          </div>
        </div>
      </GroupWrapper>
      <Divider className="my-9 md:hidden" />
      <div className="flex gap-[22px] md:flex-col-reverse md:mt-2.5">
        <WifiDetails
          wifi_network_name={listingDetails.wifi_network_name}
          wifi_network_password={listingDetails.wifi_network_password}
          wifi_upload_speed={listingDetails.wifi_upload_speed}
          wifi_download_speed={listingDetails.wifi_download_speed}
          onChange={(key, value) => handleChangeListingDetails(key, value)}
        />
        <CustomRules
          onChange={(value) => handleChangeListingDetails("custom_rule", value)}
          value={listingDetails.custom_rule}
          disabled={listingDetails.is_custom_rule}
          changeDisableState={(checked) =>
            handleChangeListingDetails("is_custom_rule", checked)
          }
        />
      </div>
      <Divider className="my-9 md:mt-8 md:mb-5" />
      <GroupWrapper
        name="Check In Instruction"
        description="Create check-in instructions so we’ll share them with confirmed guest before they arrive"
        descriptionClass="text-xl sm:text-sm"
        titleClass= "md:mb-4"
      >
        <div className="gap-x-5 mt-6 flex overflow-auto max-w-full">
          <Textarea
            row={5}
            value={listingDetails.check_in_ins}
            onChange={(e) => handleChangeListingDetails("check_in_ins", e as any)}
            className="text-sm border border-grey"
          />

          {/* {listingDetails.check_in_ins && listingDetails.check_in_ins?.map((item, idx) => (
            <div key={idx} className="min-w-[360px] md:min-w-[180px] h-full">
              <StepperCard
                title={item.title}
                description={item.description}
                src={item.path}
              />
            </div>
          ))} */}
          {/* <AddCard
            title="Add step"
            description="What should guest do next?"
            onClick={() =>
              setShowStepperDialog({
                media: null,
                title: "",
                description: "",
              })
            }
            containerClass="min-w-[360px] md:min-w-[180px] md:px-0 "
          /> */}
        </div>
      </GroupWrapper>
    </div>
  );
}

interface RulesContentProps { }
