import React, { useId } from "react";

function FloatingInput({
  onChange,
  value,
  type = "text",
  label,
  labelClass = "",
  inputClass = "",
  className = "",
  showImage = false,
  showPassword = false,
  handleShowPassword = () => {},
}) {
  let id = useId();

  return (
    <div className={`relative ${className} rounded-lg `}>
      <input
        id={`${id}-${label}`}
        value={value}
        onChange={onChange}
        type={type}
        className={`block px-2.5 pb-2.5 pt-4 w-auto  text-sm text-gray-900 bg-transparent rounded-lg 
     border-[#D9D9D9] appearance-none dark:text-white dark:border-[#D9D9D9]  dark:focus:border-[#D9D9D9] focus:outline-none
    focus:ring-0 focus:border-[#D9D9D9] peer !bg-white floating-input ${inputClass}`}
        placeholder=""
      />

      <label
        htmlFor={`${id}-${label}`}
        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 
    scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-gray-500
    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${labelClass}`}
      >
        {label}
      </label>
      {showImage && (
        <div
          className="cursor-pointer absolute top-0 right-0"
          onClick={handleShowPassword}
        >
          {showPassword ? <EyeOpen /> : <EyeClose />}
        </div>
      )}
    </div>
  );
}

const EyeOpen = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 absolute top-5 right-4 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

const EyeClose = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 absolute top-5 right-4 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
};

export default FloatingInput;
