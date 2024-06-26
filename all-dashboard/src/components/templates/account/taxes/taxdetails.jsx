import { useEffect, useState } from "react";
import NeedHelpCard from "../common/needHelpCard";
import OutlinedInput from "../common/outlinedInput";
import { FilledButton } from "ui/buttons";
import { updateTaxPayer, getTaxPayerByUserId } from "../../../../services/account/taxPayer";

const TaxDetails = ({ taxPage, setTaxPage }) => {
  const [taxPayerData, setTaxPayerData] = useState({});
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userDetails = localStorage?.getItem("token");
        const parseData = JSON.parse(userDetails);

        if (parseData?.user_id) {
          const response = await getTaxPayerByUserId(parseData?.user_id);
          console.log("response", response.data);
          setTaxPayerData(response?.data);
        }
      } catch (e) {
        console.log("error", e);
      }
    })();
  }, []);

  const handleOnChange = (e, key) => {
    let value = e.target.value;
    setTaxPayerData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleUpdate = async () => {
    try {
      const userDetails = localStorage?.getItem("token");
      const parseData = JSON.parse(userDetails);
      if (parseData?.user_id) {
        const data = await updateTaxPayer(parseData?.user_id, taxPayerData);
        return data;
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      className={`${
        taxPage != "taxdetails" ? "hidden" : "block"
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
            <span className="font-medium text-xl">Tax Payer Details</span>
          </div>
          <OutlinedInput
            onChange={(e) => handleOnChange(e, "tax_payer_name")}
            value={taxPayerData?.tax_payer_name}
            label={"Name"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, "tax_payer_region")}
            value={taxPayerData?.tax_payer_region}
            label={"Region"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, "tax_payer_number")}
            value={taxPayerData?.tax_payer_number}
            label={"Tax Payer Number"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, "tax_payer_registration")}
            value={taxPayerData?.tax_payer_registration}
            label={"Name of Registration"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, "tax_payer_address")}
            value={taxPayerData?.tax_payer_address}
            label={"Address"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, "tax_payer_postcode")}
            value={taxPayerData?.tax_payer_postcode}
            label={"Postcode"}
          />
        </div>
        <div className="block md-1:hidden">
          <NeedHelpCard />
        </div>
      </div>
      <div className="flex justify-end mt-7">
        <FilledButton
          text="Update"
          onClick={handleUpdate}
          buttonClass="px-6 px-2.5 text-base font-normal"
        />
      </div>
    </div>
  );
};

export default TaxDetails;
