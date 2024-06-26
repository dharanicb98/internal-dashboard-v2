import { useState } from "react";
import Dialog from "ui/dialog";
import { FilledButton } from "ui/buttons";
import OutlinedInput from "src/ui/input/outlinedInput";
import Divider from "ui/divider";
import ToggleGroup from "ui/input/toggleGroup";

function CohostDialog({ cohostOpen, setCohostOpen }) {
  const [email, setEmail] = useState("");

  const accessList = [
    {
      key: "Messages",
      value: "messages",
    },
    {
      key: "Calendar",
      value: "calendar",
    },
    {
      key: "Email",
      value: "email",
    },
    {
      key: "Transcation History ",
      value: "transcation",
    },
    {
      key: "Booking Request",
      value: "booking",
    },
    {
      key: "cancelation",
      value: "cancelation",
    },
    {
      key: "Biding request  ",
      value: "biding",
    },
  ];

  return (
    <Dialog
      onClose={() => setCohostOpen(false)}
      open={cohostOpen}
      contentClass={"h-auto w-[95%] md-m:w-[622px] bg-[#fff] py-6 rounded-xl "}
    >
      <div className="relative h-full overflow-y-scroll">
        <h3 className=" text-xl font-medium grid justify-items-center">
          Specific Access to Co-Host{" "}
        </h3>
        <Divider className="my-8" />
        <div className="px-6">
          <p className="mb-4 text-xl font-medium">Via email</p>
          <OutlinedInput
            className={
              "rounded-lg p-2 !border-grey border w-full text-base mb-8"
            }
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label={"Enter email"}
          />
          <div className="grid grid-cols-1  gap-x-[72px] gap-y-8 mb-8 ">
            {accessList.map((item, idx) => (
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
          <div className="flex w-full bg-[#fff] grid justify-items-center absolute sticky left-0 bottom-0">
            <FilledButton
              text="Apply"
              onClick={() => {}}
              buttonClass="px-6 px-2.5 text-base font-normal "
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CohostDialog;
