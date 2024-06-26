export const BlackButton = ({
  children,
  className,
  isDisabled = false,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      className={` text-white rounded-xl p-2 min-w-max ${className} ${
        isDisabled ? "bg-black opacity-5" : "bg-black"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
