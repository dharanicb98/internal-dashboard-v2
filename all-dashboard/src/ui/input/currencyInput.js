import React from 'react'

function CurrenyInput() {
    const { label = "", className = "", ...restProps } = props;
    return (
      <div  className="px-4 flex items-center shadow-sm bg-grey-200 ">
        <p>$</p>
        <input
        placeholder={label}
        required
        className={`w-full placeholder-grey-dark focus:ring-0 or focus:ring-transparent !border-none 
        placeholder:font-[300] placeholder:text-[rgba(60, 60, 60, 0.68)] text-[14px] 
        px-4 py-2  rounded bg-grey-200  ${className}`}
        {...(restProps || {})}
      />
      </div>
    );
}

export default CurrenyInput