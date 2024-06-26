import React, { useState } from "react";
import Title from "./title";
import Divider from "./divider";
import TermsAndConditions from "./termsAndConditions";
import ThirdPartyButtons from "./thirdPartyButtons";
import SignInSignUpButtons from "./signInSignUpButtons";
import { useRouter } from "next/router";
import { userTypesConstants } from "../../../constants/user";
import Dialog from "../../../ui/dialog";
import BackButton from "./backButton";
import Image from "next/image";
import { signUpUser } from "../../../services/login";
import SignInByEmailForm from "./signInByEmailForm";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({ src, width, quality }) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
};

function SignUpCard() {
  const [page, setPage] = useState("sign-up");
  const [showJoinHost, setShowJoinHost] = useState(false);
  const [selectJoinHost, setSelectJoinHost] = useState(false);
  const [payload, setPayload] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
    mobile_ext: "+1",
  });

  const router = useRouter();

  const handlePage = (pageType) => setPage(pageType);

  const handleShowJoinHost = () => {
    setShowJoinHost(false);
    setSelectJoinHost(false);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    return emailPattern.test(email);
  };

  const handleSignUp = async () => {
    try {
      let body = {
        fname: payload?.fname.trim(),
        lname: payload?.lname.trim(),
        email: payload?.email.trim(),
        password: payload?.password.trim(),
        mobile: payload?.mobile.trim(),
        mobile_ext: payload?.mobile_ext.trim(),
      };

      if (selectJoinHost) {
        body["user_role"] = userTypesConstants.USER_ROLE_HOST;
      }

      if (payload?.email && !isValidEmail(payload?.email)) {
        alert("Invalid email");
        return;
      }

      const response = await signUpUser(body);

      if (response.status === 200) {
        router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}signin`);
      }
    } catch (e) {
      alert(e);
    }
  };

  const setRedirectOrShow = () => {
    router.push(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}host-onboard`);
  };

  return (
    <div className="">
      {page === "sign-up" && (
        <div className="animate-fade-in">
          <Title title="Sign Up" />

          <p className="font-normal text-sm leading-4 text-[#0B2238] mt-[24px]">
            Want to host your place?{" "}
            <span
              onClick={setRedirectOrShow}
              className="underline cursor-pointer"
            >
              Get Started
            </span>
          </p>

          <SignInSignUpButtons
            onClick={() => handlePage("e-mail")}
            title="Sign Up with Email"
          />

          <SignInSignUpButtons
            title="Sign Up with Google"
            src="/assets/icons/google-login.svg"
            alt="google-logo"
          />

          <Divider />

          <div className="flex items-center justify-center gap-x-4 mt-6">
            <ThirdPartyButtons
              title="Facebook"
              src="/assets/icons/facebook-login.svg"
              alt="facebook-logo"
              className="w-[182px] h-[56px]"
            />
            <ThirdPartyButtons
              title="Apple"
              src="/assets/icons/apple-login.svg"
              alt="facebook-logo"
              className="w-[182px] h-[56px]"
            />
          </div>

          <center className="mt-[60px]">
            {showJoinHost ? (
              <div className="flex justify-center items-center gap-x-4">
                <p className="text-[#0B2238] font-normal text-sm leading-4">
                  Do you really wish to join as host?
                </p>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => setSelectJoinHost(true)}
                    className={`text-[#000000] font-normal leading-4 text-center border rounded-lg w-10 h-6 border-[#5C5C5C] ${
                      selectJoinHost && "bg-black text-white "
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleShowJoinHost}
                    className="text-[#000000] font-normal leading-4 text-center border rounded-lg w-10 h-6 border-[#5C5C5C]"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-4 text-[#0B2238] font-normal mt-[60px]">
                Already have an account?{" "}
                <span
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_DASHBOARD_URL}signin`
                    )
                  }
                  className="underline"
                >
                  Sign In
                </span>
              </p>
            )}
          </center>

          <TermsAndConditions className="mt-[60px]" />
        </div>
      )}

      {page === "e-mail" && (
        <SignInByEmailForm
          handleSignUp={handleSignUp}
          handlePage={handlePage}
          payload={payload}
          setPayload={setPayload}
        />
      )}
    </div>
  );
}

export default SignUpCard;
