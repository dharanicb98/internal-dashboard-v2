import React from "react";
import { useDispatch } from "react-redux";
import { updateStep } from "../../../../store/slices/hostSlice";
import { getHostDetail } from "../../../../services/onBoardingHostServices";
export default function Stepper({ steps, activeStep }) {
  const dispatch = useDispatch();
  const handleClick = async (step) => {
    if (step >= activeStep) return;

    if (step == 1) {
      const id = JSON.parse(localStorage.getItem("hostDetails")).id;
      const hostDetail = await getHostDetail(id);
      
      if (
        hostDetail.data[0].is_email_verify &&
        hostDetail.data[0].is_sms_verify
      ) {
        return;
      }
    }

    if (step == 2) {
      const id = JSON.parse(localStorage.getItem("hostDetails")).id;
      const hostDetail = await getHostDetail(id);
      if (
        hostDetail.data[0].is_email_verify &&
        hostDetail.data[0].is_sms_verify
      ) {
        return;
      }
    }
    if (step == 3) {
      const id = JSON.parse(localStorage.getItem("hostDetails")).id;
      const hostDetail = await getHostDetail(id);
      if (hostDetail.data[0].agreement_status === "completed") {
        return;
      }
    }

    dispatch(updateStep(step));
  };

  return (
    <div className="w-full from-black to-white flex gap-2 items-center">
      {steps.map((step, key) => {
        return (
          <>
            {key ? (
              <div
                className={`w-full ${
                  step <= activeStep ? "bg-black" : "bg-black opacity-5"
                } h-[2px]`}
              ></div>
            ) : null}
            <StepperButton
              onClick={() => handleClick(step)}
              active={step <= activeStep}
            >
              {step}
            </StepperButton>
          </>
        );
      })}
    </div>
  );
}

const StepperButton = ({ children, className, active, ...props }) => {
  return (
    <button
      className={`w-12 h-12 text-lg font-bold aspect-square border-2 border-black rounded-full flex justify-center items-center ${
        active ? "bg-black text-white" : "bg-transparent"
      } p-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
