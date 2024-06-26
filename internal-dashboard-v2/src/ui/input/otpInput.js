import React from "react";
import { useEffect, useRef, useState } from "react";
const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const focusElements = useRef([]);

  const onChangeInputValue = (event, index) => {
    let value = event.target.value;
    if (!isNaN(value)) {
      let newOtp = [...otp];
      newOtp[index] = value.substring(value.length - 1);
      setOtp(newOtp);

      if (value && index < otp.length && focusElements.current[index + 1]) {
        console.log("===================");
        focusElements.current[index + 1].focus();
      }
    }
  };

  const handleBackSpace = (event, index) => {
    console.log(event.key);
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      focusElements.current[index - 1]
    ) {
      let newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      focusElements.current[index - 1].focus();
    }
  };

  const handleOnClick = (index) => {
    focusElements.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      focusElements.current[otp.indexOf("")].focus();
    }
  };

  useEffect(() => {
    focusElements.current[0].focus();
  }, []);

  //   console.log("isClick", otp, focusElements);

  return (
    <div className="mt-10 w-[50%] ml-10">
      {otp?.map((val, index) => (
        <input
          ref={(inp) => {
            // console.log(inp);
            focusElements.current[index] = inp;
          }}
          key={index}
          type="text"
          value={"" || val}
          onChange={(e) => onChangeInputValue(e, index)}
          onKeyDown={(e) => handleBackSpace(e, index)}
          onClick={() => handleOnClick(index)}
          className="w-[50px] h-[50px]  text-center text-lg mr-2 border-2"
        />
      ))}
    </div>
  );
};

export default OtpInput;

// const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
//   const [otp, setOtp] = useState(new Array(length).fill(""));
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     if (inputRefs.current[0]) {
//       inputRefs.current[0].focus();
//     }
//   }, []);

//   const handleChange = (index, e) => {
//     const value = e.target.value;
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     // allow only one input
//     newOtp[index] = value.substring(value.length - 1);
//     setOtp(newOtp);

//     // submit trigger
//     const combinedOtp = newOtp.join("");
//     if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

//     // Move to next input if current field is filled
//     if (value && index < length - 1 && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleClick = (index) => {
//     inputRefs.current[index].setSelectionRange(1, 1);

//     // optional
//     if (index > 0 && !otp[index - 1]) {
//       inputRefs.current[otp.indexOf("")].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (
//       e.key === "Backspace" &&
//       !otp[index] &&
//       index > 0 &&
//       inputRefs.current[index - 1]
//     ) {
//       // Move focus to the previous input field on backspace
//       inputRefs.current[index - 1].focus();
//     }
//   };
//   console.log(otp);
//   return (
//     <div className="mt-10 w-[50%] ml-10">
//       {otp.map((value, index) => {
//         return (
//           <input
//             key={index}
//             type="text"
//             ref={(input) => (inputRefs.current[index] = input)}
//             value={value}
//             onChange={(e) => handleChange(index, e)}
//             onClick={() => handleClick(index)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             className="w-[50px] h-[50px]  text-center text-lg mr-2 border-2"
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default OtpInput;
