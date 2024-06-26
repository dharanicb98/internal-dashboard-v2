import SearchInput from "src/ui/search";
import React from "react";

function Header({handleSearchQuery}) {
  return (
    <div className="flex justify-between items-end">
      <div>
        <p className="text-xl">Reservations</p>
        <p className="text-base text-[#5C5C5C]">
          Total number of bookings done
        </p>
      </div>
      <SearchInput placeholder={"Search"} onChange={(value) => handleSearchQuery(value)} />
    </div>
  );
}

export default React.memo(Header);
