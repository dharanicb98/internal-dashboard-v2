import Image from "next/image";
import React from "react";
import EditIcon from "assets/icons/edit.png";
import DeleteIcon from "assets/icons/deleteIcon.png";

export default function PricingCard(props: PricingCardProps) {
  const { pricing, title, content, onEditClick,onCreateBlockClick, onRemoveClick, hideText, hidePrice, hideEdit,hideBlock, amount_type } = props;

  const amountType = (price: any) => {
    if (amount_type == "percentage") return price + '%';
    return '$' + price;
  }

  return (
    <div className="flex justify-between items-center px-4 py-2.5 rounded-2xl border-solid border border-grey-dark md:block">
      {!hidePrice ? <div className="border-r pr-4 md:hidden">
        <div className="text-center font-medium text-xl">{amountType(pricing)}</div>
        {!hideText ? <div className="text-grey-dark">per night</div> : ''}
      </div> : ''}
      <div className={`ml-${hidePrice ? 0 : 14} flex gap-14 items-center mr-auto text-xl md:hidden`}>
        <div className="font-medium">{title}</div>
        <div className="text-grey-dark">{content}</div>
      </div>
      <div className="items-center md:hidden">
        <button
          type="button"
          className="text-grey-dark rounded-full text-sm px-5 py-2.5 text-center"
          onClick={onRemoveClick}
        >
          Remove
        </button>
        {!hideBlock && <button
          type="button"
          className="text-white bg-black rounded-full px-6 py-2.5 mx-5 text-center text-lg"
          onClick={onCreateBlockClick}
        >
          Block
        </button>}
        {!hideEdit ? <button
          type="button"
          className="text-white bg-black rounded-full px-6 py-2.5 text-center text-lg"
          onClick={onEditClick}
        >
          Edit
        </button> : ''}
      </div>
      <div className="flex items-center justify-between gap-4 md-m:hidden">
        <div className="text-lg ellipsis">{title}</div>
        <div className="font-medium text-xl">{`$${pricing}`}</div>
      </div>
      <div className="flex items-center justify-between md-m:hidden">
        {/* {!hideText ? <div className="text-grey-dark">per night</div> : ''} */}
        <div className="text-grey-dark text-[14px]">{content}</div>
        <button type="button" className="" onClick={onRemoveClick}>
          <Image src={DeleteIcon} className="w-3 h-3" alt="edit" />
        </button> 
        {!hideEdit ? <button type="button" className="" onClick={onEditClick}>
          <Image src={EditIcon} alt="edit" />
        </button> : ''}
        {!hideBlock ? <button type="button" className="" onClick={onCreateBlockClick}>
          +
        </button> : ''}
      </div>
      <div className="hidden ml-14 ml-0" />
    </div>
  );
}

interface PricingCardProps {
  pricing: number;
  hideEdit?: any;
  hidePrice?: any;
  hideText?: any;
  hideBlock?: any;
  amount_type?: any;
  title: string;
  content: React.ReactNode;
  onRemoveClick: () => void;
  onEditClick?: () => void;
  onCreateBlockClick?: () =>void;
}
