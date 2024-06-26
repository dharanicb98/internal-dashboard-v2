import React from "react";
import Textarea from "ui/input/textarea";
import Toggle from "ui/input/toggle";

const CustomRules = (props: any) => {
  const { onChange, value = "", disabled, changeDisableState } = props;

  const handleMessage = (value: string) => {
    onChange(value);
  };

  return (
    <div className="rounded-2xl border-grey border-2 p-4 bg-smoke min-w-[370px] md:min-w-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <p className="text-lg">Add custom rules</p>
        <Toggle checked={disabled} onChange={changeDisableState} />
      </div>
      <div className="flex justify-center">
        <Textarea
          row={5}
          value={value}
          onChange={handleMessage}
          className="text-sm border border-grey"
        />
      </div>
    </div>
  );
};

export default CustomRules;
