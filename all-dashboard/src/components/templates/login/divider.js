import React from 'react'

function Divider({hr1ClassName="", hr2ClassName="", className=""}) {
  return (
    <div className={`mt-6 flex items-center gap-x-3 ${className}`}>
        <HorizontalLine hrClassName={`w-full text-[#D9D9D9] ${hr1ClassName}`}/>
        <span className='text-[#6C7A87] font-normal text-base leading-6'>Or</span> 
        <HorizontalLine hrClassName={`text-[#D9D9D9] w-full ${hr2ClassName}`}/>
    </div>
  )
}

const HorizontalLine = ({hrClassName}) => {
    return (
      <hr className={`${hrClassName}`}/>
    )
}


export default Divider