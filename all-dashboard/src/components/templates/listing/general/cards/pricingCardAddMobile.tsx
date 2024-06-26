import React from "react";

export default function PricingCardMobile(props: PricingCardProps) {
  const {title, onbuttonclick } = props;

  return (
    <div onClick={onbuttonclick} className="px-4 py-2.5 mt-4 rounded-2xl border-solid border border-grey-dark">
      <div className="flex items-center justify-between">
        <div>{title}</div>

        <div>
          <button onClick={onbuttonclick}>+</button>
        </div>
      </div>
    </div>
  );
}

interface PricingCardProps {
  onbuttonclick: () => void;
  title: string;
}
