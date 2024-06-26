import React, { useState } from 'react'
import Input from '../../popup/Input'
import PhoneExtensionSelectBar from '../../dropdown/PhoneInputs/selectPhoneNo';

const Step2 = ({ payload, setPayload }) => {
    const [phoneExt, setPhoneExt] = useState(`${payload?.phone_ext ? payload.phone_ext : "+1"}`);

    return (
        <div className='overflow-auto'>
            <h1 className='text-gray-900 text-[18px] mb-4 font-bold'>STEP-2</h1>
            <div className="flex gap-2">
                <Input
                    type={`text`}
                    value={payload.fname}
                    className="w-[50%]"
                    label={`First Name`}
                    required={true}
                    onChange={(e) =>
                        setPayload({ ...payload, fname: e.target.value })
                    }
                />
                <Input
                    type={`text`}
                    value={payload.lname}
                    className="w-[50%]"
                    label={`Last Name`}
                    required={true}
                    onChange={(e) =>
                        setPayload({ ...payload, lname: e.target.value })
                    }
                />
            </div>
            <div className="flex gap-2 mt-4">
                <Input
                    type={`email`}
                    value={payload.email}
                    required={true}
                    className="w-[180%]"
                    label={`Email`}
                    onChange={(e) =>
                        setPayload({ ...payload, email: e.target.value })
                    }
                />
            </div>
            <div className=' flex gap-2 mt-4'>
                <PhoneExtensionSelectBar
                    type={"number"}
                    label={"Mobile"}
                    inputStyle={"w-[400%] flex-col"}
                    className={"dark:border-gray-900 border-[solid] border-gray-800 py-2 px-4 border-2"}
                    phoneExt={phoneExt}
                    onChange={(e) => setPayload({ ...payload, phone_ext: phoneExt, mobile: e.target.value })}
                    selectPhoneExt={(item) => setPhoneExt(item)}
                    labelStyle={"text-md"}
                    value={payload.mobile}
                />
            </div>
        </div>
    )
}

export default Step2