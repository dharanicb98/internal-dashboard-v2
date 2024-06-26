import React from 'react'

const data = [{id:1, name:'option1'}, {id:2, name:'option1'}]

function FloatingSelect({selectClass, options=data, labelClass,label='label', key='name', selectValue='id', value, onChange,  initialOption='choose option'}) {
  return (
    <div class="relative z-0 w-full mb-5">
        <select value={value} onChange={onChange}  name="select" className={`p-6 rounded-lg block w-full  bg-transparent border  appearance-none focus:outline-none focus:ring-0  border-gray-200 ${selectClass}`}>
          <option value={''}>{initialOption}</option>
          {options?.length > 0 && (
            options.map((option, idx) => {
              return <option key={idx} value={option[selectValue]}>{option[key]}</option>
            })
          )}
        </select>
        <label htmlFor="select" className={`absolute duration-300 top-2.5 -z-1 origin-0  !bg-white text-[20px] !text-grey-dark ${labelClass}`}>{label}</label>
    </div>
  )
}

export default FloatingSelect