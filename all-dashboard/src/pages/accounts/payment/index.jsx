import React from "react";
import CommonLayout from "../../../components/layouts";
import HostPayments from '../../../components/templates/host/payment'
import CustomerPayments from '../../../components/templates/customer/payment'
import { useUserDetailsSelector } from "store/selectors/user";

export default function DashboardRoot() {
  const userDetails = useUserDetailsSelector();
  const host = userDetails?.isHost

  return (
    <>
      {host ? <HostPayments/> :<CustomerPayments/> }
    </>
  );
  
}

DashboardRoot.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
