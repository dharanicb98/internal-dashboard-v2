import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '../../icons'
import { INPUT_STYLE } from '../../constants';

let active = -1;

const SelectDropdown = ({ options, placeholder = "", onChange, label, labelStyle, className }) => {
    const [inputValue, setInputValue] = useState("")
    let[filterSearch, setfliterSearch] = useState([])
    const [open, setOpen] = useState(false);
    const [activeId, setActiveID] = useState("")

    const clearDropdown = () => {
        setInputValue("");
        onChange("");
        setfliterSearch([...options])
        active = -1

    }

    const handleKeydown = (e) => {
        if (filterSearch.length > 0) {
            if (e.keyCode === 40) {
                if (active < filterSearch.length - 1) {
                    active++
                    setInputValue(filterSearch[active]?.value)
                    onChange(filterSearch[active]?.id)
                    setActiveID(filterSearch[active]?.id)
                }
                else if (active === filterSearch.length - 1) {
                    active = -1
                }
            } else if (e.keyCode === 38) {
                if (active > 0) {
                    active--
                    setInputValue(filterSearch[active]?.value)
                    onChange(filterSearch[active]?.id)
                    setActiveID(filterSearch[active]?.id)
                }
                else if (active === 0 || active === -1) {
                    active = filterSearch.length
                }
            }
            else {
                active = 0
            }
            if (e.key === "Enter") {

                setfliterSearch(options.filter((item) => {
                    const searchItem = inputValue?.toLocaleLowerCase();
                    const filterValue = item.value?.toLocaleLowerCase();
                    if (!searchItem) return true
                    return filterValue.includes(searchItem)
                }))

                setOpen(false)
                onChange !== undefined && onChange(activeId)
            }
        }

    }


    const onInputClick = () => {
        setOpen((prev) => !prev)
        setfliterSearch([...options])

    }


    const onItemChange = (index,option) => {
        active = index
        onChange !== undefined && onChange(option.id)
        setInputValue(option.value)
        setOpen(false)
        setActiveID(option.id)
       

    }


    const onInputChange = (event) => {
        setInputValue(event.target.value)
        onChange !== undefined && setfliterSearch(options.filter((item) => {
            const searchItem = inputValue?.toLocaleLowerCase();
            const filterValue = item.value?.toLocaleLowerCase();

            if (!searchItem) return true
            return filterValue.includes(searchItem)
        }))
        onChange !== undefined && onChange(activeId)
        setOpen(true)
        active = -1
    }

    useEffect(() => {
        activeId && setInputValue(options.find(option => option.id === activeId).value)
    }, [])


    if(inputValue.length===1){
        filterSearch=options.filter((item) => {
            const searchItem = inputValue?.toLocaleLowerCase();
            const filterValue = item.value?.toLocaleLowerCase();
            if (!searchItem) return true
            return filterValue.includes(searchItem)
        })
    }

    return (
        <div className={`relative ${className}`}>
            <label className={`text-slate-600 text-md ${labelStyle}`}>{label && label} </label>
            <div className={`relative w-full ${INPUT_STYLE}`} onClick={onInputClick}
                onKeyDown={handleKeydown}
            >
                <input type='text' placeholder={placeholder} value={inputValue} onChange={onInputChange}
                    className='border-[0px] w-full p-[0px] h-[36px] pl-[14px] box-border text-[16px] focus:border-[white] focus:outline-none' required/>
                <div className='absolute right-[10px] top-[50px] translate-y-[-50%] mt-[-25px] cursor-pointer'>
                    <ChevronDownIcon size={20} className={`${open && "rotate-180"}`} />
                </div>
                {activeId && inputValue ? <div onClick={clearDropdown} className="absolute right-[30px] top-[50%] translate-y-[-50%] cursor-pointer text-black pr-[10px] text-[16px]">x</div> : null}
            </div>
            {
                open &&
                <div className={`dropdown drop-shadow-lg max-h-[250px] overflow-y-auto no-scrollbar dark-scrollbar border-b-none border-box absolute w-[100%] ${open ? "block" : "hidden"}`} >
                    {filterSearch.length > 0 ? filterSearch.map((option,index) => {
                        return (
                            <div key={option.id} id={option.id} className={`option min-h-[36px] overflow-auto p-3 flex items-center pl-[16px] cursor-pointer bg-white hover:bg-black hover:text-white ${activeId === option.id && "!bg-black text-white"}`}
                                onClick={() => onItemChange(index,option)}>{option.value}</div>
                        )
                    }) :
                        <div className='h-[49px] flex items-center pl-[10px] cursor-pointer bg-white'>Not found</div>
                    }
                </div>
            }
        </div>
    )
}

export default SelectDropdown


// SelectDropdown reusable Components and pass the props details 
// --> option - Array of the object list to set like keys and values ([{ value: title, id: listing_id } ....]) , 
// placeholder , 
// onChange- pass the function and store the id from to send another components, 
// onChange(id => setOnChange(id)) -wherever accessing in this component(selectDropdown) maintain the state initially pass the value null or any empty string 
// label -> label name , labelStyle , className -like a container width and for any styles 