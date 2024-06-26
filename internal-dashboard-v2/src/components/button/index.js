import React from "react";

const buttonStyles = {
  black:
    "bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded sm:text-[16px] self-center",
  primary:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:text-[16px] self-center",
  warning:
    "bg-[#f0ad4e] hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded",
  secondary: "bg-black  text-white font-bold py-2 px-4 rounded",
  danger:
    "bg-[#D9534F] hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
  outline:
    "bg-white hover:bg-gray-700 text-gray-800 hover:text-white font-semibold hover:font-bold py-2 px-4 border border-black rounded shadow",
  success: "bg-[#4CAE4C] text-white font-bold py-2 px-4 rounded",
  info: "bg-[#5BC0DE] text-white font-bold py-2 px-4 rounded",
  cancel:
    "inline-flex justify-center rounded border border-transparent bg-[red] px-4 py-2 text-sm font-medium text-[white] hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
};
const Button = (props) => {
  const {
    value,
    id,
    type,
    className,
    onClick,
    url,
    side,
    profileStyle,
    buttonType,
    name,
  } = props;
  const buttonStyle = buttonStyles[type];

  const renderButtons = () => {
    switch (side) {
      case "left":
        return (
          <div
            className={`relative last:mr-3 lg:last:mr-6 group flex justify-center ${className}`}
            onClick={onClick}
          >
            <button
              className={`flex gap-2 lg:gap-3 relative py-3 px-4 lg:p-[0.6rem] items-center border border-[#d9d9d9] hover:border-black duration-100 z-[1] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-lg lg:rounded-2xl whitespace-nowrap bg-white text-xs lg:text-base h-fit ${buttonStyle}`}
            >
              <img
                src={url}
                alt={value}
                className={`h-[50px] ${profileStyle}`}
              />
              <h3 className="text-[0.813rem] lg:text-xl text-[300] text-black">
                {value}
              </h3>
            </button>
          </div>
        );
      case "right":
        return (
          <div
            className={`relative last:mr-3 lg:last:mr-6 group flex justify-center ${className}`}
            onClick={onClick}
          >
            <button
              className={`flex gap-2 lg:gap-3 relative py-3 px-4 lg:p-[0.6rem] items-center border border-[#d9d9d9] hover:border-black duration-100 z-[1] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-lg lg:rounded-2xl whitespace-nowrap bg-white text-xs lg:text-base h-fit ${buttonStyle}`}
            >
              <h3 className="text-[0.813rem] lg:text-xl text-[300] text-black">
                {value}
              </h3>
              <img
                src={url}
                alt={value}
                className={`h-[50px] ${profileStyle}`}
              />
            </button>
          </div>
        );
      default:
        return (
          <button
            onClick={onClick}
            name ={name}
            type={buttonType && buttonType}
            className={`${buttonStyle} ${className}`}
            id = {id&&id}
          >
            {value}
          </button>
        );
    }
  };
  return <div>{renderButtons()}</div>;
};
export default Button;
//<button onClick={onClick} className={`${buttonStyle} ${className}`}>{value}</button>
