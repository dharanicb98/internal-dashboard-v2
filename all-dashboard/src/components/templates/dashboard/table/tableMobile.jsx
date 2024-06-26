import React from "react";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import GrowthIndicator from "assets/images/Growth Indicator.png";
import NegativeIndicator from "assets/images/negativegrowthindicator.png";

const TableComponentMobile = ({ data }) => {
  const result = data?.map((item) => {
    return {
      name: item?.property_name,
      earnings: item?.earnings,
      percentage: item?.growth,
    };
  });
  

  return (
    <table className="table-auto w-full">
      <tbody>
        {result?.map((song, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td
              style={{ color: "rgba(0,0,0,0.80)" }}
              className="text-base font-normal p-4 line-clamp-1 "
            >
              {song.name}
            </td>
            <td className="p-4 text-sm font-semibold">${song?.earnings}</td>
            <td className="text-base font-normal p-4">
              {song?.percentage > 0 ? (
                <div
                  className="w-[75px] rounded-[8px] p-2"
                  style={{ backgroundColor: "rgba(4, 175, 0, 0.10)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">
                      {song?.percentage}%
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
                      {song?.percentage}%
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

export default TableComponentMobile;
