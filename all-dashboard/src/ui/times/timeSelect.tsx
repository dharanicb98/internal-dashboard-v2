import Select from "ui/input/select";
import ArrowDown from "assets/icons/arrow-down.png";
import Image from "next/image";
import { times } from "src/constants/timer";
import React from "react";
import Divider from "ui/divider";
import Toggle from "ui/input/toggle";
import useMediaQuery from "utils/hooks/useMediaQuery";

const TimerSelect = (props: TimerButtonProps) => {
  const {
    fromTitle = "From",
    toTitle = "To",
    fromValue,
    toValue,
    onChange,
    size = "large",
    fromKey,
    toKey,
    timerSelectContainerClassName="",
  } = props;

  const mediaQuery = useMediaQuery("(max-width: 768px)");

  const fromTimeKey = times.find((item) => item.value === fromValue)?.key;
  const toTimeKey = times.find((item) => item.value === toValue)?.key;
   

  const smallStyles = {
    textKeyClass: "text-grey-light text-xs",
    textValueClass: "mt-1",
    containerClass: "m-2 mr-auto w-full",
  };

  const largeStyles = {
    textKeyClass: "text-grey-light",
    textValueClass: "text-xl mt-1",
    containerClass: "mx-4 my-5 mr-auto w-full",
  };

  const defaultStyles = {
    ...(size === "large" && !mediaQuery ? largeStyles : smallStyles),
  };

  return (
    <div className={`flex items-center justify-center border border-grey-dark rounded-2xl ${timerSelectContainerClassName}`}>
      <Select
        buttonContent={
          <div>
            <p className={defaultStyles.textKeyClass}>{fromTitle}</p>
            <div className="flex items-center gap-4 justify-between">
              <p className={defaultStyles.textValueClass}>{fromTimeKey}</p>
              <Image src={ArrowDown} alt="down" className="h-[7px] w-3 mr-3" />
            </div>
          </div>
        }
        options={times}
        onChange={(value) => onChange(fromKey, value as number)}
        listPaperClass="h-56 overflow-y-auto bg-white shadow-2xl"
        containerClass={`${defaultStyles.containerClass} pl-2`}
      />
      <Divider orientation="vertical" className="border-grey-dark" />
      <Select
        buttonContent={
          <div className="">
            <p className={defaultStyles.textKeyClass}>{toTitle}</p>
            <div className="flex items-center gap-4 justify-between">
              <p className={defaultStyles.textValueClass}>{toTimeKey}</p>
              <Image src={ArrowDown} alt="down" className="h-[7px] w-3 mr-3" />
            </div>
          </div>
        }
        options={times}
        onChange={(value) => onChange(toKey, value as number)}
        listPaperClass="h-56 overflow-y-auto bg-white"
        containerClass={defaultStyles.containerClass}
      />
    </div>
  );
};

export default TimerSelect;

type OnChangeFunc = (key: string, value: number) => void;

interface TimerButtonProps {
  fromTitle?: string;
  toTitle?: string;
  fromValue: string;
  toValue: string;
  onChange: OnChangeFunc;
  size?: "large" | "small";
  fromKey: string;
  toKey: string;
  timerSelectContainerClassName: string;
}

interface TimerProps {
  onChange: any;
  value: any;
}
