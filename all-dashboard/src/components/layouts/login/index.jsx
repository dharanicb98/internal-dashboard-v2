import React from 'react'
import AuthSideImage from "assets/images/auth.svg";
import Image from "next/image";


function LoginLayout({children}) {
  return (
    <div className="flex w-full md-1:justify-center  bg-white">
      <Image
        src={AuthSideImage}
        alt="auth-image"
        className="object-cover w-[52%] lg-b:w-[60%] xl-m:w-[68%] h-screen  md-1:hidden"
      />
      <div className="lg-b:px-[20px] px-[50px] py-[60px] h-[100vh] mx-auto overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default LoginLayout