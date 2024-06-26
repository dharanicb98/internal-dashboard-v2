import React from "react";

function NeedHelpCard({ cardClassname = "" }) {
  return (
    <div
      className={`flex flex-col gap-4 max-w-[388px] p-7 rounded-2xl border border-[#D9D9D9] ${cardClassname}`}
    >
      <div className="flex">
        <p className="text-lg font-medium">Need any Help?</p>
      </div>
      <div>
        <p className="text-[#000000B2] leading-6">
          Sorry for the inconvenient Rest assured, we’re taking immediate steps
          to address the issue and restore your property to its original state.{" "}
        </p>
      </div>
    </div>
  );
}

export default NeedHelpCard;
