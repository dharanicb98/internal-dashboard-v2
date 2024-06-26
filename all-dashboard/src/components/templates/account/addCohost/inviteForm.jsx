import React, { useState } from "react";
import ArrowLeftIcon from "assets/icons/chevron-left.svg";
import OutlinedInput from "../common/outlinedInput";
import Image from "next/image";
import ToggleGroup from "ui/input/toggleGroup";
import { FilledButton } from "ui/buttons";
import Divider from "ui/divider";
import CohostDialog from "./cohostDialog";

export default function InviteForm(props) {
  const { changePage } = props;
  const [cohostOpen, setCohostOpen] = useState(false);

  const permissions = [
    {
      key: "Full access",
      value: "full",
    },
    {
      key: "Inbox",
      value: "inbox",
    },
    {
      key: "Insights",
      value: "insights",
    },
    {
      key: "Calendar",
      value: "calendar",
    },
    {
      key: "Listings",
      value: "listing",
    },
    {
      key: "Reservations",
      value: "reservations",
    },
  ];

  return (
    <>
      <CohostDialog cohostOpen={cohostOpen} setCohostOpen={setCohostOpen} />
      <div className="p-4 pl-[72px]">
        <div className="flex justify-between gap-60 xl:gap-40 md:gap-4 md:flex-col">
          <div>
            <button
              className="mb-2 flex items-center gap-[22px] -ml-8"
              onClick={() => changePage(false)}
            >
              <Image
                src={ArrowLeftIcon}
                alt="arrow left icon"
                className="min-w-[9px]"
              />
              <h1 className="text-xl font-medium ">Invite Them</h1>
            </button>
            <p className="text-lg font-normal text-grey-light mb-[38px]">
              Add co-host to manage your property, allowing them to assist with
              tasks and share hosting.
            </p>
            <div className="flex flex-col gap-6">
              <OutlinedInput label="Via email" />
              <OutlinedInput label="Via Phone" />
              <OutlinedInput label="Select Property" />
            </div>
          </div>
          <div className="bg-[#FFF9EA] shrink-0 p-4 rounded-2xl flex h-fit gap-4">
            <div className="">
              <h1 className="mb-2 text-lg font-normal">Referral Link</h1>
              <a href="https://www.figma.com/file/QAvmzv0Gd27hpuZx">
                <p className="text-grey-dark text-base font-normal break-all underline max-w-[200px]">
                  https://www.figma.com/file/QAvmzv0Gd27hpuZx
                </p>
              </a>
            </div>
            <FilledButton
              buttonClass="rounded-full px-5 py-2 ml-4 h-fit mt-auto"
              text="Copy"
            />
          </div>
        </div>
        <Divider className="my-8" />
        <h1 className="text-xl font-medium mb-4">Permission</h1>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-x-[72px] gap-y-8  ">
          {permissions.map((item, idx) => (
            <ToggleGroup
              // checked={}
              handleChange={(checked) => {
                console.log(item.value, checked);
              }}
              title={item.key}
              width={30}
              height={30}
              key={idx}
            />
          ))}
        </div>
        <div className="grid justify-items-end">
          <FilledButton
            buttonClass="rounded-full px-6 py-2.5 mt-16 "
            text="Invite"
          />
        </div>
        <Divider className="my-8" />
        <div onClick={() => setCohostOpen(true)}>
          <span className="flex">
            +{" "}
            <h1 className="mb-2 ml-2  text-lg font-normal underline">
              Add Specific access co-host
            </h1>{" "}
          </span>
        </div>
      </div>
    </>
  );
}
