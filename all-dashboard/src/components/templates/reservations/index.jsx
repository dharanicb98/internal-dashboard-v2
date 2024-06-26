import React from "react";
import ReservationCard from "./reservationCard";
import ReservationCardMobile from "./reservationCardMobile";

export default function ReservationTab(props) {
  const { data, listingHashMap, regionHashmap, filter } = props;

  return (
    <div className="flex flex-col gap-4 ">
      {data?.length ? (
        data?.map((item, idx) => (
          <React.Fragment key={idx}>
            <ReservationCard data={item} listingHashMap={listingHashMap} regionHashmap={regionHashmap}/> 
            <ReservationCardMobile data={item} listingHashMap={listingHashMap} regionHashmap={regionHashmap} />
          </React.Fragment>
        ))
      ) : (
        <p>No reservation found</p>
      )}
    </div>
  );
}
