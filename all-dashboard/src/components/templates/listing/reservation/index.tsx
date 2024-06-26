import CounterGroup from "ui/input/counterGroup";
import ToggleGroup from "ui/input/toggleGroup";
import React from "react";
import { useListingDetailsSelector } from "store/selectors/listing";
import { ListingDataType } from "types/listing";
import { updateListingDetails } from "store/slices/listing";
import { useDispatch } from "react-redux";
import Divider from "ui/divider";

export default function ReservationContent(props: ReservationContentProps) {
  const {} = props;
  const dispatch = useDispatch();
  const listingDetails = useListingDetailsSelector();

  const handleChangeListingDetails = (
    key: keyof ListingDataType,
    value: ListingDataType[keyof ListingDataType]
  ) => {
    dispatch(updateListingDetails({ [key]: value }));
  };

  const handleChangeListingMoreDetails = (key, value) => {
    const extraGuests = { ...listingDetails.extra_guests, [key]: value };
    dispatch(updateListingDetails({ extra_guests: extraGuests }));
  };

  const reservationCounters = [
    {
      title: "Max guests allowed",
      value: listingDetails.no_of_guests_max,
      key: "no_of_guests_max",
    },
    {
      title: "Max free guests",
      value: listingDetails?.extra_guests?.max_free,
      key: "max_free",
    },
    // {
    //   title: "Price/additional guests",
    //   value: listingDetails.price_per_additional_guest,
    //   key: "price_per_additional_guest",
    // },
    {
      title: "Max Booking days ",
      value: listingDetails.max_bookings_days,
      key: "max_bookings_days",
    },
    {
      title: "No of pets allowed",
      value: listingDetails.no_of_pets_allowed,
      key: "no_of_pets_allowed",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-8 md:grid-cols-1">
      <div className="md:order-3">
        {reservationCounters?.map((item, idx) => (
          <div key={idx} className="mt-6 first:mt-0">
            <CounterGroup
              title={item.title}
              value={item.value || 0}
              handleChange={(value) =>
                item.key == "max_free"
                  ? handleChangeListingMoreDetails(item.key, value)
                  : handleChangeListingDetails(item.key, value)
              }
              // handleChange={(value) =>
              //   handleChangeListingDetails(item.key, value)
              // }
              titleClass="text-lg"
            />
          </div>
        ))}
      </div>
      <Divider className="my-7 md-m:hidden order-2" />
      <div>
        <ToggleGroup
          title="Instant Book"
          description="When this is on, bookings are accepted automatically. when off."
          checked={listingDetails.is_instant_book}
          handleChange={(check) =>
            handleChangeListingDetails("is_instant_book", check)
          }
        />
      </div>
    </div>
  );
}

interface ReservationContentProps {}

interface ReservationCounterType {
  title: string;
  value: number;
  key: keyof ListingDataType;
}
