import { useEffect, useState } from "react";
import NeedHelpCard from "../common/needHelpCard";
import OutlinedInput from "../common/outlinedInput";
import { FilledButton } from "ui/buttons";
import { updateTaxPayer, getTaxPayerByUserId } from "../../../../services/account/taxPayer";
// import Loader from "../../../../ui/loader";


const TaxDetails = ({ taxPage, setTaxPage }) => {
  const [taxPayerData, setTaxPayerData] = useState({})
  const [showLoader, setShowLoader] = useState(true)



  useEffect(() => {
    (async () => {
       try {
        const userDetails = localStorage?.getItem('token');
        const parseData = JSON.parse(userDetails)

         if (parseData?.user_id) {
            const response = await getTaxPayerByUserId( parseData?.user_id)
            console.log('response', response.data)
            setTaxPayerData(response?.data)     
         }
       }
       catch (e) {
         console.log('error', e)
       }
    })()
  }, [])

  const handleOnChange = (e, key ) => {
    let value = e.target.value 
    setTaxPayerData((prev) => { return {...prev, [key]:value}})
  }

  const handleUpdate = async ( ) => {
    try {
      const userDetails = localStorage?.getItem('token');
      const parseData = JSON.parse(userDetails)
      if ( parseData?.user_id ) {
        const data = await updateTaxPayer(parseData?.user_id ,  taxPayerData )
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
        taxPage != "taxdetails" ? "hidden" : "block"
      } my-6 overflow-y-auto dark-scrollbar md:mb-[76px] `}
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
            onChange={(e) => handleOnChange(e, 'tax_payer_name')}
            value={taxPayerData?.tax_payer_name}
            label={"Name"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'tax_payer_region')}
            value={taxPayerData?.tax_payer_region}
            label={"Region"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'tax_payer_number')}
            value={taxPayerData?.tax_payer_number}
            label={"Tax Payer Number"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'tax_payer_registration')}
            value={taxPayerData?.tax_payer_registration}
            label={"Name of Registration"}
          />
          <OutlinedInput
            onChange={(e) => handleOnChange(e, 'tax_payer_address')}
            value={taxPayerData?.tax_payer_address}
            label={"Address"}
          />
          <OutlinedInput
             onChange={(e) => handleOnChange(e, 'tax_payer_postcode')}   
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

      {/* {showLoader && <Loader/>} */}
    </div>
  );
};



// const Loader = ({ className }) => {
//   return (
//     <div className={`flex justify-center w-full h-full absolute  top-[60%] ${className}`} role="status">
//     <svg aria-hidden="true" class="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//       </svg>
//     <span class="sr-only">Loading...</span>
//   </div>
//   )
// }

export default TaxDetails;
