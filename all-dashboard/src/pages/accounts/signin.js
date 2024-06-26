import React from "react";
import LoginLayout from "../../components/layouts/login";
import SignInCard from "../../components/templates/login/signInCard";
import Image from "next/image";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({ src, width, quality }) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
};
export default function SignIn() {
  return (
    <>
      <center className="mb-8 md-m-1:hidden">
        <Image
          loader={localStorageLoader}
          src="/assets/images/loginHKLogo.svg"
          alt="hk-logo"
          width="138"
          height="37"
        />
      </center>
      <SignInCard />
    </>
  );
}

SignIn.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
