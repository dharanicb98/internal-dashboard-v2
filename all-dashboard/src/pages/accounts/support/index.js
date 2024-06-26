import React from 'react'
import CommonLayout from '../../../components/layouts'
import CustomerSupport from '../../../components/templates/customer/support'
import HostSupport from '../../../components/templates/host/support'
import { useUserDetailsSelector } from "store/selectors/user";

export default function Support() {
  const userDetails = useUserDetailsSelector();
  const Host = userDetails?.isHost
  
  return (
    <div>
        {Host ? <HostSupport/>: <CustomerSupport/> }
    </div>
  )
}

Support.getLayout = ( page ) =>  <CommonLayout>{page}</CommonLayout>