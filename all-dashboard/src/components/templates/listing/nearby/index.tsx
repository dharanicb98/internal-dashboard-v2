/* eslint-disable @typescript-eslint/no-explicit-any */
import PricingCard from "components/templates/listing/general/cards/pricingCard";
import GroupWrapper from "components/templates/listing/general/groupWrapper";
import { FilledButton } from "ui/buttons";
import { useListingDetailsSelector } from "store/selectors/listing";
import PricingCardMobile from "../general/cards/pricingCardAddMobile";
import { updateListingDetails } from "store/slices/listing";
import { useDispatch } from "react-redux";
import ConfirmDialog from "ui/dialog/confirmDialog";
import React from "react";
import { generateUUID } from "utils/common";
import AddDialog from "./addDialog";

export default function NearByContent(props: NearByContentProps) {
  const { } = props;
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = React.useState<any>(null);
  const [showExtraPricingDialog, setType] = React.useState("");
  const [indexSelected, setIndex] = React.useState(-1);
  const listingDetails = useListingDetailsSelector();

  const handleChangeListingDetails = (key: any, value: any) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  const handleRemovePrice = () => {
    const clone = (items: any) => items.map(item => Array.isArray(item) ? clone(item) : item);
    if (showConfirm) {
      let filterData = clone(listingDetails['nearby'] || []);
      filterData = filterData.filter(
        (item) => item._id !== showConfirm.id
      );
      handleChangeListingDetails('nearby', filterData);
    }
    setShowConfirm(null);
  };


  return (
    <div>
      <ConfirmDialog
        confirmText="Are you sure you want remove?"
        confirmAction={() => handleRemovePrice()}
        declineAction={() => setShowConfirm(null)}
        open={!!showConfirm}
      />
      <AddDialog
        open={showExtraPricingDialog}
        index={indexSelected}
        onClose={(value, actionType) => {
          setType("");
          if (value && actionType == "add") {
            const data = {
              ...value,
              _id: generateUUID(),
            };
            const setData = [...listingDetails.nearby, data];
            handleChangeListingDetails("nearby", setData);
          }
          if (value && actionType == "edit") {
            const newExtraServiceData = value;
            const data = listingDetails["nearby"].map((item) => {
              if (item._id == newExtraServiceData._id) {
                return newExtraServiceData;
              }
              return item;
            });

            handleChangeListingDetails("nearby", [...data]);
          }
        }}
      />
      <div>
        <GroupWrapper
          name="Near By"
          description="Near By"
          descriptionClass="text-xl"
          action={
            <FilledButton
              text="Add"
              onClick={() => {
                setType("add");
                setIndex(-1);
              }}
              buttonClass="px-6 mr-4 text-lg md:hidden"
            />
          }
        >
          {listingDetails?.nearby && listingDetails?.nearby?.length > 0 && listingDetails?.nearby?.map((item, idx) => (
            <div key={idx} className="mt-6 first:mt-0">
              <PricingCard
                hideText
                hidePrice
                onEditClick={() => {
                  setIndex(idx);
                  setType("edit");
                }}
                onRemoveClick={() => setShowConfirm({
                  id: item._id,
                  key: "nearby",
                })}
                title={item.name}
                content={`${item.details.length} items`} pricing={0}
              />
            </div>
          ))}
        </GroupWrapper>
      </div>
      <div className="md-m:hidden">
        <PricingCardMobile
          title="Add New"
          onbuttonclick={() => {
            setType("add");
            setIndex(-1);
          }}
        />
      </div>
    </div>
  );
}

interface NearByContentProps { }
