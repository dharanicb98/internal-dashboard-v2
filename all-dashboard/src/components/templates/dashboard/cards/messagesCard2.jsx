import React from "react";
import Avatar from "ui/avatar";
import Divider from "ui/divider";
import PropertyImage from "assets/images/MessageCardImage.png";
import Image from "next/image";
import RedArrow from "assets/images/rightarrowred.png";

const MessageCard = () => {
  return (
    <div className="border border-solid border-[#5C5C5C] rounded-2xl">
      <div className="px-6 py-4">
        <div className="flex justify-between">
          {/* left side */}
          <div className="flex flex-col w-1/2">
            <div className="flex items-center gap-4">
              <div>
                <Avatar />
              </div>
              <div className="flex flex-col">
                <div className="text-[20px] font-medium">Lucas Curry</div>
                <div className="text-[#5c5c5c]">July 18 at 2:45 pm</div>
              </div>
            </div>
            <div className="pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              rem sed nemo molestiae velit repellendus hic quibusdam, quaerat
              suscipit rerum modi labore aliquam laborum ipsa omnis enim
              reprehenderit odio! Sapiente?
            </div>
          </div>
          <Divider orientation="vertical" />
          {/* property image and other details */}
          <div>
            <div className="flex">
              <div className="mr-4">
                <Image src={PropertyImage} alt="PropertyImage" />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="text-[20px] font-medium">5BR Dubai Lake</div>
                <div className="flex text-[14px] font-normal">
                  <div className="mr-2.5">$7800</div>
                  <div className="mr-2.5">
                    <b>&#9679;</b> 2-7 may-2023
                  </div>
                  <div>
                    <b>&#9679;</b> 9 guests
                  </div>
                </div>
                <div className="text-[16px] font-normal">
                  Reservation Code: HCXNDDDF2
                </div>
                <div>
                  <button>
                    <div className="flex items-center gap-1">
                      <div className="text-[#CD264F]">Details</div>
                      <Image
                        src={RedArrow}
                        alt="rightarrowicon"
                        className="w-[21px] h-[10px]"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* pending */}
          <div className="flex items-center justify-center text-[16px]">
            Pending
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
