import React from 'react'
import Image from "next/image";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({src, width, quality}) => {
    return `${localStoragePath}${src}?q=${quality || 100}`;
}

function BackButton({handleBack, className="",type="button"}) {
  return (
    <div onClick={handleBack}>
        <button type={type} className={`hidden md-m-1:block absolute top-[20px] md-m:right-[60px] cursor-pointer font-medium text-base leading-5 text-[#000000] ${className}`}>back</button>
        <button type={type} className='block md-m-1:hidden '><Image loader={localStorageLoader} src="/assets/icons/loginBackButton.svg" width='32' height='32' /></button>
    </div>
  )
}

export default BackButton