import React from "react";
import Button from "../button";

const PageHeader = ({
  onClick,
  title,
  titleClassName,
  buttonName = "Create",
}) => (
  <div className="flex justify-between items-center m-3 mt-6 ">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <Button
      onClick={onClick}
      className={`m-3 sm:w-[100px] ${titleClassName}`}
      value={buttonName}
      type="black"
    />
  </div>
);

export default PageHeader;
