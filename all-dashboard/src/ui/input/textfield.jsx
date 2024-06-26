import { generateRandomString } from "utils/common";

function TextField(props) {
  const { labelName, inputClass = "", onChange , containerClass = "", ...rest } = props;
  const htmlFor = generateRandomString(6);

  return (
    <div className={`w-full ${containerClass}`}>
      {!!labelName && (
        <label
          htmlFor={htmlFor}
          className="block mb-2 font-light text-grey-dark"
        >
          {labelName}
        </label>
      )}
      <input
        id={htmlFor}
        onChange={onChange}
        className={`border-grey-dark !border-b !outline-none py-2 border-t-0 border-l-0 border-r-0 focus:outline-none focus:ring-0  ${inputClass}`}
        {...rest}
      />
    </div>
  );
}

export default TextField;
