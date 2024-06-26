import React, { useState } from "react";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import Image from "next/image";
import CloseRoundedIcon from "assets/icons/close-rounded.svg";
import Dialog from "ui/dialog";
import { FilledButton } from "ui/buttons";
import Divider from "ui/divider";
import TransparentInput from "ui/input/transparentInput";

export default function CreateCoupon({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("someOption");
  const [property, setProperty] = useState("someOption");
  const [amount, setAmount] = useState("15%");

  const handleCreate = () => {
    // Log the input field values
    console.log("Title:", title);
    console.log("Discount:", discount);
    console.log("Property:", property);
    console.log("Amount:", amount);

    //close function trigger
    onClose();
  };

  const handletitleChange = (value) => {
    setTitle(value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="bg-white w-[450px] p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button onClick={onClose}>
              <Image src={ChevronLeftIcon} alt="chevron-left" />
            </button>
            <div className="text-[32px] font-medium">Coupons</div>
          </div>
          <div>
            <button onClick={onClose}>
              <Image src={CloseRoundedIcon} alt="close-icon" />
            </button>
          </div>
        </div>
        <div>
          <h6 className="text-grey-dark">Title</h6>
          <TransparentInput
            className="px-0 text-[18px]"
            placeholder="Coupon 15"
            onChange={handletitleChange}
            value={title}
          />
        </div>
        <Divider className="my-2" />
        <div>
          <h6 className="text-grey-dark">Discount</h6>
          <select
            className="w-full border border-none"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
          >
            <option value="someOption">Min stays of 15 days</option>
            <option value="otherOption">Min stays of 15 days</option>
          </select>
        </div>
        <Divider className="my-2" />
        <div>
          <h6 className="text-grey-dark">Select Property</h6>
          <select
            className="w-full border border-none"
            onChange={(e) => setProperty(e.target.value)}
            value={property}
          >
            <option value="someOption">5BR Lake House</option>
            <option value="otherOption">5BR Lake House</option>
          </select>
        </div>
        <Divider className="my-2" />
        <div>
          <h6 className="text-grey-dark">Amount</h6>
          <select
            className="w-full border border-none"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          >
            <option value="15%">15%</option>
            <option value="20%">20%</option>
          </select>
        </div>
        <Divider className="my-2" />
        <div className="text-base font-normal mt-[100px]">
          <div className="flex justify-center">
            {"We'll share the invoice over the mail also."}
          </div>
          <div className="flex justify-center">
            {"Don't hesitate to get in touch."}
          </div>
        </div>
        <FilledButton
          text="Create"
          buttonClass="w-full"
          onClick={handleCreate}
        />
      </div>
    </Dialog>
  );
}
