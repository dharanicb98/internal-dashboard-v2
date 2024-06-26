import React from "react";
import PaymentCardDetails from "components/templates/payments/payouts/addPayouts/paymentCardDetails";
import Link from "next/link";
import CommonLayout from "../../../../layouts";

export default function AddPayout() {
  return (
    <>
      <div className="text-[32px] font-normal mb-[60px]">Add Payout Method</div>
      <div className="flex gap-7 overflow-auto">
        <PaymentCardDetails />
        <PaymentCardDetails />
        <PaymentCardDetails />
        <PaymentCardDetails />
        <PaymentCardDetails />
      </div>
      <Link href="add-payout-method">
        <button className="mt-[70px] text-white bg-black px-5 py-2.5 rounded-full">
          Add New Payout Method
        </button>
      </Link>
    </>
  );
}

AddPayout.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
