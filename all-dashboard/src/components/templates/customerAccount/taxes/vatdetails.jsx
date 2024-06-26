import { useEffect, useState } from "react";
import NeedHelpCard from "../common/needHelpCard";
import OutlinedInput from "../common/outlinedInput";
import { FilledButton } from "ui/buttons";
import { getVatPayerByUserId, updateVatPayer } from "../../../../services/account/taxPayer";

const VatDetails = ({ taxPage, setTaxPage }) => {
  const [vatPayerData, setVatPayerData] = useState({})
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    (async () => {
       try {
        const userDetails = localStorage?.getItem('token');
        const parseData = JSON.parse(userDetails)

         if (parseData?.user_id) {
            const response = await getVatPayerByUserId( parseData?.user_id)
            setVatPayerData(response?.data)     
         }
       }
       catch (e) {
         console.log('error', e)
       }
    })()
  }, [showLoader])

  const handleOnChange = (e, key ) => {
    let value = e.target.value 
    setVatPayerData((prev) => { return {...prev, [key]:value}})
  }

  const handleUpdate = async ( ) => {
    try {
      const userDetails = localStorage?.getItem('token');
      const parseData = JSON.parse(userDetails)
      if ( parseData?.user_id ) {
        const data = await updateVatPayer(parseData?.user_id ,  vatPayerData )
        setShowLoader((prev) => !prev)
        return data
      }
    }
    catch ( e ) {
      alert( e )
    }
  }



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
            onChange={(e) => handleOnChange(e, 'vat_country')}
            value={vatPayerData?.vat_country}
            label={"Country"}
          />
          <OutlinedInput
           onChange={(e) => handleOnChange(e, 'vat_region')}
           value={vatPayerData?.vat_region}
            label={"Region"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'vat_number')}
            value={vatPayerData?.vat_number}
            label={"Add Vat Number"}
          />
          <OutlinedInput
           onChange={(e) => handleOnChange(e, 'vat_registration')}
           value={vatPayerData?.vat_registration}
            label={"Name of Registration"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'vat_address')}
            value={vatPayerData?.vat_address}
            label={"Address"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'vat_postcode')}
            value={vatPayerData?.vat_postcode}
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

export default VatDetails;
