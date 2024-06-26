const InputRow = ({ type, onChange, className, label, value,labelStyle,required, inputStyle }) => {
    return (
      <div className={`flex pb-2 mx-auto ${inputStyle}`}>
        <label className={`text-slate-700 ${labelStyle}`}>{label&&label}</label>
        <p className='w-1/2'>
        <input
          type={type}
          onChange={onChange}
          value={value}
          required = {required}
          className={`placeholder:italic placeholder:text-slate-500 block bg-white border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm shadow-primary focus:outline-none focus:border-red-300 focus:ring-red-300 focus:ring-1 sm:text-sm ${className}`}
        />
        </p>
      </div>
    )
  }
  
  export default InputRow