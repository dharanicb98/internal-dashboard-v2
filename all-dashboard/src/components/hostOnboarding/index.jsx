import React from "react";
import { useSelector } from "react-redux";
import StepStart from "./stepStart";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import StepThankYou from "./stepThankYou";

export default function HostForm() {
  const step = useSelector((state) => state.hostPage.currentStep);
  if (step === 0) return <StepStart />;
  if (step === 1) return <Step1 />;
  if (step === 2) return <Step2 />;
  if (step === 3) return <Step3 />;
  if (step >= 4) return <StepThankYou />;

  return <Step1 />;
}
