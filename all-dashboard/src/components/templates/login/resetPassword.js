import React, {  useState } from 'react'
import FloatingInput from './floatingInput'
import PasswordInput from './passwordInput'
import BackButton from './backButton'
import Title from './title'
import Button from './button'
import OtpCard from './otpCard'
import axios from 'axios'
import { authLoginConstants } from '../../../constants/auth'
import { signInUser } from '../../../services/login';


function ResetPassword({handlePage}) {
  const [otpValue, setOtpValue] = useState(Array(4).fill(''))
  const [page, setPage] = useState('reset-password')
  const [passwordMatch, setPasswordMatch] = useState({enterPassword:'', reEnterPassword:''});
  const [email, setEmail] = useState('')
  const [token, setToken] = useState()
  const [showEnterPassword, setShowEnterPassword] = useState(false)
  const [showRenterPassword, setShowRenterPassword] = useState(false)

  const handlePasswordMatch = ( e, key ) =>  setPasswordMatch((prev) => {return {...prev, [key]:e.target.value}});
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  } 

  const handleShowEnterPassword = () => setShowEnterPassword((prev) => !prev);

  const handleRenterPassword = () => setShowRenterPassword((prev) => !prev)

  const isValidEmail = (email) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    return emailPattern.test(email);
  };

  const handleSavePassword = async () => {
      if (passwordMatch.enterPassword === '' ||  passwordMatch.reEnterPassword === '')  {
        alert('please enter password')
        return
    }
    else if (passwordMatch.enterPassword !== passwordMatch.reEnterPassword) {
      alert('password not matched')
      return
    }

    try {
      let body = {token:token, email:email, password:passwordMatch.enterPassword }
      console.log('body', body)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/reset-password`, body);
      if (response.status === 200) {
        handlePage('sign-in')
        setToken(null)
      }
    }
    catch (e) {
      console.log('e',e)
      alert(e?.response?.data?.error?.message)
    }
    
  };

  const handleGenerateOtp = async () => {
    //email validation
     try {
        if (!email) {
          alert('please give email id')
          return
        }
        if  (!isValidEmail(email)) {
          alert('invalid email id')
          return
        }

       let body = {
        auth_type: authLoginConstants.LOGIN_EMAIL_AND_OTP,
        auth_data: {
          email:email.trim(),
          action:authLoginConstants?.GENERATE_OTP
        }
       }
      //  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth`, body);
      const response = await signInUser( body )
      if (response.status === 200) {
        setPage('otp')
      }
     }
    catch (e) {
      alert( e )
    }
  };

  const handleMatchOtp = async () => {
    try {
      if (!otpValue.join('')) {
        alert('please enter otp')
        return
      }

      let body = {
        auth_type: authLoginConstants.LOGIN_EMAIL_AND_OTP,
        auth_data: {
          email:email.trim(),
          action:authLoginConstants.MATCH_OTP,
          email_otp:otpValue.join('')
        }
      }
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/auth`, body); 
      const response = await signInUser( body )
      if ( response.status === 200 ) {
        setToken(response.data)
        setPage('new-password')
        setOtpValue(Array(4).fill(''))
      } 
    }
    catch (e) {
      alert( e )
    }
  };

  function handleOnKeyPress(e) {
    // console.log(event.key)
    if (event.key === "Enter") {
      event.preventDefault();
      handleGenerateOtp()
    }
  }
 

  return (
    <div className="">
      {page === "reset-password" && (
        <form onSubmit={(e)=>e.preventDefault()} className="animate-fade-in md-1:w-[320px] lg-m:w-[300px] w-full">
          <div className="flex items-center justify-between w-full">
            <Title title="Reset Password" />
            <BackButton handleBack={() => handlePage("e-mail")} />
          </div>
          <FloatingInput
            onChange={(e) => handleEmail(e)}
            value={email}
            className="mt-8"
            label="Email"
            inputClass="w-full"
            onKeyPress={handleOnKeyPress}
          />
          <Button onClick={handleGenerateOtp} text="Send Otp" />
        </form>
      )}

      {page === "otp" && (
        <div className="animate-fade-in md-1:w-[320px] lg-m:w-[300px] w-full">
          <div className="flex items-center justify-between w-full">
            <Title title="Reset Password" />
            <BackButton handleBack={() => setPage("reset-password")} />
          </div>
          <p className="font-normal text-sm leading-5 text-[#5C5C5C] mt-8">
            Enter the OTP we've sent via email{" "}
            {email && (
              <span className="font-medium text-[#0B2238]">{email}</span>
            )}
          </p>
          <OtpCard otpValue={otpValue} setOtpValue={setOtpValue} />
          <Button onClick={handleMatchOtp} text="Verify" />
        </div>
      )}

      {page === "new-password" && (
        <div className="animate-fade-in w-[330px]">
          <div className="flex items-center justify-between w-full">
            <Title title="Reset Password" />
            <BackButton handleBack={() => setPage("reset-password")} />
          </div>
          <PasswordInput
            onChange={(e) => handlePasswordMatch(e, "enterPassword")}
            value={passwordMatch?.enterPassword}
            className="mt-8"
            label="New Password"
            inputClass="w-full"
            type={showEnterPassword ? "text" : "password"}
            showImage={true}
            showPassword={showEnterPassword}
            handleShowPassword={handleShowEnterPassword}
          />
          <PasswordInput
            onChange={(e) => handlePasswordMatch(e, "reEnterPassword")}
            value={passwordMatch?.reEnterPassword}
            className="mt-8"
            label="Re-enter Password"
            inputClass=" w-full"
            type={showRenterPassword ? "text" : "password"}
            showImage={true}
            showPassword={showRenterPassword}
            handleShowPassword={handleRenterPassword}
          />
          <Button onClick={handleSavePassword} text="Save" />
        </div>
      )}
    </div>
  );
}

export default ResetPassword