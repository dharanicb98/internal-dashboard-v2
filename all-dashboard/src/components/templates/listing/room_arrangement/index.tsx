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

export default function RoomArrangementContent(
  props: RoomArrangementContentProps
) {
  const {} = props;
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = React.useState<any>(null);
  const [showExtraPricingDialog, setType] = React.useState("");
  const [indexSelected, setIndex] = React.useState(-1);
  const listingDetails = useListingDetailsSelector();

  const handleChangeListingDetails = (key: any, value: any) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  const handleRemovePrice = () => {
    const clone = (items: any) =>
      items.map((item) => (Array.isArray(item) ? clone(item) : item));
    if (showConfirm) {
      let filterData = clone(listingDetails["room_arrangement"] || []);
      filterData = filterData.filter((item) => item._id !== showConfirm.id);
      handleChangeListingDetails("room_arrangement", filterData);
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
            const setData = [...listingDetails?.room_arrangement, data];
            handleChangeListingDetails("room_arrangement", setData);
          }
          if (value && actionType == "edit") {
            const newExtraServiceData = value;
            const data = listingDetails["room_arrangement"].map((item) => {
              if (item._id == newExtraServiceData._id) {
                return newExtraServiceData;
              }
              return item;
            });

            handleChangeListingDetails("room_arrangement", [...data]);
          }
        }}
      />
      <div>
        <GroupWrapper
          name="Room Arrangement"
          description="Room Arrangement"
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
          {listingDetails?.room_arrangement &&
            listingDetails?.room_arrangement?.length > 0 &&
            listingDetails?.room_arrangement?.map((item, idx) => (
              <div key={idx} className="mt-6 first:mt-0">
                <PricingCard
                  hideText
                  hidePrice
                  onEditClick={() => {
                    setIndex(idx);
                    setType("edit");
                  }}
                  onRemoveClick={() =>
                    setShowConfirm({
                      id: item._id,
                      key: "room_arrangement",
                    })
                  }
                  title={item.name}
                  content={`${item.details.length} items`}
                  pricing={0}
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

interface RoomArrangementContentProps {}
