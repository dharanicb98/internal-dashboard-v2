import React from 'react'
import Image from "next/image";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({src, width, quality}) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
}

function ThirdPartyButtons({className, src="", alt="default alt", width="20", height="20", title="", titleClassName="", imgClassName=""}) {
  return (
    <div className={`bg-[#FCFCFC] hover:bg-[#E7E7E7] cursor-pointer shadow rounded-lg flex items-center justify-center  gap-x-3 ${className}`}>
        {src && <Image loader={localStorageLoader} src={src} alt={alt} width={width} height={height} className={imgClassName}/>}
        {title && <span className={`font-medium text-base leading-6 text-[#252729] ${titleClassName}`}>{title}</span>}
    </div>
  )
}

// hover:bg-[#E7E7E7], hover:bg-[#D9D9D9] px-[50px] py-[17px] py-[17px] px-[45px] w-[182px] h-[54px]



export default ThirdPartyButtons