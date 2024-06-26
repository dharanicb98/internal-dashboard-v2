import React, { useEffect, useState } from "react";
import Title from "./title";
import { useRouter } from "next/router";
import SignInSignUpButtons from "./signInSignUpButtons";
import Divider from "./divider";
import TermsAndConditions from "./termsAndConditions";
import ThirdPartyButtons from "./thirdPartyButtons";
import FloatingInput from "./floatingInput";
import PasswordInput from "./passwordInput";
import OtpCard from "./otpCard";
import { authLoginConstants } from "../../../constants/auth";
import { countryCodes } from "../../../constants/phoneExtensionWithoutFlag";
import axios from "axios";
import BackButton from "./backButton";
import Image from "next/image";
import ResetPassword from "./resetPassword";
import { signInUser } from "../../../services/login";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "slices/user";
import Cookies from "js-cookie";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({ src, width, quality }) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
};

function SignInCard() {
  const [page, setPage] = useState("sign-in");
  const [signInPayload, setSignInPayload] = useState({ mobile_ext: "+1" });
  const [showMobile, setShowMobile] = useState(false);
  const [otpValue, setOtpValue] = useState(Array(4).fill(""));
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handlePage = (pageType) => setPage(pageType);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handlePayload = (e, key) =>
    setSignInPayload((prev) => {
      return { ...prev, [key]: e.target.value };
    });

  const handleSignInWithEmail = async () => {
    
    if (!signInPayload.email || !signInPayload.password) return alert("Enter Credentials First")
    let body = {
      auth_type: authLoginConstants?.LOGIN_EMAIL_AND_PASSWORD,
      auth_data: {
        email: signInPayload?.email.trim(),
        password: signInPayload?.password.trim(),
      },
    };

    try {
      const response = await signInUser(body);

      if (response.status === 200) {
        let localStorageObj = {
          user_id: response?.data?.user_data?.user_id,
          fname: response?.data?.user_data?.fname,
          lname: response?.data?.user_data?.lname,
          token: response?.data?.jwt_token,
        };
        const userData = response?.data?.user_data || {};
        localStorage.setItem(
          "token",
          JSON.stringify({
            ...userData,
            token: response?.data?.jwt_token,
            userId: userData.user_id,
            isHost: [1, 5, 6].includes(userData.user_role),
          })
        );
        Cookies.set('accessToken', response?.data?.jwt_token)
        // document.cookie = `accessToken=${response?.data?.jwt_token}; path=/`;

        // USER_ROLE_ADMIN: 1,
        // USER_ROLE_HOST: 5,
        // USER_ROLE_CO_HOST: 6,
        // USER_ROLE_CUSTOMER: 10
        dispatch(
          updateUserDetails({
            ...userData,
            token: response?.data?.jwt_token,
            userId: userData.user_id,
            isHost: [5, 6].includes(userData.user_role),
          })
        );

        if (
          response?.data?.user_data?.user_role === 100 ||
          response?.data?.user_data?.user_role === 10
        ) {
          router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`); //navigate to customer
        } else {
          router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`); //navigate to customer admin
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleGenerateOtp = async () => {
    try {
      let body = {
        auth_type: authLoginConstants?.LOGIN_MOBILE_AND_OTP,
        auth_data: {
          mobile: signInPayload?.mobile.trim(),
          mobile_ext: signInPayload?.mobile_ext,
          action: authLoginConstants?.GENERATE_OTP,
        },
      };
      const response = await signInUser(body);
      if (response.status === 200) {
        setShowMobile(true);
      }
    } catch (e) {
      alert(e);
    }
  };

  // useEffect(() => {
  //   if (global?.window && window.location.hash == "#reset") {
  //     setPage("reset-password");
  //   }
  // }, []);

  const matchOtp = async () => {
    let body = {
      auth_type: authLoginConstants.LOGIN_MOBILE_AND_OTP,
      auth_data: {
        mobile: signInPayload?.mobile,
        mobile_ext: signInPayload?.mobile_ext,
        action: authLoginConstants.MATCH_OTP,
        sms_otp: otpValue.join(""),
      },
    };

    try {
      const response = await signInUser(body);
      if (response.status === 200) {
        localStorage.removeItem("token");
        let localStorageObj = {
          user_id: response?.data?.user_data?.user_id,
          fname: response?.data?.user_data?.fname,
          lname: response?.data?.user_data?.lname,
          token: response?.data?.jwt_token,
        };
        const userData = response?.data?.user_data || {};
        localStorage.setItem(
          "token",
          JSON.stringify({
            ...userData,
            token: response?.data?.jwt_token,
            userId: userData.user_id,
            isHost: [5, 6].includes(userData.user_role),
          })
        );

        Cookies.set('accessToken', response?.data?.jwt_token)

        if (
          response?.data?.user_data?.user_role === 100 ||
          response?.data?.user_data?.user_role === 10
        ) {
          router.push(
            `${process.env.NEXT_PUBLIC_DASHBOARD_URL}`
          ); //navigate to customer dashboard
        } else {
          router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`); //navigate to admin dashboard
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  

  return (
    <div className="">
      {/* sign in main page */}
      {page === "sign-in" && (
        <div className="animate-fade-in">
          <Title title="Sign In" />

          <p className="mt-6 font-normal text-sm leading-4 text-[#0B2238]">
            Don’t have an account?{" "}
            <span
              onClick={() =>
                router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}signup`)
              }
              className="underline"
            >
              Sign Up
            </span>
          </p>

          <SignInSignUpButtons
            onClick={() => handlePage("e-mail")}
            title="Sign In with Email"
          />

          <SignInSignUpButtons
            onClick={() => handlePage("phone-number")}
            title="Sign In with Phone Number"
          />

          <Divider />

          <div className="mt-[24px] flex items-center justify-between">
            <ThirdPartyButtons
              src="/assets/icons/facebook-login.svg"
              alt="facebook-logo"
              className="py-[17px] lg-m:px-[40px] lg-b:px-[35px] px-[35px]"
            />
            <ThirdPartyButtons
              src="/assets/icons/google-login.svg"
              alt="google-logo"
              className="py-[17px] lg-m:px-[45px] lg-b:px-[35px] px-[35px]"
            />
            <ThirdPartyButtons
              src="/assets/icons/apple-login.svg"
              alt="apple-logo"
              className="py-[17px] lg-m:px-[45px] lg-b:px-[35px] px-[35px]"
            />
          </div>

          <TermsAndConditions className="mt-[60px]" />
        </div>
      )}

      {/* sign in email page */}

      {page === "e-mail" && (
        <form onSubmit={(e) => e.preventDefault()} className="animate-fade-in">
          <div className="flex items-center justify-between w-full">
            <Title title="Sign In" />
            <BackButton handleBack={() => handlePage("sign-in")} />
          </div>

          <FloatingInput
            onChange={(e) => handlePayload(e, "email")}
            value={signInPayload?.email}
            className="mt-8"
            label="Email"
            inputClass=" w-full"
          />

          <PasswordInput
            onChange={(e) => handlePayload(e, "password")}
            value={signInPayload?.password}
            className="mt-8"
            label="Password"
            inputClass=" w-full"
            type={showPassword ? "text" : "password"}
            showImage={true}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />

          <p
            onClick={() => handlePage("reset-password")}
            className="text-[#0B2238] font-normal leading-4 text-sm underline mt-3 text-right cursor-pointer md:w-full"
          >
            Forget Password
          </p>

          <TermsAndConditions />

          <button
            type="submit"
            onClick={handleSignInWithEmail}
            className="font-medium text-base leading-5 mt-8 bg-[#000000] h-[39px] w-[108px] px-[10px] py-[24px] flex items-center justify-center text-[#FFFFFF] rounded-[10px] cursor-pointer"
          >
            Sign In
          </button>
        </form>
      )}

      {/* sign in with phone number */}
      {page === "phone-number" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between w-full">
            <Title title="Sign In" />
            <BackButton handleBack={() => handlePage("sign-in")} />
          </div>

          <p className="text-[#0B2238] font-normal text-sm leading-5 mt-8 ">
            With Phone Number
          </p>

          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="flex justify-start items-center gap-x-4 mt-8  ">
              <select
                onChange={(e) => handlePayload(e, "mobile_ext")}
                value={signInPayload?.mobile_ext}
                className="border px-2.5 pb-2.5 pt-4 border-[#D9D9D9] rounded-lg  w-[100px] text-[16px]"
              >
                {countryCodes.map((code, index) => (
                  <option
                    key={index}
                    value={code?.dial_code}
                    className="text-[5px] text-pink-400"
                  >
                    {signInPayload?.mobile_ext === code?.dial_code
                      ? code.dial_code
                      : code.name}
                  </option>
                ))}
              </select>
              <FloatingInput
                label="Phone"
                inputClass={` w-full`}
                type="tel"
                onChange={(e) => handlePayload(e, "mobile")}
                value={signInPayload?.mobile}
              />
            </div>

            <button
              onClick={handleGenerateOtp}
              className="w-[113px] h-[39px] rounded-lg px-[24px] py-[10px] bg-[#000000] mt-8 font-medium text-base leading-5 text-[#FFFFFF]"
            >
              Get OTP
            </button>
          </form>
          <p className="font-normal text-sm leading-5 text-[#5C5C5C] mt-8">
            Enter the OTP we've sent via SMS{" "}
            {showMobile && (
              <span className="font-medium text-[#0B2238]">
                {signInPayload?.mobile_ext} {signInPayload?.mobile}
              </span>
            )}
          </p>

          <OtpCard otpValue={otpValue} setOtpValue={setOtpValue} />

          <TermsAndConditions />

          <button
            onClick={matchOtp}
            className="mt-8 bg-[#000000] w-[118px] h-[39px] rounded-lg py-[10px] px-[24px] text-[#FFFFFF] font-medium leading-5 text-base"
          >
            Continue
          </button>
        </div>
      )}

      {page === "reset-password" && <ResetPassword handlePage={handlePage} />}
    </div>
  );
}

export default SignInCard;
