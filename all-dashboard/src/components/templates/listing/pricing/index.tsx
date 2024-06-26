import { getRangeBetweenDates, getRangeBetweenDates2 } from "utils/common";
import PricingCard from "components/templates/listing/general/cards/pricingCard";
import GroupWrapper from "components/templates/listing/general/groupWrapper";
import PriceInput from "./priceInput";
import AddPricingDialog from "./addPricingDialog";
import React, { useEffect } from "react";
import { FilledButton } from "ui/buttons";
import AddExtraServiceDialog from "./addExtraServiceDialog";
import Divider from "ui/divider";
import { useListingDetailsSelector } from "store/selectors/listing";
import { ListingDataType } from "types/listing";
import { updateListingDetails } from "store/slices/listing";
import { useDispatch } from "react-redux";
import PricingCardMobile from "../general/cards/pricingCardAddMobile";
import ConfirmDialog from "ui/dialog/confirmDialog";
import { generateUUID } from "utils/common";
import { basis, discount } from "src/constants/basis";
import moment from "moment";
import Select from "ui/input/select";
import ArrowDownIcon from "assets/icons/arrow-down.png";
import Image from "next/image";
import AddGuestDialog from "./addGuestDialog";
import AddLongTermDialog from "./addLongTermDialog";
import AddReservationDialog from "./addReservationDialog";

