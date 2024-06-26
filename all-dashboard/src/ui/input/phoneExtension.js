import React from 'react'

function PhoneExtension({countryCodes}) {
  return (
    <select>
       {countryCodes?.map((code, idx) => {
           return <option key={idx} value={code?.dial_code}>{code?.dial_code}</option>
        })}
    </select>
  )
}

export default PhoneExtension