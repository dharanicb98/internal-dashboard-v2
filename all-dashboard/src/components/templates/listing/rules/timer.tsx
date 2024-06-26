import React from "react";
import Toggle from "ui/input/toggle";
import TimerSelect from "ui/times/timeSelect";
export default function Timer(props: TimerProps) {
  const { onChange, value } = props;

  return (
    <div>
      <TimerSelect
        fromValue={value.check_in_time}
        toValue={value.check_out_time}
        onChange={(key, value) => onChange(key, value)}
        fromTitle="Check-In Time"
        toTitle="Check-Out Time"
        fromKey="check_in_time"
        toKey="check_out_time"
        timerSelectContainerClassName= "md:hidden"
      />
      <div className="border border-grey-dark rounded-2xl p-3 mt-7 md:mt-0">
        <div className="flex items-center justify-between">
          <p className="text-lg">Quite hours</p>
          <Toggle 
          checked={value.is_quite_hours}
          onChange={(check) => onChange("is_quite_hours", check)}
           />
        </div>
        <div className="mt-3 md-m:w-3/5">
          <TimerSelect
            fromValue={value.quite_hours_from}
            toValue={value.quite_hours_to}
            onChange={(key, value) => onChange(key, value)}
            size="small"
            fromKey="quite_hours_from"
            toKey="quite_hours_to"
          />
        </div>
      </div>
    </div>
  );
}

interface TimerProps {
  onChange: any;
  value: any;
}
