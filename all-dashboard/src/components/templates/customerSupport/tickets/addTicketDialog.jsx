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

function AddTicketDialog({ open, setOpen }) {
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [customDiscount, setCustomDiscount] = useState("");
  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      contentClass={
        "h-full w-[95%] md-m:w-[425px] bg-[#fff] p-4 rounded-xl max-h-[536px]"
      }
    >
      <div className="relative h-full overflow-y-scroll">
        <p className="text-3xl">New Ticket</p>
        <p className="text-[#5C5C5C]">19874544</p>
        <div className="mt-10 flex flex-col gap-8">
          <div>
            <p className="text-[#6B6B6B]">Email</p>
            <input
              className={
                "w-full !outline-none placeholder:font-normal placeholder:text-[#6B6B6B] text-xl font-medium px-0 py-2 border-0 border-b border-b-[#D9D9D9]"
              }
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              // placeholder={"Type Email here"}
              type="email"
            />
          </div>
        </div>
        {/* <DatesContainer
          fromValue={startDate}
          toValue={endDate}
          onChange={(key, value) => onChange(key, value)}
          fromTitle="From"
          toTitle="Untl"
          fromKey="check_in_time"
          toKey="check_out_time"
        /> */}

        {/* <Calendar
          startDate={startDate}
          endDate={endDate}
          setEndDate={(value) => setEndDate(value)}
          setStartDate={(value) => setStartDate(value)}
          daySize={50}
          basePrice={""}
          weekendPrice={""}
          currencySymbol={""}
        /> */}
        {/* <div className="mb-4"> */}
        {/* <p className="mb-3">Discount</p> */}
        {/* <Select
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
          /> */}
        {/* </div> */}

        {/* <p className="mb-3">Custom Discount</p> */}
        {/* <OutlinedInput
          className={"rounded-lg p-2 !border-grey border w-full text-base mb-3"}
          onChange={(e) => setCustomDiscount(e.target.value)}
          value={customDiscount}
          label={"Enter Discount"}
        /> */}
        {/* <div className="flex w-full bg-[#fff] absolute sticky left-0 bottom-0">
          <FilledButton
            text="Generate Offer"
            onClick={() => {}}
            buttonClass="px-6 px-2.5 text-base font-normal "
          />
        </div> */}
      </div>
    </Dialog>
  );
}

export default AddTicketDialog;