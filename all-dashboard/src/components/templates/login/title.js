import React from 'react'

function Title({title="title",  className=""}) {
  return (
    <div>
        <h1 className={`font-semibold text-2xl leading-7 text-[#0B2238] ${className}`}>{title}</h1>
    </div>
  )
}

export default Title