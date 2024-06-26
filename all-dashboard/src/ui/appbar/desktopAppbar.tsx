import React from "react";
import Image from "next/image";
import ChevronLeft from "assets/icons/chevron-left.svg";
import DefaultAction from "./defaultAction";

export default function DesktopAppBar(props: DesktopAppBar) {
  const { title, action, backAction, sticky, containerClass, path=""} = props;
  return (
    <div
      className={`flex mb-10 items-center flex-between gap-1 overflow-hidden ${containerClass} ${
        sticky ? "sticky top-0" : ""
      } `}
    >
      <div className="flex gap-3 items-center overflow-hidden w-full">
        {!!backAction && (
          <button className="md:hidden" onClick={backAction}>
            <Image src={ChevronLeft} alt="back" />
          </button>
        )}
        <div className={`text-black text-[32px] ellipsis w-full`}>{title}</div>
      </div>
      <div className="md:hidden flex-shrink-0 absolute right-0 ">
        {action ?  action :   <DefaultAction path={path} />}
        {/* In customer and host pages header is same */}
        {/* {<DefaultAction path={path} />} */}
      </div>
    </div>
  );
}

interface DesktopAppBar {
  title?: React.ReactNode;
  action?: React.ReactNode;
  backAction?: VoidFunction;
  sticky?: boolean;
  containerClass?: string;
  path?: string;
}
