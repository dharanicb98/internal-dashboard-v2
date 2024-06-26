import React, { useEffect, useState } from "react";
import Image from "next/image";
import CloseRounded from "assets/icons/close.svg";
import { format } from "date-fns";
import {
  blockCalendarDates,
  unBlockCalendarDates,
  setNewPrice,
} from "services/calendar/apis";
import Dialog from "ui/dialog";
import Textarea from "ui/input/textarea";
import { useSelector } from "react-redux";
import PriceInput from "components/templates/listing/pricing/priceInput";

const CalendarPopup = ({
  isOpen,
  onClose,
  selectedFromDate,
  selectedToDate,
  selectedProperty,
}) => {
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [isBlockedDates, setIsBlockedDate] = useState(false);
  const [popupTab, setPopupTab] = useState(true);
  const [loadingBlockDates, setLoadingBlockDates] = useState(false);
  const [blockedSucess, setBlockedSucess] = useState(false);
  const isCalendarDates = useSelector((state) => state.propertylist.calendar);
  const ONE_DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

  useEffect(() => {
    if (selectedFromDate) {
      const from = new Date(selectedFromDate);
      const to = new Date(selectedToDate);
      let formatedFrom = format(from, "yyyy-MM-dd");
      let formatedTo = "";
      if (selectedToDate) {
        formatedTo = format(to, "yyyy-MM-dd");
      } else {
        formatedTo = format(from, "yyyy-MM-dd");
      }

      const totalDays =
        Math.ceil(
          Math.abs(new Date(formatedTo) - new Date(formatedFrom)) /
            ONE_DAY_MILLISECONDS
        ) + 1;

      let setBlocks = false;
      let mPrice = 0;
      let notes = '';
      for (let index = 0; index < totalDays; index++) {
        const element =
          new Date(formatedFrom).getTime() + index * ONE_DAY_MILLISECONDS;
        if (
          isCalendarDates?.[format(new Date(element), "yyyy-MM-dd")]
            ?.isBlocked == "manual"
        )
          setBlocks = true;
        mPrice = isCalendarDates?.[format(new Date(element), "yyyy-MM-dd")]?.price;
        notes = isCalendarDates?.[format(new Date(element), "yyyy-MM-dd")]?.notes;
      }

      setNote(notes);
      setIsBlockedDate(setBlocks);
      setPrice(mPrice);
    }
  }, [selectedFromDate, selectedToDate, selectedProperty, isCalendarDates]);

  const formatDates = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = format(date, "MMM d");
    return formattedDate;
  };

  const blockPropertyDates = (action) => {
    const from = new Date(selectedFromDate);
    const to = new Date(selectedToDate);
    let formatedFrom = format(from, "yyyy-MM-dd");
    let formatedTo = "";

    if (selectedToDate) {
      formatedTo = format(to, "yyyy-MM-dd");
    } else {
      formatedTo = format(from, "yyyy-MM-dd");
    }
    const payload = {
      listing_id: selectedProperty?.listing_id,
      // host_id: "123",
      // from: formatedFrom,
      // to: formatedTo,
      // action: action,
      date_block: [
        {
          start_date: formatedFrom,
          end_date: formatedTo,
        },
      ],
      type: "manual",
      // note: note,
    };

    const update = async () => {
      setLoadingBlockDates(true);
      try {
        if (action == "unblock") {
          await unBlockCalendarDates(payload);
        } else {
          await blockCalendarDates(payload);
        }
        setLoadingBlockDates(false);
        setBlockedSucess(true);
        setTimeout(() => {
          setBlockedSucess(false);
          onClose("refresh");
        }, 1000);
      } catch (error) {
        setLoadingBlockDates(false);
        throw error;
      }
    };

    if (selectedProperty && selectedFromDate) {
      update();
    }
  };

  const setPriceOfDate = () => {
    const from = new Date(selectedFromDate);
    const to = new Date(selectedToDate);
    let formatedFrom = format(from, "yyyy-MM-dd");
    let formatedTo = "";

    if (selectedToDate) {
      formatedTo = format(to, "yyyy-MM-dd");
    } else {
      formatedTo = format(from, "yyyy-MM-dd");
    }
    const payload = {
      listing_id: selectedProperty?.listing_id,
      start_date: formatedFrom,
      end_date: formatedTo,
      price: price,
      note: note,
    };

    (async function () {
      setLoadingBlockDates(true);
      await setNewPrice(payload);
      setTimeout(() => {
        setLoadingBlockDates(false);
        onClose("refresh");
        setNote('');
      }, 10);
    })();
  };

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      contentClass={
        "h-full w-[95%] md-m:w-[425px] bg-[#fff] p-4 rounded-xl max-h-[536px]"
      }
    >
      <div className="w-[100%] h-[100%] relative flex flex-col">
        <Image
          src={CloseRounded}
          alt="close"
          className="absolute top-0 right-0 cursor-pointer"
          onClick={onClose}
        />
        <div className="w-[100%] flex justify-between text-center pt-[35px]">
          <div
            className={`w-[100%] cursor-pointer font-medium text-lg pb-[10px] border-b-2  ${
              popupTab ? "border-[#000000]" : "border-[#D9D9D9]"
            }`}
            onClick={() => setPopupTab(true)}
          >
            Open
          </div>
          <div
            className={`w-[100%] cursor-pointer font-medium text-lg pb-[10px] border-b-2 ${
              !popupTab ? "border-[#000000]" : "border-[#D9D9D9]"
            }`}
            onClick={() => setPopupTab(false)}
          >
            {isBlockedDates ? "Unblock" : "Block"} Date
          </div>
        </div>
        {popupTab && (
          <>
            <div className="flex-1 flex justify-center">
              <div className="flex flex-col w-full">
                <p className="font-medium text-center text-medium text-xl pt-6">
                  {formatDates(selectedFromDate)}{" "}
                  {selectedToDate ? "- " + formatDates(selectedToDate) : ""}
                </p>
                <div className="pt-10">
                  <PriceInput title="Price" value={price} onChange={setPrice} />
                </div>
                <div className="pt-10">
                  <Textarea
                    labelName="Notes"
                    className={"rounded-xl h-[82px] !border-grey"}
                    value={note}
                    onChange={(value) => setNote(value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 absolute w-full bottom-0">
              {/* <button
                className="w-full p-2 text-base font-medium m-auto"
                onClick={() => {}}
              >
                Clear
              </button> */}
              <button
                className={`w-full bg-[#000000] text-[#ffffff] p-2 text-medium font-medium rounded-lg ${
                  isBlockedDates ? `opacity-10` : ``
                }`}
                onClick={() => setPriceOfDate()}
                disabled={isBlockedDates || loadingBlockDates}
              >
                {loadingBlockDates ? "Please Wait..." : "Apply"}
              </button>
            </div>
          </>
        )}

        {!popupTab && (
          <>
            <div className="flex-1 flex justify-center ">
              <div className="flex flex-col text-center">
                <p className="font-medium text-medium text-xl pt-[30px]">
                  {formatDates(selectedFromDate)}{" "}
                  {selectedToDate ? "- " + formatDates(selectedToDate) : ""}
                </p>
                {isBlockedDates ? (
                  <>
                    {blockedSucess ? (
                      <p className="font-normal pt-[24px]">
                        Success! You have unblocked the selected dates for your
                        property. These dates will now be available for booking
                        by guests.
                      </p>
                    ) : (
                      <p className="font-normal pt-[24px]">
                        Selected dates will be unblocked for your property.
                        Click Confirm to unblock dates.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {blockedSucess ? (
                      <p className="font-normal pt-[24px]">
                        Success! You have blocked the selected dates for your
                        property. These dates will now be unavailable for
                        booking by guests.
                      </p>
                    ) : (
                      <p className="font-normal pt-[24px]">
                        Selected dates will be blocked for your property. Click
                        Confirm to block dates.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <button
              className="w-[100%] bg-[#000000] text-[#ffffff] p-2 text-medium font-medium rounded-lg absolute bottom-0 "
              onClick={() =>
                blockPropertyDates(isBlockedDates ? "unblock" : "block")
              }
              disabled={loadingBlockDates || blockedSucess}
            >
              {loadingBlockDates ? "Please Wait..." : "Confirm"}
            </button>
          </>
        )}
      </div>
      {/* <div className="w-[95%] h-[90vh] md-m:w-96  border border-gray-300 rounded-lg p-4 bg-white relative ">
        <div className="w-[100%] h-[100%] relative flex flex-col">
          <Image
            src={CloseRounded}
            alt="close"
            className="absolute top-0 right-0 cursor-pointer"
            onClick={onClose}
          />
          <div className="w-[100%] flex justify-between text-center pt-[35px]">
            <div
              className={`w-[100%] cursor-pointer font-medium text-lg pb-[10px] border-b-2  ${
                popupTab ? "border-[#000000]" : "border-[#D9D9D9]"
              }`}
              onClick={() => setPopupTab(true)}
            >
              Open
            </div>
            <div
              className={`w-[100%] cursor-pointer font-medium text-lg pb-[10px] border-b-2 ${
                !popupTab ? "border-[#000000]" : "border-[#D9D9D9]"
              }`}
              onClick={() => setPopupTab(false)}
            >
              Block Date
            </div>
          </div>
          {popupTab && (
            <>
              <div className="flex-1 flex justify-center">
                <div className="flex flex-col text-center w-full">
                  <p className="font-medium text-medium text-xl pt-6">
                    {formatDates(selectedFromDate)}{" "}
                    {selectedToDate ? "-" + formatDates(selectedToDate) : ""}
                  </p>
                  <div className="pt-6">
                    <Textarea
                      className={"rounded-xl h-[82px] !border-grey"}
                      value={note}
                      onChange={(value) => setNote(value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 absolute w-full bottom-0">
                <button
                  className="w-full p-2 text-base font-medium m-auto"
                  onClick={() => {}}
                >
                  Clear
                </button>
                <button
                  className="w-full bg-[#000000] text-[#ffffff] p-2 text-medium font-medium rounded-lg "
                  onClick={() => blockPropertyDates("unblock")}
                  disabled={loadingBlockDates}
                >
                  {loadingBlockDates ? "Please Wait..." : "Apply"}
                </button>
              </div>
            </>
          )}

          {!popupTab && (
            <>
              <div className="flex-1 flex justify-center ">
                <div className="flex flex-col text-center">
                  <p className="font-medium text-medium text-xl pt-[30px]">
                    {formatDates(selectedFromDate)}{" "}
                    {selectedToDate ? "-" + formatDates(selectedToDate) : ""}
                  </p>
                  {blockedSucess ? (
                    <p className="font-normal pt-[24px]">
                      Success! You have blocked the selected dates for your
                      property. These dates will now be unavailable for booking
                      by guests.
                    </p>
                  ) : (
                    <p className="font-normal pt-[24px]">
                      Selected dates will be blocked for your property. Click
                      Confirm to block dates.
                    </p>
                  )}
                </div>
              </div>
              <button
                className="w-[100%] bg-[#000000] text-[#ffffff] p-2 text-medium font-medium rounded-lg absolute bottom-0 "
                onClick={() => blockPropertyDates("block")}
                disabled={loadingBlockDates}
              >
                {loadingBlockDates ? "Please Wait..." : "Confirm"}
              </button>
            </>
          )}
        </div>
      </div> */}
    </Dialog>
  );
};

export default CalendarPopup;
