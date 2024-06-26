import Image from "next/image";
import CloseIcon from "assets/icons/close-rounded.svg";
import ChevronLeftIcon from "assets/icons/chevron-left.svg";
import { CardContainer } from "./detailsDialog";

function TransactionDetailsContent(props) {
  const { onClose } = props;
  return (
    <div className="flex flex-col gap-y-8 bg-white  rounded-2xl text-sm relative px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={ChevronLeftIcon}
            alt="left"
            width={10}
            height={15}
            className="cursor-pointer mr-4"
            onClick={onClose}
          />
          <p className="text-xl font-medium">Transaction Details</p>
        </div>
        <Image
          src={CloseIcon}
          alt="close"
          width={26}
          height={26}
          className="cursor-pointer md:!w-6 md:!h-6"
          onClick={onClose}
        />
      </div>
      <CardContainer>
        <div className="flex justify-between gap-x-12">
          <div>
            <p>30 May, 2023</p>
            <p className="mt-1 text-grey-light text-xs">1 Transaction</p>
          </div>
          <div>
            <p className="text-lg font-medium text-right">$1100</p>
            <a className="underline text-xs font-light text-grey-light">
              DHHUGUGOG
            </a>
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-x-12">
          <div>
            <p>Cancellation Fee</p>
            <p className="mt-1 font-light text-xs">Emma, 10-12 July 2023</p>
          </div>
          <p className="text-lg font-medium">$1100</p>
        </div>
        <div className="flex justify-between mt-4 gap-x-12">
          <div>
            <p>Cancellation Fee</p>
            <p className="mt-1 font-light text-xs">Emma, 10-12 July 2023</p>
          </div>
          <p className="text-lg font-medium">$1100</p>
        </div>
        <div className="flex justify-between mt-4 gap-x-12">
          <div>
            <p>Cancellation Fee</p>
            <p className="mt-1 font-light text-xs">Emma, 10-12 July 2023</p>
          </div>
          <p className="text-lg font-medium">$1100</p>
        </div>
        <div className="flex justify-between mt-4 gap-x-12">
          <div>
            <p>Cancellation Fee</p>
            <p className="mt-1 font-light text-xs">Emma, 10-12 July 2023</p>
          </div>
          <p className="text-lg font-medium">$1100</p>
        </div>
      </CardContainer>
      <CardContainer>
        <p className="font-medium text-lg">Payout Details</p>
        <div className="flex justify-between mt-6 gap-x-12">
          <p className="">Payout Released</p>
          <p className="">18 July,2023</p>
        </div>
        <div className="flex justify-between mt-6 gap-x-12">
          <p className="">Estimated Arrival</p>
          <p className="">18 July,2023</p>
        </div>
        <div className="flex justify-between mt-6 gap-x-12">
          <p className="">Payout Method</p>
          <p className="">xxx5200</p>
        </div>
      </CardContainer>
    </div>
  );
}

export default TransactionDetailsContent;
