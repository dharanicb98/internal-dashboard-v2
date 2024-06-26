import React, { useState } from 'react'
import Popup from './popup'

function DeletePopUp() {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <>
        <button onClick={()=>setIsOpen(true)} className='border-2 rounded-sm px-3 py-2'>delete</button>
        {isOpen && <Popup setIsOpen={setIsOpen}/>}
        </>
    )
}

export default DeletePopUp
