import moment from "moment";
import React from "react";
import DetailsDialog from "./detailsDialog";
import ReservationDetailsCard from "./detailsCard";
import { getCustomerDetails } from "../../../services/customerReservations/apis";
import { getRangeBetweenDates2 } from "utils/common";
import {formatBookingCreatedAt} from "utils/date"

export default function ReservationMobileCard(props) {
  const { data, listingHashMap, regionHashmap } = props;
  const [showDetailsDialog, setShowDetailsDialog] = React.useState(false);
  const [bookingDetailsData, setBookingDetailsData] = React.useState({})

  const handleDetailsCard = async (customerId, bookingsUserdata) => {
    let reservationsObj = {
      id : bookingsUserdata?.id ,
      user_fname : bookingsUserdata?.user_fname, 
      user_lname : bookingsUserdata?.user_lname, 
      total_guests: bookingsUserdata?.total_guests,
      listing_name: listingHashMap && listingHashMap[bookingsUserdata?.listing_id]?.title || 'Listing id not found',
      booking_date: getRangeBetweenDates2(bookingsUserdata?.checkin, bookingsUserdata?.checkout),
      checkin:bookingsUserdata?.checkin, 
      checkout:bookingsUserdata?.checkout,
      wifi_network_name: listingHashMap && listingHashMap[bookingsUserdata?.listing_id]?.wifi_network_name || undefined,
      wifi_network_password: listingHashMap && listingHashMap[bookingsUserdata?.listing_id]?.wifi_network_password || undefined,
      custom_rule: listingHashMap && listingHashMap[bookingsUserdata?.listing_id]?.custom_rule || undefined,
      check_in_time: listingHashMap && listingHashMap[bookingsUserdata?.listing_id]?.check_in_time || undefined,
      check_out_time: listingHashMap && listingHashMap[bookingsUserdata?.listing_id]?.check_out_time || undefined,
      pricing_data: bookingsUserdata?.pricing_data && JSON.parse( bookingsUserdata?.pricing_data ),
      user_currency: bookingsUserdata?.user_currency, 
      payment_status: bookingsUserdata?.payment_status,
      total_guests:bookingsUserdata?.total_guests,
      total_amount: bookingsUserdata?.total_amount,
      amount_paid: bookingsUserdata?.amount_paid,
      balance_amount: bookingsUserdata?.balance_amount,
      booking_created_At: formatBookingCreatedAt(bookingsUserdata?.created_at)
    }
    let customerData 

    const [customerResponse] = await getCustomerDetails( customerId );

    customerData = { 
      customer_region: regionHashmap && regionHashmap[customerResponse?.state_id]?.name || '',
      customer_joined: customerResponse?.created_at,
      customer_known_languages:customerResponse?.languages,
      customer_profile: customerResponse?.user_avatar,
    }

    setBookingDetailsData((prev) => {return {...reservationsObj, ...customerData}})

    setShowDetailsDialog(true)

  }

  return (
    <div className="md:block hidden bg-white rounded-2xl">
      <DetailsDialog
        bookingDetailsData={bookingDetailsData}
        open={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
      />
      <div
        className=" w-full min-h-[270px] px-6 py-5 rounded-2xl"
        style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}
        // onClick={(e) => setShowDetailsDialog(true)}
      >
        <ReservationDetailsCard bookingDetailsData={{...data, booking_created_At: formatBookingCreatedAt(data?.created_at)}} handleDetailsCard={handleDetailsCard}/>
      </div>
    </div>
  );
}
