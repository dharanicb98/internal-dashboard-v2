import React, { useState } from 'react'
import Dialog from '../../../ui/dialog'
import { INPUT_STYLE } from '../../../constants'

function Step12({payload, setPayload}) {
  const [basicLongTermDiscountsPayload, setBasicLongTermDiscountsPayload] = useState({min_days:0, discount_type:0, discount_amount:0, blocks:[]})

  console.log('step 12')
  const [openDiloag, setOpenDialog] = useState(false)

  const handleOnChange = (e, key) => {
    let value = e.target.value 
    setBasicLongTermDiscountsPayload((prev) => {return {...prev, [key]:value}})
  }

  const handleAdd = () => {
    setPayload((prev) => {return {...prev, long_term_discount: [...prev.long_term_discount, basicLongTermDiscountsPayload]}})
    setBasicLongTermDiscountsPayload({min_days:0, discount_type:0, discount_amount:0, blocks:[]})
    setOpenDialog((prev) => !prev)
  }



  return (
    <div>
      <h1>Long Term Discounts</h1>
      <button onClick={() => setOpenDialog((prev) => !prev)}>Add+</button>
      {payload?.long_term_discount?.length > 0 && (
         payload.long_term_discount.map((discount, idx) => {
          return (
            <div key={idx} className='border flex items-center justify-between rounded-lg mt-3 p-3'>
               <span>{discount?.min_days}</span>
               <span>{discount?.discount_type}</span>
               <span>{discount?.discount_amount}</span>
               <button  className='bg-black text-white py-2 px-3 rounded-lg'>Edit</button>
               <button className='bg-black text-white py-2 px-3 rounded-lg'>Remove</button>
            </div>
          )
         })
      )}

      <Dialog closeModal={setOpenDialog} isOpen={openDiloag} childrenClass={' bg-white p-4 rounded-md no-scrollbar dark-scrollbar'}>
        <div className='w-[400px]'>
           <div>
                <div className='mt-6'>
                    <label>Min Days</label>
                    <input onChange={(e) => handleOnChange(e, 'min_days')} className={`${INPUT_STYLE}`}/>
                </div>

                <div className='mt-6'>
                  <label>Amount Type</label>
                    <select onChange={(e) => handleOnChange(e, 'discount_type')} className={`${INPUT_STYLE}`}>
                      <option value=''>Choose Type</option>
                      <option value='flat'>Flat</option>
                      <option value='percentage'>Percentage</option>
                    </select>
                </div>

                <div className='mt-6'>
                    <label>Amount</label>
                    <input onChange={(e) => handleOnChange(e, 'discount_amount')} className={`${INPUT_STYLE}`}/>
                </div>

              <div className='flex items-center justify-between mt-8'>
                 <button onClick={() => setOpenDialog((prev) => !prev)} className='bg-black text-white py-2 px-3 rounded-lg'>Close</button>
                 <button onClick={handleAdd} className='bg-black text-white py-2 px-3 rounded-lg'>Add</button>
              </div>

           </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Step12