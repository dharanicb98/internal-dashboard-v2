import Image from "next/image";
import SearchIcon from "assets/icons/search.svg";

export default function SearchInput(props) {
  const {
    containerClass,
    onChange,
    inputProps = {},
    inputClass = "",
    placeholder = "find your listing",
  } = props;
  return (
    <div
      className={`flex px-4 py-2 border-grey border rounded-full gap  ${containerClass}`}
    >
      <Image src={SearchIcon} width={16} height={16} alt="search" />
      <input
        className={`block w-full ml-3 rounded-lg placeholder-grey-dark !outline-none placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] ${inputClass}`}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
}
