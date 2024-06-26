function LabeledInput(props) {
  const {
    label = "",
    inputClass = "",
    type = "text",
    labelClass = "",
    containerProps = "",
    value,
    inputProps = {},
    labelProps = {},
    textarea = false,
    onChange,
  } = props;

  return (
    <div className="relative mb-3" {...containerProps}>
      {textarea ? (
        <textarea
          className={`peer h-full w-full rounded-lg border border-grey border-t-transparent
        bg-transparent p-6 outline outline-0 
        transition-all placeholder-shown:border placeholder-shown:border-grey focus:border-grey 
        focus:border-t-transparent focus:outline-0 disabled:border-0 ${inputClass}`}
          placeholder=" "
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      ) : (
        <input
          type={type}
          className={`peer h-full w-full rounded-lg border border-grey border-t-transparent 
        bg-transparent p-6 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-grey 
        focus:border-grey focus:border-t-transparent !focus:outline-0 disabled:border-0 !outline-none  
         focus:outline-none focus:ring-0 ${inputClass}`}
          placeholder=" "
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      )}

      <label
        className={`first-letter:before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none leading-tight text-grey-dark transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-lg before:border-t before:border-l before:border-grey before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-lg after:border-t after:border-r after:border-grey after:transition-all peer-placeholder-shown:leading-[5.75]  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:leading-tight peer-focus:text-grey-dark peer-focus:before:border-grey peer-focus:after:border-grey peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent  ${labelClass}`}
        {...labelProps}
      >
        {label}
      </label>
    </div>
  );
}

export default LabeledInput;
