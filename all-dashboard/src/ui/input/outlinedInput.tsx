export default function OutlinedInput(props: OutlineInputProps) {
  const { label, className = "", onChange, value, ...rest } = props;
  return (
    <input
      className={`w-full placeholder-grey-dark 
      !outline-none placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)]
       text-[14px] px-4 py-2 border-grey-dark border rounded-full ${className}`}
      placeholder={label}
      onChange={onChange}
      value={value}
      {...(rest || {})}
    />
  );
}
type OutlineInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "className"
> & {
  label: string;
  className?: string;
  value?: string;
};
