import React from 'react'
import Image from "next/image";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;
const localStorageLoader = ({src, width, quality}) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
}

function SignInSignUpButtons({title, titleClassName="", className="", onClick, src="", alt="default alt", width="20", height="20", imgClassName=""}) {
  return (
    <div onClick={onClick} className={`hover:bg-[#D9D9D9] bg-[#D9D9D959] font-medium text-base leading-6 text-[#252729] 
      h-[55px] rounded-lg flex justify-center items-center gap-x-3 cursor-pointer  mt-6 ${className}`}>
      {src && <Image loader={localStorageLoader} src={src} alt={alt} width={width} height={height} className={`${imgClassName}`}/>}
      <span className={`${titleClassName}`}>{title}</span>
    </div>
  )
}

export default SignInSignUpButtons