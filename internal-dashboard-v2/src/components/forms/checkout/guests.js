import React, { useState } from 'react'
import { ChevronDownIcon } from '../../../icons'
import { INPUT_STYLE } from '../../../constants'

const Guests = ({ payload, setPayload }) => {
    const [open, setOpen] = useState(false)

    // [{...prev, total : guest.total + 1}]

    const handleGuest = (type , guest) => {
        switch (type) {
            case 'increment':
               setPayload((prev) => { return {...payload , guests : prev.guests.map((each) => (
                each.name === guest.name ? {...guest , total :guest.total + 1 } : each
               ))}})
               break 
            case 'decrement':
                if (guest.total > 0) {
                    setPayload((prev) => { return {...payload , guests : prev.guests.map((each) => (
                        each.name === guest.name ? {...guest , total :guest.total - 1 } : each
                       ))}})                    // setPayload((prev) => { return {...prev, guests:{...prev.guests, [total]:prev.guests[total] - 1}}})
                    break 
                }
            default:
                break 
        }
    }

    return (
        <div className='flex relative flex-col'>
            <div className={`relative h-[50px] w-full ${INPUT_STYLE}`} onClick={() => setOpen(prev => !prev)}>
                <p className='self-center mt-2'> Select Guests</p>
                <div className='absolute right-[10px] top-[50px] translate-y-[-50%] mt-[-25px] cursor-pointer'>
                    <ChevronDownIcon size={20} className={`${open && "rotate-180"}`} />
                </div>
            </div>
            {
                open &&
                <div className={`dropdown ${open && "z-10"} mt-[50px] drop-shadow-lg h-[170px] px-4 py-4 max-h-[290px] bg-white overflow-y-auto border-b-none border-box absolute w-[100%] ${open ? "block" : "hidden"}`} >
                    {payload?.guests?.map((each, index) => (
                        <div className='flex justify-between items-center gap-x-2' key={index}>
                            <p className='ml-5 self-center'><strong >{each.name}</strong></p>
                            <div className='flex text-center self-center items-center gap-x-3'>
                                <div className='text-center ml-5'>
                                    <div className={`w-10 my-1 ml-3 self-center h-10 flex items-center justify-center text-xl  rounded-full border-[1px] cursor-pointer`} onClick={()=>handleGuest("decrement", each)}>-</div>
                                </div>
                                <p className='text-center'>{each.total}</p>
                                <div className='text-center'>
                                    <div className={`w-10 h-10 flex items-center justify-center text-xl  rounded-full border-[1px] border-black cursor-pointer`} onClick={()=>handleGuest("increment" , each)}>+</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            }
        </div>
    )
}

export default Guests