import React from 'react'
import Input from '../../popup/Input'

const Step3 = ({payload, setPayload}) => {
  return (
    <div className='overflow-auto'>
            <h1 className='text-gray-900 text-[18px] mb-4 font-bold'>STEP-3</h1>
            <div className="flex flex-col gap-2">
                <Input
                    type={`select`}
                    value={payload?.need_insurance}
                    className="w-full my-2"
                    label={`Need Insurance`}
                    optionName={"--Select Insurance--"}
                    required={true}
                    ModuleName={[{name : "True" , value : 1}, {name : "False" , value : 0}]}
                    onChange={(e) =>
                        setPayload({ ...payload, need_insurance: parseInt(e.target.value) })
                    }
                />
                <Input
                    type={`select`}
                    value={payload?.need_agreement}
                    className="w-full my-2"
                    optionName={"--Select Agreement--"}
                    required={true}
                    label={`Need Agreement`}
                    ModuleName={[{name : "True" , value : 1}, {name : "False" , value : 0}]}
                    onChange={(e) =>
                        setPayload({ ...payload, agreement_status: parseInt(e.target.value) })
                    }
                />
            </div>

        </div>
  )
}

export default Step3