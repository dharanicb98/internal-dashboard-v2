import CommonLayout from "../../components/layouts";
import Host from "../../components/templates/host";
import Customer from "../../components/templates/customer";
import { useUserDetailsSelector } from "store/selectors/user";
import { wrapper } from "store/index";
import { validateServerAccessToken, decodeJwtToken } from "utils/common";
import { getCustomerReservations } from "services/customerReservations/apis";
import { getAllListings } from "services/listing/getAllListing";
import getRegions from "services/listing/getRegions";
import { PAYMENT_COMPLETED, PAYMENT_FAILED } from "src/constants/payment";
import getDashboardData from "services/dashboard/getDashboardData";
import getReservations from "services/reservations/getReservations";



export default function Home (props) { 
  const { 
    dashboardData,  hostReservationsData, listingHashMap, regionHashmap,
    customerReservationData, totalReservationsCompleted, totalReservations,  totalReservationsCancelled
  } = props


  const userDetails = useUserDetailsSelector();
  const host = userDetails?.isHost

  return(
      <>
        {host ? 
        <Host dashboardData={dashboardData} hostReservationsData={hostReservationsData} listingHashMap={listingHashMap} regionHashmap={regionHashmap}/> :  
        <Customer listingHashMap={listingHashMap} regionHashmap={regionHashmap} customerReservationData={customerReservationData} totalReservationsCompleted={totalReservationsCompleted} totalReservations={totalReservations}  totalReservationsCancelled={totalReservationsCancelled} />}
      </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  try {
    await validateServerAccessToken(store, ctx);

    const jwtToken = ctx?.req?.cookies?.accessToken;
    const userObj = decodeJwtToken( jwtToken ); //decode jwt token to get token

    //host
    let dashboardData = []
    let hostReservationsData = []

    //customer 
    let customerReservationData = []
    let totalReservationsCompleted = 0;
    let totalReservationsCancelled = 0;
    let totalReservations = 0;

    //common
    let listingHashMap = {}
    let regionHashmap= {}

    //userId 
    const userId = userObj.user_id 

    // USER_ROLE_ADMIN: 1,
    // USER_ROLE_HOST: 5,
    // USER_ROLE_CO_HOST: 6,
    // USER_ROLE_CUSTOMER: 10

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
      //call host function
      const filterReservationsByHostId = { pagination:{page: 1, limit: 4}, filters: [{ col : "host_id", type: "number", val: userId}] };
      hostReservationsData = await getReservations( filterReservationsByHostId, ctx );
      dashboardData = await getDashboardData(ctx);
    }
    else {
      const filterReservationsByCustomerId = { filters: [{ col: "customer_id", type: "number", val: userId }]};

      customerReservationData = await getCustomerReservations( filterReservationsByCustomerId, ctx);

      for (let i = 0; i < customerReservationData?.length; i++) {
        let item = customerReservationData[i];

        if (item?.payment_status == PAYMENT_COMPLETED) {
          totalReservationsCompleted += 1;
        } 
        else if (item?.payment_status == PAYMENT_FAILED) {
          totalReservationsCancelled += 1;
        }
        totalReservations += 1;
      }
    }

  
    return {props: {dashboardData, 
      hostReservationsData, 
      listingHashMap, 
      regionHashmap, 
      customerReservationData, 
      totalReservationsCompleted,
      totalReservationsCancelled,
      totalReservations
    } }
  }
  catch ( e ) {
    console.log("Error in getServerSideProps in root page", e);
    return {props: {
        dashboardData: [],
        hostReservationsData: [],
        listingHashMap: {},
        regionHashmap: {},
        customerReservationData: [],
        totalReservationsCompleted:0,
        totalReservations: 0,
        totalReservationsCancelled: 0
    }}
  }
}) 

Home.getLayout = (page) => <CommonLayout>{page}</CommonLayout>
