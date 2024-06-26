interface DropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function NativeDropdown({
  options,
  selectedValue,
  onSelect,
}: DropdownProps) {
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onSelect(selectedOption);
  };

  return (
    <div className="flex space-x-4 font-medium">
      <div className="relative">
        <select
          className="p-2 mr-[16px] rounded appearance-none bg-white outline-none border-none px-[8px] py-[4px] cursor-pointer"
          value={selectedValue} // Use the provided selectedValue prop
          onChange={handleMonthChange}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="appearance-none bg-white outline-none border-none"
            >
              {option}
            </option>
          ))}
        </select>
        <div className="absolute top-[2px] right-[2px] cursor-pointer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7272 10.364L10.3633 16.7279L3.99932 10.364"
              stroke="black"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
