import React from 'react';
import LoginLayout from '../../components/layouts/login';
import SignUpCard from '../../components/templates/login/signUpCard';
import Image from "next/image";

const localStoragePath = process.env.NEXT_PUBLIC_LOCALSTORAGE_URL;

const localStorageLoader = ({src, width, quality}) => {
  return `${localStoragePath}${src}?q=${quality || 100}`;
}

export default function SignUp() {
  return (
    <>
      <center className='mb-8 md-m-1:hidden'><Image loader={localStorageLoader} src="/assets/images/loginHKLogo.svg" alt="hk-logo" width="138" height="37"/></center>
      <SignUpCard />
    </>
  )
}

SignUp.getLayout = (page) => <LoginLayout>{page}</LoginLayout> 
