import { INPUT_STYLE, currencyData } from "../../constants";

const Input = ({
  label,
  value,
  onChange,
  className,
  labelStyle,
  type,
  checked,
  ModuleName,
  placeholder,
  ReadInput,
  style,
  keyName,
  keyValue,
  containerStyle,
  optionName,
  customStyle,
  required,
  rows,
  defaultValue

}) => {
  const renderInputs = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className={`${INPUT_STYLE} ${ReadInput}`}
            name={label}
            value={value}
            onChange={onChange}
            rows={rows ? rows : 4}
            placeholder={placeholder}
            style={style}
            required={required}
          />
        );

      case "select":
        return (
          <select
            className={`h-[37px] text-md ${INPUT_STYLE} ${ReadInput}`}
            style={style}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          >
            <option value={""} hidden>
              {optionName ? optionName : `Select ${label.split(" ")[0]}`}
            </option>
            {ModuleName?.map((each, index) => (
              <option key={index} value={keyValue ? each[keyValue] : each.value}>
                {keyName ? each[keyName] : each.name}
              </option>
            ))}
          </select>
        );
      case "currency":
        return (
          <select
            className={`${INPUT_STYLE} flex justify-between ${ReadInput}`}
            style={style}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          >
            {Object.keys(currencyData).map((currency, index) => (
              <option
                value={currency}
                key={index}
                className="text-md"
                defaultValue={() => defaultValue(currency)}
              >
                {currency} {currencyData[currency].symbol}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            id={label}
            style={style}
            className={` ${customStyle ? customStyle : INPUT_STYLE} ${ReadInput}`}
            type={type}
            name={label}
            value={value}
            onChange={onChange}
            checked={checked}
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col  ${className}`} style={containerStyle}>
      <label htmlFor={label} className={`text-slate-600 text-md ${labelStyle}`}>
        {label && label}
      </label>
      {renderInputs()}
    </div>
  );
};

export default Input;
