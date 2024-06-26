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
import { useRouter } from "next/router";
import CommonLayout from "../../layouts";



export default function Customer({ customerReservationData, listingHashMap, regionHashmap, totalReservationsCompleted, totalReservationsCancelled, totalReservations,} ) {
    const router = useRouter();

    const handleBookingCard = (key) => {
      router.push( `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/reservation/?tab=${key}`
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

Customer.getLayout = ( page ) => <CommonLayout>{page}</CommonLayout>