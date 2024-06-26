import React, { useEffect, useRef, useState } from 'react'
import Button from '../../button';

let currentIndex = 0

const ReadOTPInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeIndex, setActiveIndex] = useState(0)

    const inputRef = useRef();

    const handleChange = (event) => {
        const value = event.target.value
        const newOtp = [...otp]
        newOtp[currentIndex] = value[value.length-1]
        // newOtp[currentIndex] = value.substring(value.length - 1)

        if (!value) setActiveIndex(currentIndex - 1)
        else setActiveIndex(currentIndex + 1)
        setOtp(newOtp);
    }

    const handleKeyChange = (event, index) => {
        currentIndex = index
        // console.log(event.key);
        if (event.key === "Backspace") setActiveIndex(currentIndex - 1)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [activeIndex])

    console.log(otp);
    return (
        //justify-center items-center
        <div className="h-screen ">
            <div className="flex space-x-2">
                {otp.map((_, index) => {
                    return (
                        <div key={index}>
                            <input
                                type="number"
                                name="otp"
                                maxLength="1"
                                className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400
               focus:border-gray-700 focus:text-gray-700 text-gray-400 transition otp-input"
                                onChange={handleChange}
                                onKeyDown={(e) => handleKeyChange(e, index)}
                                ref={index === activeIndex ? inputRef : null}
                                value={otp[index]}
                            />
                            {index === otp.length - 1 ? null : (
                                <span className="w-2 py-0.5 text-gray-400 text-[30px] font-[900px]" > - </span>
                            )}
                        </div>
                    );
                })}

            </div>
            <p className='my-5'>OTP Entered - {otp.join("")}</p>
            <div className='flex'>
                <Button
                    className="mr-2"
                    onClick={e => setOtp([...otp.map(v => "")])}
                    value={"Clear"}
                    type={'secondary'}
                />


                <Button
                    className=""
                    onClick={e =>
                        alert("Entered OTP is " + otp.join(""))
                    }
                    type={'black'}
                    value={"Verify OTP"}
                />
            </div>
        </div>
    );

}


export default ReadOTPInput