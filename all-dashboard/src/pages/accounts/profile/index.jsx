import React from "react";
import CommonLayout from "../../../components/layouts";
import CustomerAccount from '../../../components/templates/customer/account';
import HostAccount from '../../../components/templates/host/account'
import { useUserDetailsSelector } from "store/selectors/user";
import getCountries from 'services/listing/getCountries';
import getRegions from 'services/listing/getRegions';
import { wrapper } from "store/index";
import { validateServerAccessToken } from "utils/common";
import { updateRegions } from 'store/slices/listing/regions';
import { updateCountry } from 'store/slices/listing/countries';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
   await validateServerAccessToken(store, ctx);
   // console.log('-----------------',ctx.req.cookies) // pass cookie to backend
  //  console.log('call ===================')
   const [regions, countries] = await Promise.all([ getRegions(ctx), getCountries(ctx)]);
   
  //  console.log('regions', regions)
   store.dispatch(updateRegions(regions));
   store.dispatch(updateCountry(countries));
   return {props: {regions,countries}};
  }
  catch (e) {
    console.log('error in account page server',e)
  }
 }
 );


function Account() {
  const userDetails = useUserDetailsSelector();
  const Host = userDetails?.isHost
  
  return (
    <>{Host ? <HostAccount/> : <CustomerAccount/> }</>
  );
}

Account.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;
export default Account;
