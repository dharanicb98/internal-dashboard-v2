import React from "react";
import Accordian from "../../accordian";
function index({ faq, index, hanldeFaqClick }) {
  return (
    <div className="mt-[26px]">
      <Accordian
        question={faq}
        variant="span"
        sd={{ size: "text-base", width: "w-full", margin: "mb-1" }}
        className="text-base"
        page="city"
        index={index}
        hanldeFaqClick={hanldeFaqClick}
      />
      <div className="h-[0.5px] bg-black mt-[8px]"></div>
    </div>
  );
}
export default index;
// Accordion Component:
// variant & sd have been applied fot the question part where as className is applied to the answer.
