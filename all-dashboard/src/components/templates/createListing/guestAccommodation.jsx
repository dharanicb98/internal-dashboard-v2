import { useDispatch } from "react-redux";
import { useCreateListingDataSelector } from "selectors/createListing";
import { updateData } from "slices/createListing";
import ToggleGroup from "ui/input/toggleGroup";
import Divider from "ui/divider";
import CounterGroup from "ui/input/counterGroup";

function GuestAccommodation() {
  const listingData = useCreateListingDataSelector();
  const dispatch = useDispatch();

  const handleUpdateData = (key, value) => {
    dispatch(updateData({ [key]: value }));
  };

  const handleUpdateMoreData = (key, value) => {
    const extraGuests = { ...listingData.extra_guests, [key]: value };
    dispatch(updateData({ extra_guests: extraGuests }));
  };

  const reservationCounters = [
    {
      title: "Max guests allowed",
      value: listingData.no_of_guests_max,
      key: "no_of_guests_max",
    },
    {
      title: "Max free guests",
      value: listingData.extra_guests.max_free,
      key: "max_free",
    },

    {
      title: "Max Booking days ",
      value: listingData.max_bookings_days,
      key: "max_bookings_days",
    },
    {
      title: "No of pets allowed",
      value: listingData.no_of_pets_allowed,
      key: "no_of_pets_allowed",
    },
  ];

  return (
    <div>
      <p className="before:content-['*'] before:text-primary mb-4 text-base ">
        Select Guest
      </p>
      <ToggleGroup
        title="Instant Book"
        description="When this is on, bookings are accepted automatically. when off."
        checked={listingData.is_instant_book}
        handleChange={(check) => handleUpdateData("is_instant_book", check)}
        titleClassNamef="text-lg leading-5"
      />
      <Divider className="my-8" />
      {reservationCounters.map((item, idx) => (
        <div key={idx} className="mt-6 first:mt-0">
          <CounterGroup
            title={item.title}
            value={item.value}
            handleChange={(value) =>
              item.key == "max_free"
                ? handleUpdateMoreData(item.key, value)
                : handleUpdateData(item.key, value)
            }
            titleClass="text-lg "
          />
        </div>
      ))}
    </div>
  );
}

export default GuestAccommodation;
