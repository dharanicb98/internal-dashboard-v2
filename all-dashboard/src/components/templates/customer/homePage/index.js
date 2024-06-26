import Image from "next/image";
import DesktopAppBar from "ui/appbar/desktopAppbar";
import MobileAppBar from "ui/appbar/mobileAppBar";
import CustomerAppBar from "../customerDashboard/customerAppBar";
import CustomerMobileAppBar from "../customerDashboard/customerMobileAppBar";
import MobileAppBarBottom from "ui/appbar/mobileAppbarBottom";
import Banner from "components/templates/customerDashboard/banner";
import BookingInfoCard from "components/templates/customerDashboard/bookingInfoCard";
import TotalBookingIcon from "src/public/assets/icons/calendar-totalbooking.svg";
import CompletedBookingIcon from "src/public/assets/icons/calendar-completedbooking.svg";
import CanceledBookingIcon from "src/public/assets/icons/calenndar-canceledbooking.svg";
import MobileAppbarIcon from "assets/images/down-arrow-mobie-appbar.png";
import CustomerReservation from "components/templates/customerReservation";
import { getCustomerReservations } from "services/customerReservations/apis";
import { getAllListings } from "../../../services/listing/getAllListing";
import { wrapper } from "store/index";
import { verifyJwtToken } from "utils/common";
import { validateServerAccessToken } from "utils/common";
import getRegions from "services/listing/getRegions";
import { PAYMENT_COMPLETED, PAYMENT_FAILED } from "src/constants/payment";
import { useRouter } from "next/router";
import CommonLayout from "../../layouts";


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (ctx) => {
      try {
        await validateServerAccessToken(store, ctx);
        // Reservations by customer id filter
  
        const jwtToken = ctx?.req?.cookies?.accessToken;
        console.log("..........................", jwtToken);
        const userObj = verifyJwtToken(jwtToken); //decode jwt token to get token
  
        const userId = userObj?.user_id;
  
        //total completed and total cancelled
        let totalReservationsCompleted = 0;
        let totalReservationsCancelled = 0;
        let totalReservations = 0;
  
        let customerData = [];
  
        if (userId) {
          const filterReservationsByCustomerId = {
            filters: [{ col: "customer_id", type: "number", val: userId }],
          };
  
          customerData = await getCustomerReservations(
            filterReservationsByCustomerId,
            ctx
          );
  
          for (let i = 0; i < customerData?.length; i++) {
            let item = customerData[i];
  
            if (item?.payment_status === PAYMENT_COMPLETED) {
              totalReservationsCompleted += 1;
            } else if (item?.payment_status === PAYMENT_FAILED) {
              totalReservationsCancelled += 1;
            }
            totalReservations += 1;
          }
        }
  
        const listingsResponse = await getAllListings(ctx);
  
        const regionsResponse = await getRegions(ctx);
  
        //Hash-map function for listing
        let hashMap = {};
  
        for (let i = 0; i < listingsResponse?.length; i++) {
          let item = listingsResponse[i];
          hashMap[item?.listing_id] = item;
        }
  
        let regionHashmap = {};
        for (let i = 0; i < regionsResponse?.length; i++) {
          let item = regionsResponse[i];
          regionHashmap[item?.id] = item;
        }
  
        return {
          props: {
            customerReservationData: customerData,
            listingHashMap: hashMap,
            regionHashmap,
            totalReservationsCompleted,
            totalReservationsCancelled,
            totalReservations,
          },
        };
      } catch (error) {
        console.log("jwtToken must be provided", error);
        console.error(
          "Error in getServerSideProps in customer reservations root page",
          error
        );
        return {
          props: {
            customerReservationData: [],
            listingHashMap: {},
            regionHashmap: {},
          },
        };
      }
    }
);

function CustomerHomePage({ customerReservationData, listingHashMap, regionHashmap, totalReservationsCompleted, totalReservationsCancelled, totalReservations,}) {
    const router = useRouter();

    const handleBookingCard = (key) => {
      router.push(
        `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation/?tab=${key}`
      );
    };
  
    return (
      <div className="mx-6 md-m:mx-10 min-h-[100vh]">
        {/*App bar for desktop*/}
        <div className="md:hidden mt-[75px] relative">
          <CustomerAppBar />
        </div>
  
        <div className="md-m:hidden py-[20px] mb-[50px]">
          <CustomerMobileAppBar />
        </div>
  
        {/* <div className="hidden md-m:flex sticky top-0 pt-10 bg-white flex-col gap-3 appBar__index">
          <DesktopAppBar title={<><span>Welcome Back,</span><span className="font-medium"> Desmith Rose!</span></>}/>
        </div>
  
        <div className="flex md-m:hidden sticky top-0 pt-10 pb-12 bg-white flex-col gap-3 appBar__index">
          <MobileAppBar />
        </div> */}
  
        <div className="md-m:hidden">
          <div className="text-[24px] font-medium mb-4">
            {" "}
            Welcome Back,
            {/* <div>Deshmith Rose!</div> */}
          </div>
          <div className="flex justify-start gap-2 mb-[40px]">
            <div className="text-base font-normal text-[#6b6b6b]">
              Complete your Profile Now
            </div>
            <div className="mt-auto">
              <Image src={MobileAppbarIcon} alt="mobile-appbar-complete-icon" />
            </div>
          </div>
        </div>
        <Banner />
  
        <div className="hidden md-m:grid grid-cols-3 lg:grid-cols-2 gap-8 mt-8 ">
          <BookingInfoCard
            icon={TotalBookingIcon}
            title={"Total Bookings"}
            count={totalReservations || 0}
            onClick={() => handleBookingCard("All")}
          />
          <BookingInfoCard
            icon={CompletedBookingIcon}
            title={"Completed"}
            count={totalReservationsCompleted || 0}
            onClick={() => handleBookingCard("Completed")}
          />
          <BookingInfoCard
            icon={CanceledBookingIcon}
            title={"Cancelled"}
            count={totalReservationsCancelled || 0}
            onClick={() => handleBookingCard("Cancelled")}
          />
        </div>
  
        <div className="mt-12 mb-16">
          <CustomerReservation
            listingHashMap={listingHashMap}
            regionHashmap={regionHashmap}
            reservations={customerReservationData}
            isDefault={false}
          />
        </div>
  
        <div className="flex md-m:hidden sticky top-0 pt-10 pb-12  flex-col gap-3 appBar__index">
          <MobileAppBarBottom />
        </div>
      </div>
    );
}

export default CustomerHomePage