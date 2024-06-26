import React from "react";
import CommonLayout from "../../../components/layouts";
import CustomerReservations from '../../../components/templates/customer/reservations'
import HostReservations from '../../../components/templates/host/reservations'
import { useUserDetailsSelector } from "store/selectors/user";
import { wrapper } from "store/index";
import { validateServerAccessToken, decodeJwtToken } from "utils/common";
import { getCustomerReservations } from "services/customerReservations/apis";
import { getAllListings } from "services/listing/getAllListing";
import getRegions from "services/listing/getRegions";
import getReservations from "services/reservations/getReservations";




export default function Reservation(props) {
  const {hostReservationsData, listingHashMap, regionHashmap, customerReservationData } = props;

  const userDetails = useUserDetailsSelector();
  const host = userDetails?.isHost
  
  return (
    <> 
      {host ? 
      <HostReservations hostReservationsData={hostReservationsData} listingHashMap={listingHashMap} regionHashmap={regionHashmap}/> : 
      <CustomerReservations customerReservationData={customerReservationData} listingHashMap={listingHashMap} regionHashmap={regionHashmap}/>
      }
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    await validateServerAccessToken(store, ctx);
    const jwtToken = ctx?.req?.cookies?.accessToken;
    const userObj = decodeJwtToken( jwtToken ); //decode jwt token to get token

    //customer 
    let customerReservationData = [] 

    //host 
    let hostReservationsData = []

    //hashmaps
    let listingHashMap = {}
    let regionHashmap = {}

    const userId = userObj.user_id 

  const listingsResponse = await getAllListings(ctx);

  const regionsResponse = await getRegions(ctx);

  //Hash-map function for listing
  for (let i = 0; i < listingsResponse?.length; i++) {
    let item = listingsResponse[i];
    listingHashMap[item?.listing_id] = item;
  }

  //Hash-map function for regions
  for (let i = 0; i < regionsResponse?.length; i++) {
    let item = regionsResponse[i];
    regionHashmap[item?.id] = item;
  }

  if ( userObj?.user_role === 5 ||  userObj?.user_role === 6 || userObj?.user_role === 1 ) {
    const filterReservationsByHostId = { filters: [{ col : "host_id", type: "number", val: userId}] };
    hostReservationsData = await getReservations( filterReservationsByHostId, ctx );

  }
  else {
    const filterReservationsByCustomerId = { filters: [{ col: "customer_id", type: "number", val: userId }]};
    customerReservationData = await getCustomerReservations( filterReservationsByCustomerId, ctx);
  }

  return {props: { hostReservationsData, listingHashMap, regionHashmap, customerReservationData }};
  }

  catch (e) {
    console.log( 'error in reservations page', e );
    return {props: { hostReservationsData: [], listingHashMap: {}, regionHashmap: {}, customerReservationData: [] }}
  }
})

Reservation.getLayout = (page) => <CommonLayout>{page}</CommonLayout>;


