export default function FilledInput(props: FilledInputProps) {
  const { label = "", className = "", ...restProps } = props;
  return (
      <input
      placeholder={label}
      required
      className={`w-full placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
      placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] text-[14px] 
      px-4 py-2  rounded bg-grey-200 shadow-sm ${className}`}
      {...(restProps || {})}
    />
  
  );
}
interface FilledInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "className"
  > {
  label?: string;
  className?: string;
}
