import React from 'react'
import { useRouter } from 'next/router'

function TermsAndConditions({type="Signing Up", className=""}) {
  const router = useRouter();

  return (
    <p onClick={() => router.push(`${process.env.NEXT_PUBLIC_LOGIN_TERMS_AND_CONDITIONS}/terms`)} className={`font-normal text-sm leading-6 text-[#0B2238] mt-8 ${className}`}>By {type} button, you agree to HolidayKeepers 
    <br/><span className='font-medium underline cursor-pointer'>Terms and conditions of use.</span></p>
  )
}

export default TermsAndConditions