import { useCreateListingDataSelector } from "selectors/createListing";

export default function FillInput(props: FilledInputProps) {
  const listingData = useCreateListingDataSelector();
  const { label = "", className = "", ...restProps } = props;
  return (
    <div className="flex items-center bg-grey-300 pl-4 rounded-lg h-[52px]  shadow-sm">
      <p>{listingData?.currency_symbol}</p>
      <input
        placeholder={label}
        required
        className={`w-full placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
        placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] text-[14px] 
        pl-1 py-2  rounded bg-transparent ${className}`}
        {...(restProps || {})}
      />
    </div>
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
