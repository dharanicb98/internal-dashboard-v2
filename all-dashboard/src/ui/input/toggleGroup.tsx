import React from "react";
import Image from "next/image";
import Toggle from "./toggle";

const ToggleGroup = (props: ToggleGroupProps) => {
  const {
    title,
    description,
    icon,
    width,
    height,
    checked,
    handleChange,
    containerClass = "",
    titleClassName,
  } = props;

  return (
    <div className={`flex justify-between w-full ${containerClass}`}>
      <div className="flex flex-row gap-4 font-normal items-center">
        {/* {!!icon && (
          <Image src={icon} alt="icon" width={width} height={height} />
        )} */}
        <div>
          <p className={`break-all ${titleClassName}`}>{title}</p>
          {!!description && (
            <p className="text-grey-dark text-xs">{description}</p>
          )}
        </div>
      </div>
      <Toggle checked={checked} onChange={() => handleChange(!checked)} />
    </div>
  );
};

export default ToggleGroup;

interface ToggleGroupProps {
  title: string;
  titleClassName?:string;
  description?: string;
  icon?: string;
  checked: boolean;
  handleChange: (state: boolean) => void;
  width?: number;
  height?: number;
  containerClass?: string;
}
