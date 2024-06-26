import React, { useState, useEffect } from "react";
import Header from "./header";
import Filters from "./filters";
import ReservationList from "./reservationList";
import { getCustomerReservations } from "services/customerReservations/apis";
import {
  PAYMENT_PENDING,
  PAYMENT_COMPLETED,
  BOOKING_STATUS_COMPLETED,
  BOOOKING_STATUS_PENDING,
  BOOKING_STATUS_CANCELLED,
  BOOKING_STATUS_ONGOING,
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_REQUESTED,
} from "src/constants/payment";
import { useRouter } from "next/router";
import SortDialogMobile from "../customerReservation/sortDialogMobile";

import { useUserDetailsSelector } from "store/selectors/user";

const tabList = ["All", "Upcoming", "Cancelled", "Completed", "Unsucessfull"];

function CustomerReservation({
  reservations,
  isDefault,
  listingHashMap,
  regionHashmap,
  openSortDialog,
  setOpenSortDialog,
}) {
  const router = useRouter();

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [filteredReservations, setFilteredReservations] =
    useState(reservations);
  const [filters, setFilters] = useState({
    search: "",
    reservationType: "All",
    fromDate: null,
    toDate: null,
    sortBy: "",
    col: "",
    paymentStatus: "",
  });
  const [userId, setUserId] = useState(null);

  const userDetails = useUserDetailsSelector();

  useEffect(() => {
    if (isInitialRender) {
      let userId = userDetails?.user_id; //get user data from global state
      setUserId(userId);
      setIsInitialRender(false);
      return;
    }
    const payload = generatePayload();
    filterData(payload);
  }, [filters]);

  useEffect(() => {
    if (router.query.tab) {
      const isValidTab = tabList.find((item) => item === router.query.tab);
      if (isValidTab) {
        setFilters((prev) => ({ ...prev, reservationType: isValidTab }));
      }
    }
  }, [router.query.tab]);

  const generatePayload = () => {
    let payload = {};

    if (userId) {
      const userFilter = { col: "customer_id", type: "number", val: userId }; //get reservations by user id

      payload = { filters: [userFilter] };

      if (filters.reservationType === "All") {
        payload.filters = [userFilter];
      }

      if (filters.reservationType === "Upcoming") {
        payload.filters.push({
          col: "booking_status",
          type: "string",
          val: BOOKING_STATUS_UPCOMING,
        });
        //   payload.filters.push({  col: "order_date",  type: "range",  val: { min: moment().format("YYYY-MM-DD"), max: moment().add(2, "years").format("YYYY-MM-DD")},
        // });
      }

      if (filters.reservationType === "Completed") {
        payload.filters.push({
          col: "booking_status",
          type: "string",
          val: BOOKING_STATUS_COMPLETED,
        });
      }
      if (filters.reservationType === "Unsucessfull") {
        payload.filters.push({
          col: "booking_status",
          type: "string",
          val: BOOOKING_STATUS_PENDING,
        });
      }

      if (filters.reservationType === "Cancelled") {
        payload.filters.push({
          col: "booking_status",
          type: "string",
          val: BOOKING_STATUS_CANCELLED,
        });
      }

      //additional filters based on fromDate and toDate
      if (filters.fromDate && filters.toDate) {
        payload.filters.push({
          col: "created_at",
          type: "range",
          val: { min: filters.fromDate, max: filters.toDate },
        });
      }

      // Add sorting filters if sortBy is provided
      if (filters.sortBy) {
        payload.sort = { orderby: filters.sortBy, col: filters.col };
      }

      //filter
      if (
        filters.paymentStatus === "pending" ||
        filters.paymentStatus === "paid"
      ) {
        const val =
          filters.paymentStatus === "pending"
            ? PAYMENT_PENDING
            : PAYMENT_COMPLETED;
        payload.filters.push({ col: "payment_status", type: "string", val:`${val}` });
      }
    }
    return payload;
  };

  const filterData = async (payload) => {
    if ( userId ) {
      const response = await getCustomerReservations(payload);
      setFilteredReservations(response);
    }
    else {
      console.log('user id not found', userId)
    }
  };
   
  

  const handleSearchQuery = (value) => {
    let lowerCaseValue = value.toLowerCase();
    const filterQuery = reservations.filter((reservation) => {
      const listingTitle =
        listingHashMap[reservation?.listing_id]?.title?.toLowerCase();
      return listingTitle && listingTitle.includes(lowerCaseValue);
    });
    setFilteredReservations(filterQuery);
  };

  return (
    <div className="flex flex-col gap-4">
      {/*Header for desktop*/}
      <div className="hidden md-m:block">
        <Header
          filters={filters}
          setFilters={setFilters}
          handleSearchQuery={handleSearchQuery}
        />
      </div>

      <Filters filters={filters} setFilters={setFilters} />

      <SortDialogMobile
        open={openSortDialog}
        setOpen={setOpenSortDialog}
        filters={filters}
        setFilters={setFilters}
      />

      <ReservationList
        reservations={filteredReservations}
        isDefault={isDefault}
        listingHashMap={listingHashMap}
        regionHashmap={regionHashmap}
      />
    </div>
  );
}

export default CustomerReservation;
