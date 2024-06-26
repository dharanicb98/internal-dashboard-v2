import { differenceInDays, format } from "date-fns";
import { useSelector } from "react-redux";

function UpcomingCard({ booking }) {
  const propertyListAPI = useSelector((state) => state.propertylist.propertyList) || [];
  const previewImage = propertyListAPI.find((v) => v.listing_id == booking?.listing_id)?.image_path || '';

  const formatDates = (checkindate, checkoutdate) => {
    const checkinDate = new Date(checkindate);
    const checkoutDate = new Date(checkoutdate);
    const formattedCheckin = format(checkinDate, "d");
    const formattedCheckout = format(checkoutDate, "d");
    const dateStr = `${formattedCheckin}-${formattedCheckout}`;
    return dateStr;
  };

  const calculateDifference = (checkindate, checkoutdate) => {
    const checkinDate = new Date(checkindate);
    const checkoutDate = new Date(checkoutdate);
    const dayDifference = differenceInDays(checkoutDate, checkinDate);
    const diffStr = `(${dayDifference} days)`;
    return diffStr;
  };
  return (
    <div className="mt-2 md-m:mt-0 flex bg-[#000000] min-w-[97%] md-m:min-w-[285px] h-[85px] ml-[6px] mr-[6px] rounded-2xl p-[12px] text-[#D9D9D9] rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] z-1 relative">
      <div
        className="h-[4px] w-[95%] md-m:w-[272px] absolute top-0 left-0"
        style={{
          backgroundColor: booking?.booking_color
            ? booking.booking_color
            : "#000000",
        }}
      ></div>
      <div className="w-[60px] h-[60px] rounded-xl">
        <img
          src={process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN + previewImage}
          alt="property"
          className="w-[60px] h-[60px] border rounded-xl object-fill"
        />
      </div>
      <div className="flex-1 ml-[6px] h-[60px] text-sm flex flex-col justify-center">
        <p className="text-xs flex justify-between">
          <span>Booked By</span>
          <span>
            {formatDates(booking.checkin, booking.checkout)}
            {calculateDifference(booking.checkin, booking.checkout)}
          </span>
        </p>
        <p>{booking.user_fname} {booking.user_lname}</p>
        <span className="text-xs truncate" style={{ maxWidth: "150px" }}>
          {booking.listing_name}
        </span>
      </div>
    </div>
  );
}

export default UpcomingCard;
