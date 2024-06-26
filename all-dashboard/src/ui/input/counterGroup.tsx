import React from "react";
import Counter from "./counter";

const CounterGroup = (props: CounterGroupProps) => {
  const {
    title,
    description,
    handleChange,
    value,
    min = 0,
    max = Infinity,
    titleClass = "",
  } = props;

  return (
    <div className="flex justify-between items-center gap-3">
      <div>
        {!!title && <p className={`${titleClass}`}>{title}</p>}
        {!!description && <p className="text-grey-dark">{description}</p>}
      </div>
      <Counter
        count={value}
        incrementHandler={() => {
          if (value < max) {
            handleChange(value + 1);
          }
        }}
        decrementHandler={() => {
          if (value > min) {
            handleChange(value - 1);
          }
        }}
      />
    </div>
  );
};

export default CounterGroup;

interface CounterGroupProps {
  title?: string;
  description?: string;
  value: number;
  min?: number;
  max?: number;
  handleChange: (value: number) => void;
  titleClass?: string;
}
