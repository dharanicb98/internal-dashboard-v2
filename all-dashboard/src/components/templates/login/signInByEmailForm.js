import React, { useState } from 'react'
import Title from './title';
import BackButton from './backButton';
import FloatingInput from './floatingInput';
import TermsAndConditions from './termsAndConditions';
import { countryCodes } from "../../../constants/phoneExtensionWithoutFlag";

const SignInByEmailForm = ({ handleSignUp ,handlePage,payload,setPayload}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState();
  
  const handleShowPassword = () => setShowPassword((prev) => !prev);


  const handleInput = (e, key) =>
    setPayload((prev) => {
      return { ...prev, [key]: e.target.value };
    });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("hey--");
    handleSignUp();
  };
  return (
    <form onSubmit={handleFormSubmit} className="animate-fade-in ">
      <div className="flex  items-center justify-between w-full">
        <Title title="Sign Up" />
        <BackButton type="button" handleBack={() => {
          handlePage("sign-up");
        }
        }  />
      </div>

      <div className="flex md-1:flex-col  gap-x-6 justify-between  mt-8 ">
        {/* <div className=''> */}
        <FloatingInput
          label="First Name"
          onChange={(e) => handleInput(e, "fname")}
          value={payload?.fname}
          inputClass={"!w-full"}
          className="mt-8"
        />
        {/* </div> */}

        {/* <div className='w-full md-m:w-[35%]'> */}
        <FloatingInput
          label="Last Name"
          onChange={(e) => handleInput(e, "lname")}
          value={payload?.lname}
          inputClass={"!w-full"}
          className="mt-8"
        />
        {/* </div> */}
      </div>

      <FloatingInput
        type="email"
        label="Email"
        onChange={(e) => handleInput(e, "email")}
        value={payload?.email}
        inputClass="!md-m:w-[380px] !w-full"
        className="mt-8"
      />

      <div className="flex items-center gap-x-2 mt-8 w-[100%]">
        <select
          onChange={(e) => handleInput(e, "mobile_ext")}
          value={payload?.mobile_ext}
          className="border px-2.5 pb-2.5 pt-4 border-[#D9D9D9]  rounded-lg  w-[100px]"
        >
          {countryCodes.map((code, index) => (
            <option
              key={index}
              value={code?.dial_code}
              className="text-[14px] w-[100px]"
            >
              {payload?.mobile_ext === code?.dial_code
                ? code.dial_code
                : code.name}
            </option>
          ))}
        </select>

        <div className="w-full">
          <FloatingInput
            value={payload?.mobile}
            label="Phone"
            type="tel"
            onChange={(e) => handleInput(e, "mobile")}
            inputClass={"!md-m:w-[300px] !w-full"}
          />
        </div>
      </div>

      <FloatingInput
        label="Password"
        onChange={(e) => handleInput(e, "password")}
        value={payload?.password}
        type={showPassword ? "text" : "password"}
        className="mt-8"
        showImage={true}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
        inputClass="w-full"
      />

      <TermsAndConditions />

      <button
        // onClick={handleSignUp}
        type="submit"
        className="font-medium text-base leading-5 mt-9 bg-[#000000] h-[39px] w-[108px] px-[10px] py-[24px] flex items-center justify-center text-[#FFFFFF] rounded-[10px] cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignInByEmailForm
