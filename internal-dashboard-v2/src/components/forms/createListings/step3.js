import React, { useEffect, useState } from "react";
import { INPUT_STYLE } from "../../../constants";
import axios from "axios";
import Dialog from "../../../ui/dialog";
// import DatesContainer from "../../../ui/datesContainer";
import Calendar from "../../../ui/calender";
import Toggle from "../../../ui/input/toggle";
import moment from "moment";

function Pricing({ payload, setPayload }) {
  // const [addons, setAddons] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [blocksData, setBlocksData] = useState({
    start_date: null,
    end_date: null,
    base_price: 0,
    weekend_price: 0,
    security_deposit: 0,
  });

  // useEffect(() => {
  //   async function fetchAddons() {
  //     try{
  //       const response = await axios.get('https://rentmyhotel.com/api/v2/attributes/list/addons')
  //       setAddons(response.data.data)
  //     }
  //     catch(e) {
  //       console.log(e)
  //     }
  //   }
  //   fetchAddons()
  // },[])

  //  const handleAddons = (id) => {
  //   let index = payload?.add_ons.indexOf(id)

  //     if (index === -1) {
  //       setPayload((prev) => {return {...prev, add_ons:[...prev.add_ons, id]}})
  //     }
  //     else {
  //       let updateIds = [...payload?.add_ons]
  //       updateIds.splice(index, 1)
  //       setPayload((prev) => {return {...prev, add_ons:[...updateIds]}})
  //     }
  // }

  const blocksDateFormat = (date) => moment(date).format("DD-MM-YYYY"); //blocks date format

  const calendarDateFormat = (date) => moment(date, "DD-MM-YYYY");

  const handlePricing = (e, key) => {
    let value = e.target.value;
    setPayload((prev) => {
      return {
        ...prev,
        basic_pricing: { ...prev.basic_pricing, [key]: value },
      };
    });
  };

  const handleBlocksPricing = (e, key) => {
    let value = e.target.value;
    setBlocksData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleClear = () => {
    setBlocksData({
      start_date: null,
      end_date: null,
      base_price: 0,
      weekend_price: 0,
      security_deposit: 0,
    });
  };

  const handleBlocksData = () => {
    const formatStartDate = blocksDateFormat(blocksData?.start_date);
    const formatEndDate = blocksDateFormat(blocksData?.end_date);

    //create
    if (blocksData?.start_date && blocksData?.end_date && editIndex === null) {
      let updateData = [
        ...payload.basic_pricing.blocks,
        {
          start_date: formatStartDate,
          end_date: formatEndDate,
          base_price: blocksData.base_price,
          weekend_price: blocksData.weekend_price,
          security_deposit: blocksData.security_deposit,
        },
      ];
      setPayload((prev) => {
        return {
          ...prev,
          basic_pricing: { ...prev.basic_pricing, blocks: updateData },
        };
      });
    }
    //update
    else if (
      blocksData?.start_date &&
      blocksData?.end_date &&
      editIndex !== null
    ) {
      let updateData = [...payload.basic_pricing.blocks];
      updateData[editIndex] = {
        start_date: formatStartDate,
        end_date: formatEndDate,
        base_price: blocksData.base_price,
        weekend_price: blocksData.weekend_price,
        security_deposit: blocksData.security_deposit,
      };
      setPayload((prev) => {
        return {
          ...prev,
          basic_pricing: { ...prev.basic_pricing, blocks: updateData },
        };
      });
    }
    setOpenDialog((prev) => !prev);
    setEditIndex(null);
    setBlocksData({
      start_date: null,
      end_date: null,
      base_price: 0,
      weekend_price: 0,
      security_deposit: 0,
    });
  };

  const handleEdit = (index) => {
    const {
      start_date,
      end_date,
      base_price,
      weekend_price,
      security_deposit,
    } = payload.basic_pricing.blocks[index];
    const formatStartDate = calendarDateFormat(start_date);
    const formatEndDate = calendarDateFormat(end_date);
    setBlocksData({
      start_date: formatStartDate,
      end_date: formatEndDate,
      base_price,
      weekend_price,
      security_deposit,
    });
    setEditIndex(index);
    setOpenDialog((prev) => !prev);
  };

  const handleRemove = (index) => {
    const updateData = [...payload.basic_pricing.blocks];
    updateData.splice(index, 1);
    setPayload((prev) => {
      return {
        ...prev,
        basic_pricing: { ...prev.basic_pricing, blocks: updateData },
      };
    });
  };

  //  console.log(payload)

  return (
    <div>
      <h1 className="text-2xl font-semibold">PRICING</h1>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-col w-[30%] mt-5">
          <label className="text-slate-600">
            Base Price ({payload?.currency_symbol})
          </label>
          <input
            type="number"
            onChange={(e) => handlePricing(e, "base_price")}
            value={payload?.basic_pricing?.base_price}
            className={`${INPUT_STYLE}`}
          />
        </div>

        <div className="flex flex-col  w-[30%]  mt-5">
          <label className="text-slate-600">
            Weekend Price ({payload?.currency_symbol})
          </label>
          <input
            onChange={(e) => handlePricing(e, "weekend_price")}
            value={payload?.basic_pricing?.weekend_price}
            className={`${INPUT_STYLE}`}
          />
        </div>

        <div className="flex flex-col w-[30%]  mt-5">
          <label className="text-slate-600">
            Security Deposit ({payload?.currency_symbol})
          </label>
          <input
            type="number"
            value={payload?.basic_pricing?.security_deposit}
            onChange={(e) => handlePricing(e, "security_deposit")}
            className={`${INPUT_STYLE}`}
          />
        </div>

        {/* <div className='flex flex-col w-[45%]  mt-5'>
             <label className='text-slate-600'>One Week Price ({payload?.currency_symbol})</label>
             <input  value={payload?.basic_pricing?.weekend_price} onChange={(e) => handlePricing(e, 'weekend_price')} className={`${INPUT_STYLE}`}  />
           </div>

           <div className='flex flex-col w-[45%]  mt-5'>
             <label className='text-slate-600'>One Month Price ({payload?.currency_symbol})</label>
             <input type='number' value={payload?.basic_pricing?.weekend_price} onChange={(e) => handlePricing(e, 'weekend_price')} className={`${INPUT_STYLE}`}  />
           </div> */}

        {/* <div className='flex flex-col w-[45%]  mt-5'>
             <label className='text-slate-600'>Price per Extra Guest ({payload?.currency_symbol})</label>
             <input type='number' value={payload?.price_per_additional_guest} onChange={(e) => handlePricing(e, 'weekend_price')} className={`${INPUT_STYLE}`}  />
           </div> */}
      </div>
      <div className="flex items-center justify-end mt-5">
        <button onClick={() => setOpenDialog((prev) => !prev)}>
          Block Dates
        </button>
      </div>
      <div className="mt-4">
        {payload?.basic_pricing?.blocks.map((block, idx) => (
          <div
            key={idx}
            className="border p-4 rounded-md flex items-center justify-between my-3"
          >
            <div>
              <p>Base Price</p>
              <p>{block?.base_price}</p>
            </div>

            <div>
              <p>Weekend Price</p>
              <p>{block?.weekend_price}</p>
            </div>

            <div>
              <p>Security Deposit</p>
              <p>{block?.security_deposit}</p>
            </div>

            <div>
              <p>From</p>
              <p>{block?.start_date}</p>
            </div>

            <div>
              <p>To</p>
              <p>{block?.end_date}</p>
            </div>

            <button onClick={() => handleEdit(idx)}>Edit</button>
            <button onClick={() => handleRemove(idx)}>Delete</button>
          </div>
        ))}
      </div>

      <Dialog
        closeModal={setOpenDialog}
        isOpen={openDialog}
        childrenClass={
          "w-[800px] h-[550px] bg-white p-4 rounded-md no-scrollbar dark-scrollbar"
        }
      >
        <div className="flex gap-x-4">
          <div>
            <Calendar
              startDate={blocksData?.start_date}
              endDate={blocksData?.end_date}
              setEndDate={(value) =>
                setBlocksData((prev) => {
                  return { ...prev, end_date: value };
                })
              }
              setStartDate={(value) =>
                setBlocksData((prev) => {
                  return { ...prev, start_date: value };
                })
              }
              daySize={60}
              numberOfMonths={1}
              basePrice={`${
                blocksData?.start_date && blocksData?.end_date
                  ? blocksData?.base_price
                  : ""
              }`}
              weekendPrice={`${
                blocksData?.start_date && blocksData?.end_date
                  ? blocksData?.weekend_price
                  : ""
              }`}
              currencySymbol={"$"}
            />
          </div>

          <div className="w-full mt-4">
            <div>
              <label>Base Price</label>
              <input
                onChange={(e) => handleBlocksPricing(e, "base_price")}
                value={blocksData?.base_price}
                className={`${INPUT_STYLE}`}
              />
            </div>

            <div className="mt-10">
              <label>Weekend Price</label>
              <input
                onChange={(e) => handleBlocksPricing(e, "weekend_price")}
                value={blocksData?.weekend_price}
                className={`${INPUT_STYLE}`}
              />
            </div>

            <div className="mt-10">
              <label>Security Deposit</label>
              <input
                onChange={(e) => handleBlocksPricing(e, "security_deposit")}
                value={blocksData?.security_deposit}
                className={`${INPUT_STYLE}`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleBlocksData}>
            {editIndex === null ? "Apply" : "Update"}
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default Pricing;

{
  /* <div className='flex justify-between'>
<h3 className='mt-5 text-xl font-bold'>Addons</h3>
<button onClick={() => setOpenDialog(prev => !prev)}>Add</button>
</div> */
}

{
  /* <Dialog closeModal={setOpenDialog} isOpen={openDialog} childrenClass={'w-[800px] h-[500px] bg-white p-4 rounded-md no-scrollbar dark-scrollbar'}>
<div>
       <div className='flex flex-col'>
         <label>Addons</label>
         <select className='border'>
           <option>Choose Addons</option>
           {addons && addons.map((addon, idx) => (
             <option key={idx}>{addon?.name}</option>
           ))}
         </select>
       </div>

       <div className='flex flex-col'>
         <label>Amount Type</label>
         <select className='border'>
           <option>Choose Type</option>
           <option>Flat</option>
           <option>Percentage</option>
         </select>
       </div>

       <div className='flex flex-col'>
         <label>Amount</label>
         <input type='number' className='border' />
       </div>

       <div>
         <div className="flex justify-between mt-2">
          <p>Per Night</p>
          <Toggle/>
         </div>

         <div className="flex justify-between mt-2">
           <p>Per Guest</p>
           <Toggle/>
         </div>

         <div className="flex justify-between mt-2">
           <p>Per Bedroom</p>
          <Toggle/>
         </div>
       </div>

       <button onClick={() => setShowBlockDates((prev) => !prev)}>Block Dates</button>
</div>

 {showBlockDates && (<div className="flex gap-x-4">
   <div className="">
   <Calendar
   startDate={startDate} 
   endDate={endDate}
   setEndDate={(value) => setEndDate(value)}
   setStartDate={(value) => setStartDate(value)}
   daySize={60}
   numberOfMonths={1}
   basePrice={""}
   weekendPrice={""}
   currencySymbol={"$"}
  />
 </div>
 
 <div className="w-[100%]">
   <div>
     <select className='border'>
       <option>Choose Addons</option>
       {addons && addons.map((addon, idx) => (
         <option key={idx}>{addon?.name}</option>
       ))}
     </select>
   </div>
   <div>
     <label>Name (Blocked by)</label>
     <textarea className="border"/>
   </div>
   <div>
     <label>Amount Type</label> <br/>
     <select className="border">
       <option>Choose Amount Type</option>
       <option>Percentage</option>
       <option>Amount</option>
     </select>
   </div>
    
   <div>
     <label>Amount</label> <br/>
     <input className="border"/>
   </div>

   <div className="flex justify-between mt-2">
     <p>Per Night</p>
     <Toggle/>
   </div>

   <div className="flex justify-between mt-2">
     <p>Per Guest</p>
     <Toggle/>
   </div>

   <div className="flex justify-between mt-2">
     <p>Per Bedroom</p>
     <Toggle/>
   </div>

 </div>

 </div>)}

 <div className='flex items-center justify-between mt-10'>
   <button onClick={() => setOpenDialog(prev => !prev)}>Close</button>
   <button onClick={() => setOpenDialog(prev => !prev)}>Apply</button>
 </div>
</Dialog> */
}
