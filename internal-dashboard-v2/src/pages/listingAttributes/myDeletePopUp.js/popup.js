import React from 'react'
import Button from '../../../components/button'

function Popup({setIsOpen}) {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-200 flex justify-center items-center' onClick={()=>setIsOpen(false)}>
            <div className="bg-slate-100 p-4 rounded-xl" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl mt-3  font-semibold leading-6 text-rose-500 text-center">
                Delete
                </h3>
                <div className="mt-4 flex justify-between">
                <Button
                    onClick={() =>setIsOpen(false)}
                    className="m-5 sm:w-[100px]"
                    value="Cancel"
                    type="black"
                />
                <Button
                    // onClick={deleteFunction}
                    className="m-5 sm:w-[100px]"
                    value="Delete"
                    type="cancel"
                />
                </div>
            </div>
        </div>
    )
}

export default Popup
