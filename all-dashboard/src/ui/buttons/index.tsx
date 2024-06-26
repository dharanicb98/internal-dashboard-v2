export const OutlinedButton = (props: OutlinedButtonProps) => {
  const {text, buttonClass = "", mode = "light", primary = true, ...restProps} = props;

  const modeClass = mode === "dark"  ? "text-white hover:text-white"  : "text-black hover:text-white";

  const primaryClass = primary ? "border-primary hover:bg-primary" : "border-black hover:bg-black hover:text-white";

  return (
    <button
      className={`bg-inherit rounded-full border p-2 ${primaryClass}  ${modeClass} ${buttonClass}`}
      {...restProps}
    >
      {text}
    </button>
  );
};

export const FilledButton = (props: ButtonProps) => {
  const { text, buttonClass = "", ...restProps } = props;
  return (
    <button className={`rounded-full bg-black text-white p-2 ${buttonClass}`} {...restProps}>{text}</button>
  );
};

interface OutlinedButtonProps extends ButtonProps {
  mode?: "light" | "dark";
  primary?: boolean;
}
