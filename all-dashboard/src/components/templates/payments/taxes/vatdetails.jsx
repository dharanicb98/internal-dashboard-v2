import NeedHelpCard from "../common/needHelpCard";
import OutlinedInput from "../common/outlinedInput";
import { FilledButton } from "ui/buttons";
const VatDetails = ({ taxPage, setTaxPage }) => {
  return (
    <div
      className={`${
        taxPage != "vatdetails" ? "hidden" : "block"
      } my-6 overflow-y-auto dark-scrollbar md:mb-[76px]`}
    >
      <div className="flex gap-8 justify-between flex-wrap">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex gap-3">
            <button onClick={() => setTaxPage("taxpayer")}>
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.36455 14.364L2.00059 8L8.36456 1.63604"
                  stroke="black"
                  strokeWidth="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <span className="font-medium text-xl">Add VAT ID Number</span>
          </div>
          <OutlinedInput
            onChange={(e) => console.log(e.target.value)}
            // value={""}
            label={"Country"}
          />
          <OutlinedInput
            onChange={(e) => console.log(e.target.value)}
            // value={""}
            label={"Region"}
          />
          <OutlinedInput
            onChange={(e) => console.log(e.target.value)}
            // value={""}
            label={"Add Vat Number"}
          />
          <OutlinedInput
            onChange={(e) => console.log(e.target.value)}
            // value={""}
            label={"Name of Registration"}
          />
          <OutlinedInput
            onChange={(e) => console.log(e.target.value)}
            // value={""}
            label={"Address"}
          />
          <OutlinedInput
            onChange={(e) => console.log(e.target.value)}
            value={""}
            label={"Postcode"}
          />
        </div>
        <div>
          <NeedHelpCard />
        </div>
      </div>
      <div className="flex justify-end mt-7">
        <FilledButton
          text="Update"
          onClick={() => {}}
          buttonClass="px-6 px-2.5 text-base font-normal"
        />
      </div>
    </div>
  );
};

export default VatDetails;
