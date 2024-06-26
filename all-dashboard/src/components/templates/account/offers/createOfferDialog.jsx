import { useState } from "react";
import Dialog from "ui/dialog";
import Calendar from "ui/calendar";
// import DatesContainer from "./datesContainer";
import DatesContainer from "ui/datesContainer";
import { FilledButton } from "ui/buttons";
import Select from "ui/input/select";
import OutlinedInput from "src/ui/input/outlinedInput";
import ArrowDownIcon from "assets/icons/arrow-down.svg";
import Image from "next/image";
const discountList = [
  {
    key: "0-5%",
    value: "0-5%",
  },
  {
    key: "5%-10%",
    value: "5%-10%",
  },
  {
    key: "10%-20%",
    value: "10%-20%",
  },
];

function CreateOfferDialog({ offerOpen, setOfferOpen }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [customDiscount, setCustomDiscount] = useState("");
  return (
    <Dialog
      onClose={() => setOfferOpen(false)}
      open={offerOpen}
      contentClass={
        "h-full w-[95%] md-m:w-[425px] bg-[#fff] p-4 rounded-xl max-h-[536px]"
      }
    >
      <div className="relative h-full overflow-y-scroll">
        <p className="mb-3">Dates</p>
        <DatesContainer
          fromValue={startDate}
          toValue={endDate}
          onChange={(key, value) => onChange(key, value)}
          fromTitle="From"
          toTitle="Untl"
          fromKey="check_in_time"
          toKey="check_out_time"
        />

        <Calendar
          startDate={startDate}
          endDate={endDate}
          setEndDate={(value) => setEndDate(value)}
          setStartDate={(value) => setStartDate(value)}
          daySize={50}
          basePrice={""}
          weekendPrice={""}
          currencySymbol={""}
        />
        <div className="mb-4">
          <p className="mb-3">Discount</p>
          <Select
            listPaperClass="w-full shadow-base"
            buttonContent={
              <div className="flex justify-between items-center border border-grey p-2 rounded-lg">
                <p>{selectedDiscount?.key || "Select Discount"}</p>
                <Image src={ArrowDownIcon} alt="down" />
              </div>
            }
            options={discountList.map((item) => ({
              ...item,
              key: (
                <div className="flex justify-between items-center">
                  <p>{item.key}</p>
                </div>
              ),
            }))}
            onChange={(val) => {
              const selected = discountList.find(
                (discount) => discount.value == val
              );
              setSelectedDiscount(selected);
            }}
          />
        </div>

        <p className="mb-3">Custom Discount</p>
        <OutlinedInput
          className={"rounded-lg p-2 !border-grey border w-full text-base mb-3"}
          onChange={(e) => setCustomDiscount(e.target.value)}
          value={customDiscount}
          label={"Enter Discount"}
        />
        <div className="flex w-full bg-[#fff] absolute sticky left-0 bottom-0">
          <FilledButton
            text="Generate Offer"
            onClick={() => {}}
            buttonClass="px-6 px-2.5 text-base font-normal "
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CreateOfferDialog;
