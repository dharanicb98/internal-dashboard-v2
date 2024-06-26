import React from "react";
// import Divider from "ui/divider";
// import useMediaQuery from "utils/hooks/useMediaQuery";

const DatesContainer = (props) => {
  const {  fromTitle = "From",  toTitle = "To",  fromValue,  toValue,  size = "large"} = props;
  // const mediaQuery = useMediaQuery("(max-width: 768px)");
  // const formatedFromDate = fromValue  ? fromValue.format("DD MMM YYYY") : "From Date";
  // const formatedToDate = toValue ? toValue.format("DD MMM YYYY") : "To Date";
  // const smallStyles = { textKeyClass: "text-grey-light text-xs",  textValueClass: "mt-1",  containerClass: "m-2 mr-auto w-full"};
  // const largeStyles = { textKeyClass: "text-grey-light",  textValueClass: "text-xl mt-1",  containerClass: "mx-4 my-5 mr-auto w-full",};
  // const defaultStyles = {  ...(size === "large" && !mediaQuery ? largeStyles : smallStyles)};
  
  return (
    <div className="flex items-center justify-center border border-grey-dark rounded-xl">
      <div className="py-3 pl-4 flex flex-col items-start w-full">
        <p className="text-[#6B6B6B]">{fromTitle}</p>
        {/* <p className="text-lg">{formatedFromDate}</p> */}
      </div>
      {/* <Divider orientation="vertical" className="border-grey-dark mx-5" /> */}
      <div className="py-3 pr-4 flex flex-col items-end w-full">
        <p className="text-[#6B6B6B]">{toTitle}</p>
        {/* <p className="text-lg">{formatedToDate}</p> */}
      </div>
    </div>
  );
};

export default DatesContainer;
