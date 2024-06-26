import React from "react";
import Divider from "ui/divider";
import Image from "next/image";
import ChevronRight from "assets/images/chevron-right.png";

const MobileTabPayments = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-7 mt-8">
        <div className="text-lg font-normal">Your Payment Methods</div>
        <div>
          <button>
            <Image src={ChevronRight} alt="chevron-right" />
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between mb-7 mt-6">
        <div className="text-lg font-normal">Your Payment Methods</div>
        <div>
          <button>
            <Image src={ChevronRight} alt="chevron-right" />
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between mb-7 mt-6">
        <div className="text-lg font-normal">Your Payment Methods</div>
        <div>
          <button>
            <Image src={ChevronRight} alt="chevron-right" />
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between mb-7 mt-6">
        <div className="text-lg font-normal">Your Payment Methods</div>
        <div>
          <button>
            <Image src={ChevronRight} alt="chevron-right" />
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between mb-7 mt-6">
        <div className="text-lg font-normal">Your Payment Methods</div>
        <div>
          <button>
            <Image src={ChevronRight} alt="chevron-right" />
          </button>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default MobileTabPayments;
