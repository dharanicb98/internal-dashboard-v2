import React, { useState } from "react";
import { PageHeading, PageSubHeading, RedButton } from "./step1";
import Icon from "../../public/assets/icons/icon";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../store/slices/hostSlice";
import InputOTP from "../../ui/input/otpInput";
import {
  verifyOnBoardingHost,
  resendOTP,
} from "../../services/onBoardingHostServices";
import Image from "next/image";
import { createDocUSign } from "../../services/onBoardingHostServices";
import { useEffect } from "react";
import Modal from "../../ui/dialog";
import { useSelector } from "react-redux";

export default function Step2() {
  const myLoader = ({ src, width, quality }) => {
    return `https://cdn.holidaykeepers.com/wp-content/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const [mobileLabel, setMobileLabel] = useState("");
  const [emailLabel, setEmailLabel] = useState("");
  const [mobileCode, setMobileCode] = useState("");
  const [isPopupModalVisible, setIsPopupModalVisible] = useState(false);
  const [emailVerficationCode, setemailVerficationCode] = useState("");
  const [OTPVerificationCode, setOTPVerficationCode] = useState("");
  const [modalErrorContent, setModalErrorContent] = useState("");

  const dispatch = useDispatch();
  const hostPassword = useSelector((state) => state.hostPage.hostPassword);

  const verifyUser = async (body) => {
    // make api call here and return true if valid , else false
    try {
      await verifyOnBoardingHost({...body, password:hostPassword});
      return true;
    } catch (e) {
      // alert(e?.response?.data?.error?.message || e.message);
      setModalErrorContent(e?.response?.data?.error?.message || e.message);

      return false;
    }
  };

  const createDocument = async (payload) => {
    try {
      console.log("this payload :", { payload });
      return await createDocUSign(payload);
    } catch (e) {
      // alert(e?.response?.data?.error?.message || e.message);
      setModalErrorContent(e?.response?.data?.error?.message || e.message);
      return false;
    }
  };
  const handleClick = async () => {
    console.log(
      "required Host id :",
      JSON.parse(localStorage.getItem("hostDetails")).id
    );
    console.log("Verification Codes:", {
      emailVerficationCode,
      OTPVerificationCode,
    });
    const id = JSON.parse(localStorage.getItem("hostDetails")).id;
    const isVerified = await verifyUser({
      email_code: emailVerficationCode,
      sms_code: OTPVerificationCode,
      id: Number(id),
    });
    console.log("isVerified debug", isVerified);
    if (isVerified) {
      // api call here
      const hostDetails = JSON.parse(localStorage.getItem("hostDetails"));
      const payload = {
        fname: hostDetails.fname,
        lname: hostDetails.lname,
        email: hostDetails.email,
        clientUserId: "1234",
        id: hostDetails.id,
        company_name: hostDetails.company_name,
        host_type: Number(hostDetails.host_type),
      };
      console.log("payload at step2 check:", { payload });
      const PDF_URL = await createDocument(payload);
      if (PDF_URL) {
        console.log(" i am setting to localstorage", PDF_URL.data);
        localStorage.setItem("PDF_URL", JSON.stringify(PDF_URL.data));
        dispatch(nextStep());
      }
    }
  };

  const resendOTPS = async () => {
    setIsPopupModalVisible(true);
    setTimeout(() => {
      setIsPopupModalVisible(false);
    }, 1300);
    const hostDetails = JSON.parse(localStorage.getItem("hostDetails"));
    const id = hostDetails.id;
    try {
      await resendOTP(id);
    } catch (e) {
      console.log("sorry there is error :", e);
    }
  };

  useEffect(() => {
    const hostDetails = JSON.parse(localStorage.getItem("hostDetails"));
    setEmailLabel(hostDetails.email);
    setMobileLabel(hostDetails.mobile);
    setMobileCode(hostDetails.phone_ext);
  }, []);
  return (
    <div className="">
      <Modal
        open={Boolean(modalErrorContent)}
        onClose={() => setModalErrorContent("")}
        contentClass={"h-auto w-[95%] md-m:w-[422px] bg-[#fff] p-6 rounded-xl "}
      >
        <h3 className="text-center font-[600] text-[18px] mb-3">Try Again</h3>
        <p className="text-center mb-7">{modalErrorContent}</p>

        <span onClick={() => setModalErrorContent("")} className="border-t-[1px] border-grey-100 pt-3 cursor-pointer block text-center text-[#CD264F]">Okay</span>
      </Modal>
      <div className="mx-auto">
        <div className="p-4 md:p-0 pt-10 md:mt-10  flex flex-col gap-3">
          <PageHeading className={"  md:text-4xl"}>
            Let's verify your Phone number and Email
          </PageHeading>
          <PageSubHeading className={""}>We have sent a code</PageSubHeading>
          <div className="w-[70%]">
            <div className="flex flex-col gap-6">
              <InputOTP
                placeholder={"Email OTP"}
                value={emailVerficationCode}
                onChange={(e) => setemailVerficationCode(e.target.value)}
                lable={"Email"}
                lable2={`An OTP has been sent to your ${emailLabel}`}
              />
              <InputOTP
                placeholder={"Mobile OTP"}
                value={OTPVerificationCode}
                onChange={(e) => setOTPVerficationCode(e.target.value)}
                lable={"Mobile"}
                lable2={`An OTP has been sent to your ${mobileCode} ${mobileLabel}`}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="my-2 col-span-4">
              <button
                onClick={resendOTPS}
                className="underline underline-offset-8 "
              >
                Resend OTP
              </button>
            </div>
            {isPopupModalVisible ? (
              <div className="flex justify-center">
                <Image
                  src={"2023/06/OTP-loader.gif"}
                  alt={"Loading..."}
                  loading="lazy"
                  height={40}
                  width={40}
                  loader={myLoader}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-4 md:justify-end mb-14 mt-5 ">
            <button
              type="button"
              onClick={() => dispatch(prevStep())}
              className="border p-4 rounded-lg border-black rotate-90"
            >
              <Icon icon="leftArrowSVG" />
            </button>
            <input
              className="bg-black text-white rounded-lg px-5 py-3 cursor-pointer w-full"
              type={"submit"}
              value="Next"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
