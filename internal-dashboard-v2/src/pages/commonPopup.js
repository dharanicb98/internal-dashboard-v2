import React from 'react'

function CommonPopup({children}) {
  return (
    <>
      <div className="fixed z-[20] w-screen h-screen top-[10%] left-[30%] ">
        <div className="bg-white p-5 w-[800px] h-[700px] overflow-y-auto rounded-md shadow border-2">
          {children}
        </div>
      </div>
    
  </>
  )
}

export default CommonPopup