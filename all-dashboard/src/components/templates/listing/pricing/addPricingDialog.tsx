import moment from "moment";
import React from "react";
import Calendar from "ui/calendar";
import Dialog from "ui/dialog";
import EditableTextField from "ui/input/editableTextfield";
import TransparentInput from "ui/input/transparentInput";
import { FilledButton } from "ui/buttons";
import ConfirmDialog from "ui/dialog/confirmDialog";
import Counter from "ui/input/counter";
import { useListingDetailsSelector } from "store/selectors/listing";
import Image from "next/image";
import CloseIcon from "assets/icons/close-rounded.svg";

export default function AddPricingDialog(props: AddPricingDialogProps) {
  const { open, onClose, selectedSeasonalIndex, onRemoveClick } = props;
  const listingdetails = useListingDetailsSelector();
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [seasonalData, setSeasonalData] = React.useState({
    startDate: null,
    endDate: null,
    basePrice: "",
    weekendPrice: "",
    securityPrice: "",
    maxDays: 0,
    minDays: 0,
    name: "",
  });

  React.useEffect(() => {
    const selectedSeason = listingdetails?.season[selectedSeasonalIndex] || {};
    if (open == "edit") {
      setSeasonalData({
        startDate: selectedSeason.start,
        endDate: selectedSeason.end,
        basePrice: selectedSeason.base_price,
        weekendPrice: selectedSeason.weekend_price,
        maxDays: selectedSeason.max_days,
        minDays: selectedSeason.min_days,
        name: selectedSeason.title || selectedSeason.name,
        id: selectedSeason._id,
      });
    } else {
      setSeasonalData({
        startDate: null,
        endDate: null,
        basePrice: "",
        weekendPrice: "",
        maxDays: 0,
        minDays: 0,
        name: "",
        id: "",
      });
    }
  }, [selectedSeasonalIndex, open]);

  const handleSeasonalData = (key: string, value: any) => {
    setSeasonalData((prev) => ({ ...prev, [key]: value }));
  };

  const validateSeasonData = (data) => {
    if (data.startDate === null || data.endDate === null) {
      //Put validation message here with dilog
      return false;
    }

    if (data.basePrice === "" || data.weekendPrice === "" || data.securityPrice === "") {
      //Put validation message here with dilog
      return false;
    }

    // if (data.name === "") {
    //   //Put validation message here with dilog
    //   return false;
    // }

    return true;
  };

  return (
    <>
      <ConfirmDialog
        confirmText="Are you sure you want remove?"
        confirmAction={() => setShowConfirm(false)}
        declineAction={() => setShowConfirm(false)}
        open={showConfirm}
      />
      <Dialog open={open} onClose={() => onClose()}>
        <div className="bg-white p-6 md:p-4 rounded-2xl flex md:flex-col">
          <div>
            {/* <div>
              <p className="text-grey-dark">Name {"(Season)"}</p>
              <EditableTextField
                defaultValue={seasonalData.name}
                handleChange={(value) => handleSeasonalData("name", value)}
                containerClass="mr-6"
              />
            </div> */}
            <Calendar
              startDate={seasonalData.startDate}
              endDate={seasonalData.endDate}
              setEndDate={(value) => handleSeasonalData("endDate", value)}
              setStartDate={(value) => handleSeasonalData("startDate", value)}
              daySize={60}
              numberOfMonths={1}
              basePrice={seasonalData.basePrice}
              weekendPrice={seasonalData.weekendPrice}
              currencySymbol={
                listingdetails.hasOwnProperty("currency_symbol")
                  ? listingdetails.currency_symbol
                  : "$"
              }
            />
          </div>
          <div>
            <Image
              src={CloseIcon}
              alt="close"
              width={26}
              height={26}
              className="cursor-pointer md:!w-6 md:!h-6 text-primary underline ml-auto flex"
              onClick={onClose}
            />
            <p className="text-xl mt-2">Set Price</p>

            <div className="grid grid-cols-1 divide-y divide-grey">
              <div className="flex items-center justify-between py-4">
                <p className="shrink-0">Base price</p>
                <TransparentInput
                  type="number"
                  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                  onChange={(value) => handleSeasonalData("basePrice", value)}
                  value={seasonalData.basePrice}
                  className="text-[24px] font-medium text-right pr-0 flex-1"
                />
                <div className="flex items-center">
                  <p className="text-[24px] font-medium">$</p>
                  <p className="shrink-0 text-grey-dark">/per night</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="shrink-0">Weekend price</p>
                <TransparentInput
                  type="number"
                  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                  onChange={(value) =>
                    handleSeasonalData("weekendPrice", value)
                  }
                  value={seasonalData.weekendPrice}
                  className="text-[24px] font-medium text-right pr-0 flex-1"
                />
                <div className="flex items-center">
                  <p className="text-[24px] font-medium">$</p>
                  <p className="shrink-0 text-grey-dark">/per night</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <p className="shrink-0">Security Deposit</p>
                <TransparentInput
                  type="number"
                  onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                  onChange={(value) =>
                    handleSeasonalData("securityPrice", value)
                  }
                  value={seasonalData.securityPrice}
                  className="text-[24px] font-medium text-right pr-0 flex-1"
                />
                <div className="flex items-center">
                  <p className="text-[24px] font-medium">$</p>
                  <p className="shrink-0 text-grey-dark">/per night</p>
                </div>
              </div>
              {/* <div className="flex items-center justify-between py-4">
                <p className="shrink-0">Max Days</p>
                <Counter
                  count={seasonalData.maxDays}
                  incrementHandler={() =>
                    handleSeasonalData("maxDays", seasonalData.maxDays + 1)
                  }
                  decrementHandler={() => {
                    if (seasonalData.maxDays > 0) {
                      handleSeasonalData("maxDays", seasonalData.maxDays - 1);
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between py-4 ">
                <p className="shrink-0">Min Days</p>
                <Counter
                  count={seasonalData.minDays}
                  incrementHandler={() =>
                    handleSeasonalData("minDays", seasonalData.minDays + 1)
                  }
                  decrementHandler={() => {
                    if (seasonalData.minDays > 0) {
                      handleSeasonalData("minDays", seasonalData.minDays - 1);
                    }
                  }}
                />
              </div> */}
            </div>
            {open == "add" && (
              <FilledButton
                text="Add"
                buttonClass="w-2/5 ml-auto flex justify-center mt-2"
                onClick={() => {
                  if (validateSeasonData(seasonalData)) {
                    onClose(seasonalData, "add");
                  }
                }}
              />
            )}
            {open == "edit" && (
              <FilledButton
                text="Edit"
                buttonClass="w-2/5 ml-auto flex justify-center mt-2"
                onClick={() => {
                  if (validateSeasonData(seasonalData)) {
                    onClose(seasonalData, "edit");
                  }
                }}
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}

interface AddPricingDialogProps {
  open: string;
  selectedSeasonalIndex: number;
  onClose: VoidFunction;
  onRemoveClick: VoidFunction;
}