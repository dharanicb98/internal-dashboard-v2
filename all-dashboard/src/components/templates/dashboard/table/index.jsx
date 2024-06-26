import React from "react";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import GrowthIndicator from "assets/images/Growth Indicator.png";
import NegativeIndicator from "assets/images/negativegrowthindicator.png";

// const TableComponent = ({name, type, earnings, ratings, percentage}) => {

const TableComponent = ({ data }) => {
  // const songs = [
  //   {
  //     propertyname: "174 acre luxury mansion ",
  //     propertytype: "mansion",
  //     earnings: "$9,200",
  //     ratings: 3.5,
  //     growth: +1.3,
  //   },
  //   {
  //     propertyname: "174 acre luxury mansion ",
  //     propertytype: "mansion",
  //     earnings: "$9,200",
  //     ratings: 3.5,
  //     growth: -1.3,
  //   },
  //   {
  //     propertyname: "174 acre luxury mansion ",
  //     propertytype: "mansion",
  //     earnings: "$9,200",
  //     ratings: 3.5,
  //     growth: +1.3,
  //   },
  //   {
  //     propertyname: "174 acre luxury mansion ",
  //     propertytype: "mansion",
  //     earnings: "$9,200",
  //     ratings: 3.5,
  //     growth: -1.3,
  //   },
  //   {
  //     propertyname: "174 acre luxury mansion ",
  //     propertytype: "mansion",
  //     earnings: "$9,200",
  //     ratings: 3.5,
  //     growth: +1.3,
  //   },
  // ];

  const tableHeaders = [
    "Property name",
    "Property type",
    "Earnings",
    "Ratings",
    "Growth",
  ];



  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {tableHeaders?.map((header, index) => (
            <th
              className="bg-[#F9FBFC] text-lg font-medium text-left p-4"
              key={index}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {songs.map((song, index) => ( */}
        {data?.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border-b-[1px] border-grey text-base font-normal p-4">
              {/* {song.propertyname} */}
              {/* {name} */}
              {item.property_name}
            </td>
            <td className="border-b-[1px] border-grey text-base font-normal p-4">
              {/* {song.propertytype} */}
              {/* {type} */}
              {item.property_type}
            </td>
            <td className="border-b-[1px] border-grey text-base font-normal p-4">
              {/* {song.earnings} */}
              {/* {earnings} */}
              ${item?.earnings}
            </td>
            <td className="border-b-[1px] border-grey text-base font-normal p-4">
              <StarRatings
                // rating={song.ratings}
                // rating={ratings}
                rating={item?.ratings}
                starRatedColor="black"
                numberOfStars={5}
                starDimension="18px"
              />
            </td>
            <td className="border-b-[1px] border-grey text-base font-normal p-4">
              {item.growth > 0 ? (
                <div
                  className="w-[75px] rounded-[8px] p-2"
                  style={{ backgroundColor: "rgba(4, 175, 0, 0.10)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">
                      {/* {song.growth}% */}
                      {item.percentage}%
                    </div>{" "}
                    <Image
                      className="w-[22px] h-[22px]"
                      src={GrowthIndicator}
                      alt="growth-indicator"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="w-[80px] rounded-[8px] p-2"
                  style={{ backgroundColor: "rgba(255, 0, 0, 0.10)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">
                      {song?.growth}%{/* {item.percentage}% */}
                    </div>{" "}
                    <Image
                      className="w-[22px] h-[22px]"
                      src={NegativeIndicator}
                      alt="growth-indicator"
                    />
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
