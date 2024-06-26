import React from "react";
import Image from "next/image";
import DecrementIcon from "assets/icons/decrement-outline.svg";
import IncrementIcon from "assets/icons/increment-outline.svg";

export default function Counter(props: CounterProps) {
  const { count, incrementHandler, decrementHandler } = props;

  return (
    <div className="flex items-center gap-5 shrink-0">
      <button onClick={decrementHandler}>
        <Image src={DecrementIcon} alt="decrease" />
      </button>
      <p className="w-[25px] text-center ">{count}</p>
      <button onClick={incrementHandler}>
        <Image src={IncrementIcon} alt="increase" />
      </button>
    </div>
  );
}

interface CounterProps {
  count: number;
  incrementHandler: () => void;
  decrementHandler: () => void;
}