export default function PricingContent(props: PropertyContentProps) {
  const { } = props;
  const dispatch = useDispatch();
  const listingDetails = useListingDetailsSelector();

  const [discount1, setDiscount1] = React.useState("flat");
  const [discount1_1, setDiscount1_1] = React.useState(0);
  const [discount2, setDiscount2] = React.useState("flat");
  const [discount2_2, setDiscount2_2] = React.useState(0);

  useEffect(() => {
    const newArray = ([...listingDetails?.long_term_discount] || []);
    const price1 = newArray.find(v => v.min_days == 7);
    if (price1?.discount_type) {
      setDiscount1(price1?.discount_type);
      setDiscount1_1(price1?.discount_amount);
    }
    const price2 = newArray.find(v => v.min_days == 30);
    if (price2?.discount_type) {
      setDiscount2(price2?.discount_type);
      setDiscount2_2(price2?.discount_amount);
    }
  }, []);

  useEffect(() => {
    const clone = (items: any) => items.map(a => { return { ...a } });

    const newArray = clone([...listingDetails?.long_term_discount] || []);
    if (discount1_1) {
      const nIndex = newArray.findIndex(e => e.min_days == 7);
      if (nIndex != -1) {
        newArray[nIndex].discount_type = discount1;
        newArray[nIndex].discount_amount = discount1_1;
      } else {
        newArray.push({
          min_days: 7,
          discount_type: discount1,
          discount_amount: discount1_1
        })
      }
    }
    if (discount2_2) {
      const nIndex = newArray.findIndex(e => e.min_days == 30);
      if (nIndex != -1) {
        newArray[nIndex].discount_type = discount2;
        newArray[nIndex].discount_amount = discount2_2;
      } else {
        newArray.push({
          min_days: 30,
          discount_type: discount2,
          discount_amount: discount2_2
        })
      }
    }
    dispatch(updateListingDetails({ long_term_discount: newArray }));
  }, [discount1, discount1_1, discount2, discount2_2]);

  //Seasonal price states
  const [showCalendarDialog, setShowCalendarDialog] = React.useState("");
  const [showConfirm, setShowConfirm] = React.useState<StringObject | null>(null);
  const [seasonalPricingSelected, setSeasonalPricingSelected] = React.useState(-1);

  //guest states
  const [showCalendarGuest, setShowCalendarGuest] = React.useState("");
  const [guestPricingSelected, setGuestPricingSelected] = React.useState(-1);

  //Extra service states
  const [showExtraPricingDialog, setShowExtraPricingDialog] = React.useState("");
  const [extraServiceSelected, setExtraServiceSelected] = React.useState(-1);

  //Extra service states
  const [showExtraDiscountPricingDialog, setShowExtraDiscountPricingDialog] = React.useState("");
  const [extraDiscountSelected, setExtraDiscountSelected] = React.useState(-1);

  //reservation
  const [showReservationType, setShowReservationType] = React.useState("");
  const [reservationKey, setReservationKey] = React.useState(-1);

  const handleChangeListingDetails = (key: keyof ListingDataType, value: ListingDataType[keyof ListingDataType]) => {
    dispatch(updateListingDetails({ [key]: value }));
  };


  const handleUpdateExtraData = (key, value) => {
    const extraGuests = { ...listingDetails.extra_guests, [key]: value };
    dispatch(updateListingDetails({ extra_guests: extraGuests }));
  };

  const handleUpdatePricingData = (key: any, value: any) => {
    const prevAddress = { ...listingDetails.basic_pricing, [key]: value };
    dispatch(updateListingDetails({ basic_pricing: prevAddress }));
    // dispatch(updateData({ [key]: value }));
  };

  const handleUpdateGuestData = (key: any, value: any) => {
    const prevAddress = { ...listingDetails.extra_guests, [key]: value };
    dispatch(updateListingDetails({ extra_guests: prevAddress }));
  };

  const handleUpdateReservationData = (key: any, value: any) => {
    const prevAddress = { ...listingDetails.reservation_length, [key]: value };
    dispatch(updateListingDetails({ reservation_length: prevAddress }));
  };

  const handleRemove = () => {
    const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
    if (showConfirm) {
      const key = showConfirm.key;
      if (key == "season") {
        const filterData = listingDetails.basic_pricing.blocks.filter(
          (item) => item._id !== showConfirm.id
        );
        handleUpdatePricingData('blocks', filterData)
      } else if (key == "reservation_length") {
        const filterData = listingDetails.reservation_length.blocks.filter(
          (item) => item._id !== showConfirm.id
        );
        handleUpdateReservationData('blocks', filterData)
      } else if (key == "extra_guests") {
        const filterData = listingDetails.extra_guests.blocks.filter(
          (item) => item._id !== showConfirm.id
        );
        handleUpdateGuestData('blocks', filterData)
      } else if (key == "extra_services") {
        let filterData = clone(listingDetails['extra_services'] || []);
        if (!showConfirm.sub_id) {
          filterData = filterData.filter(
            (item) => item._id !== showConfirm.id
          );
        } else {
          filterData[showConfirm.id] = {
            ...filterData[showConfirm.id],
            blocks: filterData[showConfirm.id].blocks.filter(v => v._id != showConfirm.sub_id)
          }
        }
        handleChangeListingDetails('extra_services', filterData)
      } else if (key == "long_term_discount") {
        let filterData = clone(listingDetails['long_term_discount'] || []);
        if (!showConfirm.sub_id) {
          filterData = filterData.filter(
            (item) => item._id !== showConfirm.id
          );
        } else {
          filterData[showConfirm.id] = {
            ...filterData[showConfirm.id],
            blocks: filterData[showConfirm.id].blocks.filter(v => v._id != showConfirm.sub_id)
          }
        }
        handleChangeListingDetails('long_term_discount', filterData)
      } else {
        const filterData = listingDetails[key].filter(
          (item) => item._id !== showConfirm.id
        );
        handleChangeListingDetails(key, filterData);
      }
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

  const contentPrice = (i: any) => {
    const data: any = [];
    if (i.security_deposit) data.push('Security Deposit $' + i.security_deposit);
    if (i.weekend_price) data.push('Weekend $' + i.weekend_price);
    return data.join(', ')
  }

  return (
    <div className="mb-[60px]">
      <ConfirmDialog
        confirmText="Are you sure you want remove?"
        confirmAction={() => handleRemove()}
        declineAction={() => setShowConfirm(null)}
        open={!!showConfirm}
      />
      <AddPricingDialog
        open={showCalendarDialog}
        selectedSeasonalIndex={seasonalPricingSelected}
        onRemoveClick={(item) =>
          setShowConfirm({
            id: item.id,
            key: "season",
          })
        }
        onClose={(value, actionType) => {
          setShowCalendarDialog(false);
          if (value && actionType == "add") {
            const newSeasonalData = {
              start_date: moment(value.startDate).format("YYYY-MM-DD"),
              end_date: moment(value.endDate).format("YYYY-MM-DD"),
              base_price: value.basePrice,
              weekend_price: value.weekendPrice,
              security_deposit: value.securityPrice,
              // max_days: value.maxDays,
              // min_days: value.minDays,
              // title: value.name,
              _id: generateUUID(),
            };

            handleUpdatePricingData('blocks', [
              ...listingDetails?.basic_pricing?.blocks,
              newSeasonalData,
            ])
          }
          if (value && actionType == "edit") {
            const newSeasonalData = {
              start: value.startDate,
              end: value.endDate,
              base_price: value.basePrice,
              weekend_price: value.weekendPrice,
              security_deposit: value.securityPrice,
              max_days: value.maxDays,
              min_days: value.minDays,
              title: value.name,
              _id: value.id,
            };
            const data = listingDetails["season"].map((item) => {
              if (item._id == newSeasonalData._id) {
                return newSeasonalData;
              }
              return item;
            });
            handleChangeListingDetails("season", [...data]);
          }
        }}
      />

      <AddGuestDialog
        open={showCalendarGuest}
        selectedSeasonalIndex={guestPricingSelected}
        onRemoveClick={(item) =>
          setShowConfirm({
            id: item.id,
            key: "season",
          })
        }
        onClose={(value, actionType) => {
          setShowCalendarGuest(false);
          if (value && actionType == "add") {
            const newSeasonalData = {
              start_date: moment(value.startDate).format("YYYY-MM-DD"),
              end_date: moment(value.endDate).format("YYYY-MM-DD"),
              additional_cost: value.additional_cost,
              max_free: value.max_free,
              _id: generateUUID(),
            };

            handleUpdateGuestData('blocks', [
              ...(listingDetails?.extra_guests?.blocks || []),
              newSeasonalData,
            ])
          }
          if (value && actionType == "edit") {
            const newSeasonalData = {
              start: value.startDate,
              end: value.endDate,
              base_price: value.basePrice,
              weekend_price: value.weekendPrice,
              security_deposit: value.securityPrice,
              max_days: value.maxDays,
              min_days: value.minDays,
              title: value.name,
              _id: value.id,
            };
            const data = listingDetails["season"].map((item) => {
              if (item._id == newSeasonalData._id) {
                return newSeasonalData;
              }
              return item;
            });
            handleChangeListingDetails("season", [...data]);
          }
        }}
      />

      <AddReservationDialog
        open={showReservationType}
        selectedSeasonalIndex={reservationKey}
        onRemoveClick={(item) =>
          setShowConfirm({
            id: item.id,
            key: "season",
          })
        }
        onClose={(value, actionType) => {
          setShowReservationType(false);
          if (value && actionType == "add") {
            const newSeasonalData = {
              start_date: moment(value.start_date).format("YYYY-MM-DD"),
              end_date: moment(value.end_date).format("YYYY-MM-DD"),
              min_days: value.min_days,
              max_days: value.max_days,
              _id: generateUUID(),
            };

            handleUpdateReservationData('blocks', [
              ...(listingDetails?.reservation_length?.blocks || []),
              newSeasonalData,
            ])
          }
        }}
      />

      <div key={extraServiceSelected}>
        <AddExtraServiceDialog
          open={showExtraPricingDialog}
          extraServiceIndex={extraServiceSelected}
          onClose={(value, actionType) => {
            setShowExtraPricingDialog(false);
            if (value && actionType == "add") {
              const data = {
                ...value,
                _id: generateUUID(),
              };
              const setData = [...listingDetails.extra_services];
              const setIndex = setData.findIndex(e => e.name == data.name);
              if (setIndex == -1) {
                setData.push(data);
              } else {
                if (data.start_date) {
                  setData[setIndex] = {
                    ...setData[setIndex],
                    blocks: [
                      ...setData[setIndex].blocks,
                      { ...data },
                    ]
                  }
                } else {
                  setData[setIndex] = {
                    ...setData[setIndex],
                    ...data
                  }
                }
              }
              handleChangeListingDetails("extra_services", setData);
            }
            if (value && actionType == "edit") {
              const newExtraServiceData = value;
              const data = listingDetails["extra_services"].map((item) => {
                if (item._id == newExtraServiceData._id) {
                  return newExtraServiceData;
                }
                return item;
              });
              handleChangeListingDetails("extra_services", [...data]);
            }
          }}
        />
      </div>


      <div key={extraServiceSelected}>
        <AddLongTermDialog
          open={showExtraDiscountPricingDialog}
          extraServiceIndex={extraDiscountSelected}
          onClose={(value, actionType) => {
            setShowExtraDiscountPricingDialog(false);
            if (value && actionType == "add") {
              const data = {
                ...value,
                _id: generateUUID(),
              };
              const setData = [...listingDetails.long_term_discount];
              const setIndex = setData.findIndex(e => e.min_days == data.min_days);
              if (setIndex == -1) {
                setData.push(data);
              } else {
                if (data.start_date) {
                  setData[setIndex] = {
                    ...setData[setIndex],
                    blocks: [
                      ...setData[setIndex].blocks,
                      { ...data },
                    ]
                  }
                } else {
                  setData[setIndex] = {
                    ...setData[setIndex],
                    ...data
                  }
                }
              }
              handleChangeListingDetails("long_term_discount", setData);
            }
            if (value && actionType == "edit") {
              const newExtraServiceData = value;
              const data = listingDetails["long_term_discount"].map((item) => {
                if (item._id == newExtraServiceData._id) {
                  return newExtraServiceData;
                }
                return item;
              });
              handleChangeListingDetails("long_term_discount", [...data]);
            }
          }}
        />
      </div>

      <GroupWrapper name="Pricing" containerClass="md:hidden">
        <div className="grid grid-cols-2 gap-8 mt-6 md:grid-cols-1 md:mt-0">
          <PriceInput
            title="Base price"
            value={listingDetails?.basic_pricing?.base_price}
            onChange={(value) =>
              handleUpdatePricingData("base_price", +value)
            }
          />
          <PriceInput
            title="Weekend price"
            value={listingDetails?.basic_pricing?.weekend_price}
            onChange={(value) =>
              handleUpdatePricingData("weekend_price", +value)
            }
          />
          <div>
            <p>One week +</p>
            <div className="flex items-center">
              <Select
                containerClass="mr-10 mt-4"
                buttonContent={
                  <div className="flex gap-2 items-center">
                    <p>{discount.find(v => v.value == discount1)?.key}</p>
                    <Image src={ArrowDownIcon} alt="down" />
                  </div>
                }
                options={discount}
                onChange={(value) => setDiscount1(value as string)}
                listPaperClass="border border-grey max_index !top-auto"
              />
              <div className="w-[100%]">
                <PriceInput
                  title=""
                  value={discount1_1}
                  onChange={(value) =>
                    setDiscount1_1(+value)
                  }
                />
              </div>
            </div>
          </div>
          <div>
            <p>One month +</p>
            <div className="flex items-center">
              <Select
                containerClass="mr-10 mt-4"
                buttonContent={
                  <div className="flex gap-2 items-center">
                    <p>{discount.find(v => v.value == discount2)?.key}</p>
                    <Image src={ArrowDownIcon} alt="down" />
                  </div>
                }
                options={discount}
                onChange={(value) => setDiscount2(value as string)}
                listPaperClass="border border-grey max_index !top-auto"
              />
              <div className="w-[100%]">
                <PriceInput
                  title=""
                  value={discount2_2}
                  onChange={(value) =>
                    setDiscount2_2(+value)
                  }
                />
              </div>
            </div>
          </div>

          <PriceInput
            title="Price for additional guest +"
            value={listingDetails?.extra_guests?.additional_cost}
            onChange={(value) => handleUpdateExtraData("additional_cost", +value)}
          />
          <PriceInput
            title="Security Deposit +"
            value={listingDetails?.basic_pricing?.security_deposit}
            onChange={(value) => handleUpdatePricingData("security_deposit", +value)}
          />
        </div>
      </GroupWrapper>
      <Divider className="my-6" />
      <div>
        <GroupWrapper
          name="Block price"
          description="Discover our flexible pricing options to match your preferences and budget."
          action={
            <FilledButton
              text="Add"
              onClick={() => {
                setShowCalendarDialog("add");
                setSeasonalPricingSelected(-1);
              }}
              buttonClass="px-6 mr-4 text-lg md:hidden"
            />
          }
          descriptionClass="text-xl md:text-sm"
          containerClass="md:!mb-5"
        >
          {listingDetails?.basic_pricing?.blocks && listingDetails?.basic_pricing?.blocks.length > 0 && listingDetails?.basic_pricing?.blocks?.map((item, idx) => (
            <div key={idx} className="mt-6 first:mt-0">
              <PricingCard
                hideText
                hideEdit
                onEditClick={() => {
                  setShowCalendarDialog("edit");
                  setSeasonalPricingSelected(idx);
                }}
                onRemoveClick={() =>
                  setShowConfirm({
                    id: item._id,
                    key: "season",
                  })
                }
                pricing={item.base_price}
                content={contentPrice(item)}
                title={`${getRangeBetweenDates2(item.start_date, item.end_date)} ${item.notes ? `- ${item.notes}` : ''}`}
              />
            </div>
          ))}
        </GroupWrapper>
        <div className="block md-m:hidden">
          <PricingCardMobile
            title="Add New"
            onbuttonclick={() => {
              setShowCalendarDialog("add");
              setSeasonalPricingSelected(-1);
            }}
          />
        </div>
      </div>
      <Divider className="my-6 md:mt-5 " />

      {/*Extra Service Section */}
      <div className="mt-5">
        <GroupWrapper
          name="Extra service"
          description="Enhance your stay and make it truly memorable by adding."
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
          descriptionClass="text-xl md:text-sm"
          containerClass="md:!mb-5"
        >
          {listingDetails.extra_services?.map((item, idx) => (
            <div key={idx} className="mt-6 first:mt-0">
              <PricingCard
                onEditClick={() => {
                  setExtraServiceSelected(idx);
                  setShowExtraPricingDialog("edit");
                }}
                hideText
                onRemoveClick={() =>
                  setShowConfirm({
                    id: item._id,
                    key: "extra_services",
                  })
                }
                amount_type={item.amount_type}
                pricing={item.amount}
                title={item.name}
                content={contentPer(item)}
              />
              {item?.blocks && item?.blocks.length > 0 && item.blocks.map((v1: any) => {
                return <div key={v1._id} className="pl-10 mt-2">
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
                        key: "extra_services",
                      })
                    }
                  />
                </div>
              })}
            </div>
          ))}
        </GroupWrapper>
        <div className="md-m:hidden">
          <PricingCardMobile
            title="Add New"
            onbuttonclick={() => {
              setShowExtraPricingDialog("add");
              setExtraServiceSelected(-1);
            }}
          />
        </div>
      </div>

      <Divider className="my-6" />
      <div>
        <GroupWrapper
          name="Guest"
          description="Price for additional guest."
          action={
            <FilledButton
              text="Add"
              onClick={() => {
                setShowCalendarGuest("add");
                setGuestPricingSelected(-1);
              }}
              buttonClass="px-6 mr-4 text-lg md:hidden"
            />
          }
          descriptionClass="text-xl md:text-sm"
          containerClass="md:!mb-5"
        >
          {listingDetails?.extra_guests?.blocks && listingDetails?.extra_guests?.blocks.length > 0 && listingDetails?.extra_guests?.blocks?.map((item, idx) => (
            <div key={idx} className="mt-6 first:mt-0">
              <PricingCard
                hideText
                hideEdit
                onEditClick={() => {
                  setShowCalendarGuest("edit");
                  setGuestPricingSelected(idx);
                }}
                onRemoveClick={() =>
                  setShowConfirm({
                    id: item._id,
                    key: "extra_guests",
                  })
                }
                pricing={item.additional_cost}
                title={`${item.max_free} Guest`}
                content={`${getRangeBetweenDates2(item.start_date, item.end_date)} ${item.notes ? `- ${item.notes}` : ''}`}
              />
            </div>
          ))}
        </GroupWrapper>
        <div className="block md-m:hidden">
          <PricingCardMobile
            title="Add New"
            onbuttonclick={() => {
              setShowCalendarGuest("add");
              setGuestPricingSelected(-1);
            }}
          />
        </div>
      </div>


<Divider className="my-6" />
<div>
  <GroupWrapper
    name="Discount"
    description="Long term discount"
    action={
      <FilledButton
        text="Add"
        onClick={() => {
          setShowExtraDiscountPricingDialog("add");
          setExtraDiscountSelected(-1);
        }}
        buttonClass="px-6 mr-4 text-lg md:hidden"
      />
    }
    descriptionClass="text-xl md:text-sm"
    containerClass="md:!mb-5"
  >
    {listingDetails.long_term_discount?.map((item, idx) => (
      <div key={idx} className="mt-6 first:mt-0">
        <PricingCard
          onEditClick={() => {
            setExtraDiscountSelected(idx);
            setShowExtraDiscountPricingDialog("edit");
          }}
          hideText
          onRemoveClick={() =>
            setShowConfirm({
              id: item._id,
              key: "long_term_discount",
            })
          }
          pricing={item.discount_amount}
          amount_type={item.discount_type}
          title={`${item.min_days} Day`}
        />
        {item?.blocks && item?.blocks.length > 0 && item.blocks.map((v1: any) => {
          return <div key={v1._id} className="pl-10 mt-2">
            <PricingCard
              hideText
              hideEdit
              pricing={v1.discount_amount}
              amount_type={v1.discount_type}
              title={`${getRangeBetweenDates2(v1.start_date, v1.end_date)}`}
              onRemoveClick={() =>
                setShowConfirm({
                  id: idx,
                  sub_id: v1._id,
                  key: "long_term_discount",
                })
              }
            />
          </div>
        })}
      </div>
    ))}
  </GroupWrapper>
  <div className="block md-m:hidden">
    <PricingCardMobile
      title="Add New"
      onbuttonclick={() => {
        setShowExtraDiscountPricingDialog("add");
        setExtraDiscountSelected(-1);
      }}
    />
  </div>
</div>


<Divider className="my-6" />
<div>
  <GroupWrapper
    name="Reservation"
    description="Block Reservation"
    action={
      <FilledButton
        text="Add"
        onClick={() => {
          setShowReservationType("add");
          setReservationKey(-1);
        }}
        buttonClass="px-6 mr-4 text-lg md:hidden"
      />
    }
    descriptionClass="text-xl md:text-sm"
    containerClass="md:!mb-5"
  >
    {listingDetails.reservation_length?.blocks && listingDetails.reservation_length?.blocks.length > 0 && listingDetails.reservation_length?.blocks?.map((item, idx) => (
      <div key={idx} className="mt-6 first:mt-0">
        <PricingCard
          onEditClick={() => {
            setShowReservationType("edit");
            setReservationKey(idx);
          }}
          hidePrice
          hideText
          hideEdit
          onRemoveClick={() =>
            setShowConfirm({
              id: item._id,
              key: "reservation_length",
            })
          }
          pricing={item.discount_amount}
          amount_type={item.discount_type}
          title={`${item.min_days} min - ${item.max_days} max`}
          content={`${getRangeBetweenDates2(item.start_date, item.end_date)}`}
        />
      </div>
    ))}
  </GroupWrapper>
  <div className="block md-m:hidden">
    <PricingCardMobile
      title="Add New"
      onbuttonclick={() => {
        setShowReservationType("add");
        setReservationKey(-1);
      }}
    />
  </div>
</div>

    </div>
  );
}

interface PropertyContentProps { }
