import React, { useState } from 'react'
import { phoneExtension } from '../../../constants/phoneExt'


// reusable PhoneExtension code 
function PhoneExtensionSelectBar({ onChange, label, labelStyle, inputStyle, selectPhoneExt, className, value, placeholder, error, phoneExt }) {
  const code = phoneExtension.filter((each) => (each.value === phoneExt))

  const [selectedCountry, setSelectedCountry] = useState(code[0].code !== "CA" ? code[0].code : "US");

  const [countryValue, setCountryValue] = useState(phoneExt)


  return (
    <div className={`flex pb-2 mx-auto ${inputStyle}`}>
      <label className={`text-slate-700 ${labelStyle}`}>{label && label}</label>
      <div className='w-1/2'>
        <div className={`px-2.5 border-[1px] border-slate-300 rounded-lg flex items-center -md:w-[100%] ${className ? className : "w-[350px] h-[60px]"}`}>
          <div className='relative'>
            <select className='w-[50px] h-[30px] text-sm text-gray-800 
                outline-none' aria-label="Phone number country" value={phoneExt} required onChange={(e) => {
                setSelectedCountry(e.target.value)
                setCountryValue(e.target.options[e.target.selectedIndex].id)
                selectPhoneExt(e.target.options[e.target.selectedIndex].id)
              }}>
              {
                phoneExtension.map(phoneExtension => (
                  <option value={`${phoneExtension.code}`} id={phoneExtension.value} key={phoneExtension.code}>{phoneExtension.name}</option>
                ))
              }
            </select>
            <div aria-hidden="true" className='absolute top-0.5 left-1'>
              <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`} className=' w-[30px] h-[24px]' alt="flag" />
            </div>
          </div>
          <span>{countryValue}</span>
          <input value={value} type="tel" className='w-[80%] h-[30px] outline-none px-2'  placeholder={placeholder} onChange={onChange} required/>

        </div>
      </div>
    </div>
  )
}

export default PhoneExtensionSelectBar

// Using In this component mandatory fields :
// maintain the state by default "us" or if data is present access and store maintain state with valuable condition
// using props and adjust to like -> width and styles 
// if you want example to check this components -> userForm , checkoutForm ect..  