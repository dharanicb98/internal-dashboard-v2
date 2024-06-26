import React, { useState } from 'react'
import { INPUT_STYLE } from '../../../constants'
import Input from '../../popup/Input'
import { ChevronDownIcon } from '../../../icons'

const Services = ({ addonsList, payload, setPayload }) => {
    const [open, setOpen] = useState(false)
    const [checked, setCheck] = useState(false);

    function handleAddons(event, id) {
        const index = payload?.addons.indexOf(id)
        const value = event.target.checked
        if (index === -1 && value) {
            setPayload(prev => { return { ...prev, addons: [...prev.addons, id] } })
            setCheck(value)
        }
        else {
            const updateIds = [...payload.addons]
            updateIds.splice(index, 1)
            setPayload(prev => { return { ...prev, addons: [...updateIds] } })
        }
    }

    // console.log("addons", payload?.addons)

    return (
        <div className='flex relative flex-col my-3'>
            <div className={`relative h-[50px] w-full ${INPUT_STYLE}`} onClick={() => setOpen(prev => !prev)}>
                <p className='self-center mt-2'> Select Services</p>
                <div className='absolute right-[10px] top-[50px] translate-y-[-50%] mt-[-25px] cursor-pointer'>
                    <ChevronDownIcon size={20} className={`${open && addonsList.length > 0 && "rotate-180"}`} />
                </div>
            </div>
            {
                open && addonsList.length > 0 &&
                <div className={`dropdown ${open && "z-10"} mt-[50px] drop-shadow-lg h-[170px] px-4 py-4 max-h-[290px] bg-white overflow-y-auto no-scrollbar dark-scrollbar border-b-none border-box absolute w-[100%] ${open ? "block" : "hidden"}`} >
                    {addonsList?.map((each, index) => (
                        <div className='flex justify-between items-center gap-x-2' key={each.id}>
                            <div className='flex'>
                                <input type={"checkbox"} className='mx-5 my-2 self-center accent-black cursor-pointer relative shrink-0 border-[#6B6B6B] border w-7 h-8 rounded bg-white focus:outline-none focus:ring-offset-0 '
                                    defaultChecked={payload.addons.includes(
                                        each.id
                                    )}
                                    id={each.id}
                                    onChange={(event) => handleAddons(event, each.id)}
                                />
                                <p className='self-center md:w-[150px] xl:w-auto overflow-auto md:m-1'>{each.id}</p>
                            </div>
                            <p>₹ {each.amount}</p>
                        </div>
                    ))}
                </div>

            }
        </div>
    )
}

export default Services