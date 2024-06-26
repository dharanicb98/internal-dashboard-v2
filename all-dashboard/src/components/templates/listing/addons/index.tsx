import PricingCard from "components/templates/listing/general/cards/pricingCard";
import GroupWrapper from "components/templates/listing/general/groupWrapper";
import { FilledButton } from "ui/buttons";
import { useListingDetailsSelector } from "store/selectors/listing";
import PricingCardMobile from "../general/cards/pricingCardAddMobile";
import { ListingDataType } from "types/listing";
import { updateListingDetails } from "store/slices/listing";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "ui/dialog/confirmDialog";
import AddAddonsDialog from "./addAddonsDialog";
import React from "react";
import { generateUUID, getRangeBetweenDates2 } from "utils/common";
import { basis, discount } from "src/constants/basis";
import PopOver from "ui/popover";

export default function AddOnsContent(props: PropertyContentProps) {
  const { } = props;
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = React.useState<StringObject | null>(
    null
  );
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<Boolean>(false);
  const [showExtraPricingDialog, setShowExtraPricingDialog] = React.useState("");
  const [extraServiceSelected, setExtraServiceSelected] = React.useState<Number|String|StringObject>(-1);
  const listingDetails = useListingDetailsSelector();
  const addonsDropdown = useSelector((s: any) => s.addons) || [];


  const handleChangeListingDetails = (
    key: keyof ListingDataType,
    value: ListingDataType[keyof ListingDataType]
  ) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

  const handleRemovePrice = () => {
    
    if (showConfirm) {
      const key = showConfirm.key;
      let filterData = clone(listingDetails['add_ons'] || []);
      if (key == "add_ons") {
        filterData = filterData.filter(
          (item) => item._id !== showConfirm.id
        );
      } else {
        filterData[showConfirm.id] = {
          ...filterData[showConfirm.id],
          blocks: filterData[showConfirm.id].blocks.filter(v => v._id != showConfirm.sub_id)
        }
      }
      handleChangeListingDetails('add_ons', filterData);
    }
    setShowConfirm(null);
  };

  const contentPer = (i: any) => {
    const data: any = [];
    if (i.per_bedroom) data.push('Bedroom');
    if (i.per_guest) data.push('Guest');
    if (i.per_night) data.push('Night');
    return (data.length ? 'Per ' : '') + data.join(', ');
  }

  console.log("listingDetails?.add_ons=============>",listingDetails?.add_ons)
  const errorPopupUi = (/*addedAddons: string,*/cancelAction: VoidFunction)=>(
    <div className=" p-8 bg-white rounded-2xl confirmDialogContent__index">
      <p className="">{`Selected Addons Already Exist`}</p>
      <div className="flex justify-end">
        <button className="text-grey-dark shadow-lg rounded-lg px-5 py-3" onClick={cancelAction}>
          Cancel
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-[500px]">
      <ConfirmDialog
        confirmText="Are you sure you want remove?"
        confirmAction={() => handleRemovePrice()}
        declineAction={() => setShowConfirm(null)}
        open={!!showConfirm}
      />
      <PopOver
        openDialog = {showConfirmPopup}
        setOpenDialog = {setShowConfirmPopup}
        containerClass = "top-0 left-0 bottom-0 right-0 bg-grey-light bg-opacity-50 flex items-center justify-center confirmDialog__index"
      >
        {errorPopupUi(
          ()=>setShowConfirmPopup(prev=>!prev)
        )}
      </PopOver>
      <AddAddonsDialog
        open={showExtraPricingDialog}
        extraServiceIndex={extraServiceSelected}
        onClose={(value, actionType) => {
          setShowExtraPricingDialog(false);
          if (value && actionType == "add") {
            console.log("added data value====>",value);
            const data = {
              ...value,
              _id: generateUUID(),
            };

            console.log('added data===',data);
            const setData = [...listingDetails.add_ons];
            const setIndex = setData.findIndex(e => e.id == data.id);
            if (setIndex == -1) {
              setData.push(data);
            }else{
              setShowConfirmPopup(true);
              // setShowConfirmPopup({
              //   id: setData[setIndex].id,
              //   key: "addon",
              // })
              
            } 
            // else {
              // if (data.start_date) {
              //   setData[setIndex] = {
              //     ...setData[setIndex],
              //     blocks: [
              //       ...setData[setIndex].blocks,
              //       { ...data },
              //     ]
              //   }
              // } 
              // else {
                                          // setData[setIndex] = {
                                          //   ...setData[setIndex],
                                          //   ...data
                // }
            //   }
            // }
            handleChangeListingDetails("add_ons", setData);
          }
          else if (value && actionType == "addBlock"){
            console.log("block data value====>",value);
            const data = {
              ...value,
              _id: generateUUID(),
            };
            const setData = [...listingDetails.add_ons];
            const setIndex = setData.findIndex(e => e.id == data.id);
            if (data.start_date) {
                setData[setIndex] = {
                  ...setData[setIndex],
                  blocks: [
                    ...setData[setIndex].blocks,
                    { ...data },
                  ]
                }
            }
            handleChangeListingDetails("add_ons", setData);
          }
          else if (value && actionType == "edit") {
            const newExtraServiceData = value;
            console.log("newExtraServiceData========>",newExtraServiceData)
            const data = listingDetails["add_ons"].map((item) => {
              if (item._id == newExtraServiceData._id) {
                return newExtraServiceData;
              }
              return item;
            });

            handleChangeListingDetails("add_ons", [...data]);
          }
          else if (value && actionType == "editBlock"){
            console.log("extraServiceSelected====>",extraServiceSelected);
            const updatedBlock = {...value};
            const data = clone(listingDetails['add_ons'] || []);
            data[extraServiceSelected.id] = {
              ...data[extraServiceSelected.id],
              blocks: data[extraServiceSelected.id]?.blocks.map(each=>{
                if (each._id === extraServiceSelected.sub_id){
                  return updatedBlock;
                }
                return each;
              })
            }
            handleChangeListingDetails("add_ons", [...data]);
          }
        }}
      />
      <div>
        <GroupWrapper
          name="Add-Ons"
          description="Personalize your stay with our enticing add-ons! Whether you can add chef, airport pickup etc"
          descriptionClass="text-xl"
          action={
            <FilledButton
              text="Add"
              onClick={() => {
                setShowExtraPricingDialog("add");
                setExtraServiceSelected(-1);
              }}
              buttonClass="px-6 mr-4 text-lg md:hidden"
            />
          }
        >
          <div className="md-m:hidden">
            <PricingCardMobile
              title="Add New"
              onbuttonclick={() => {
                setShowExtraPricingDialog("add");
                setExtraServiceSelected(-1);
              }}
            />
          </div>
          {listingDetails?.add_ons && listingDetails?.add_ons?.map((item, idx) => (
            <div key={idx} className="mt-6 first:mt-0">
              <PricingCard
                hideText
                onEditClick={() => {
                  setExtraServiceSelected(idx);
                  setShowExtraPricingDialog("edit");
                }}
                onRemoveClick={() =>
                  setShowConfirm({
                    id: item._id,
                    key: "add_ons",
                  })
                }
                onCreateBlockClick={() => {
                  setExtraServiceSelected(idx);
                  setShowExtraPricingDialog("addBlock");
                }}
                amount_type={item.amount_type}
                pricing={item.amount}
                content={contentPer(item)}
                title={`${addonsDropdown.find((v) => v.id === item.id)?.name}`}
              />
              {/* {item?.blocks && item?.blocks.length > 0 && item.blocks.map((v1: any) => {
                return( 
                <div key={v1._id} className="pl-10 mt-2">
                  <PricingCard
                    hideText
                    hideEdit
                    pricing={v1.amount}
                    amount_type={v1.amount_type}
                    content={contentPer(v1)}
                    title={`${getRangeBetweenDates2(v1.start_date, v1.end_date)}`}
                    onRemoveClick={() =>
                      setShowConfirm({
                        id: idx,
                        sub_id: v1._id,
                        key: "blocks",
                      })
                    }
                  />
                </div>)
              })} */}
            </div>
          ))}
        </GroupWrapper>

        <GroupWrapper
          name="Blocks"
          wrapperClass= "mt-8"
        >
          {listingDetails?.add_ons && listingDetails?.add_ons?.map((item, idx) => {
            if (item?.blocks && item?.blocks.length > 0){
              return (
                <GroupWrapper
                  name={`${addonsDropdown.find((v) => v.id === item.id)?.name}`}
                  wrapperClass= "mt-8"
                  titleClass = '!text-black text-lg font-medium'
                >
                  {item?.blocks.map((v1: any) => (
                      <div key={v1._id} className="mt-6 first:mt-0">
                        <PricingCard
                          hideText
                          // hideEdit
                          hideBlock
                          pricing={v1.amount}
                          amount_type={v1.amount_type}
                          content={contentPer(v1)}
                          title={`${getRangeBetweenDates2(v1.start_date, v1.end_date)}`}
                          onRemoveClick={() =>
                            setShowConfirm({
                              id: idx,
                              sub_id: v1._id,
                              key: "blocks",
                            })
                          }
                          onEditClick={() => {
                            setExtraServiceSelected({
                              id: idx,
                              sub_id: v1._id,
                            });
                            setShowExtraPricingDialog("editBlock");
                          }}
                        />
                      </div>
                  ))}
                </GroupWrapper>
              )
          }})}
        </GroupWrapper>
      </div>
      
    </div>
  );
}

interface PropertyContentProps { }