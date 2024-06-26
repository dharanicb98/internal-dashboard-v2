import React from 'react'

function Modal({closeModal, openModal, children}) {

  return (
    <>
    {openModal && (
        <div onClick={closeModal} className='w-screen h-screen  absolute top-0 left-[10%] bg-transparent flex items-center justify-center'>
            <div className='bg-white shadow-sm' onClick={(e) => e.stopPropagation()}>{children}</div>
         </div>
    )}
    </>
  )
}

export default Modal