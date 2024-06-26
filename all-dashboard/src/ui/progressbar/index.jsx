const ProgressBar = ({ progressPercent = 0 }) => {
  const bgColor = `${progressPercent}%`;

  return (
    <div
      style={{ backgroundSize: `${bgColor} 100%` }}
      className={`h-[4px] rounded-lg overflow-hidden bg-[#D9D9D9] bg-gradient-to-r from-[#000000] to-[#000000] bg-no-repeat ease-in-out duration-300 transition-[backgorund-size]`}
      role="progessbar"
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
  );
};

export default ProgressBar;
