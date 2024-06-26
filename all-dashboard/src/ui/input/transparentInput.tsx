export default function TransparentInput(props: TransparentInputProps) {
  const { className = "", onChange, value = "", ...restProps } = props;
  return (
    <input
      className={`w-full !outline-none px-4 py-2 rounded !border-none !shadow-none bg-transparent border-transparent focus:border-transparent focus:ring-0 ${className}`}
      required
      onChange={(e) => onChange(e.target.value)}
      value={value}
      {...(restProps || {})}
    />
  );
}
type TransparentInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "className" | "value" | "onChange"
> & {
  label?: string;
  className?: string;
  onChange: (value: string) => void;
  value: string;
};
