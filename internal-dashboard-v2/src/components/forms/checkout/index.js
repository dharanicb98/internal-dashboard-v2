import React, { useState } from 'react'
import Step1 from './step1'
import Button from '../../button'
import Step2 from './step2'
import Step3 from './step3'
import { formatCheckoutDates } from '../../../utils/common'
import { error, loaderStart, loaderSuccess } from '../../../store/reducers/loaderSlice'
import { postCheckout, updateCheckoutSteps } from '../../../services/checkoutServices'
import { useDispatch } from 'react-redux'

const CheckoutCreateForm = ({ isCreate, isClose, setPageLoad}) => {
  const [stepper, setStepper] = useState(1)
  const [button, setButton] = useState(1);
  const [checkoutID, setCheckoutID] = useState();
  const [payload1, setPayload1] = useState({
    listing_id: "",
    // user_currency: "",
    checkin: null,
    checkout: null,
    guests: [
      { "total": 0, "name": "Adults", "slug": "adults", "description": "adults" },
      { "total": 0, "name": "Children", "slug": "children", "description": "children" },
      { "total": 0, "name": "Infants", "slug": "infants", "description": "infants" }
    ],
    // addons: [],
    options: { currency: "USD" },
  })
  const [payload2, setPayload2] = useState({
    fname: "",
    lname: "",
    email: "",
    step: 1,
    phone_ext: "",
    mobile: "",
  })
  const [payload3, setPayload3] = useState({
    need_insurance: 0,
    agreement_status: 0,
    step: 2,
  })

  const dispatch = useDispatch();


  const steps = [
    { step: 1, component: <Step1 payload={payload1} setPayload={setPayload1} /> },
    { step: 2, component: <Step2 payload={payload2} setPayload={setPayload2} /> },
    { step: 3, component: <Step3 payload={payload3} setPayload={setPayload3} /> },
  ]

  const handlePayloadRequestOne = async (payload) => {
    console.log("next steps completed payload1", payload);
    try {
      dispatch(loaderStart());
      const response = await postCheckout(payload)
      if (response.status === 200) {
        dispatch(loaderSuccess());
        setCheckoutID(response.data.checkout_eid)
        setPageLoad((prev) => !prev);
        // next step
      }
    }
    catch (e) {
      dispatch(error(e.response.data.error.message));
    }

  }

  const handlePayloadRequestTwo = async (payload) => {
    console.log("next steps completed payload2", payload);
    try {
      dispatch(loaderStart());
      const response = await updateCheckoutSteps(payload, checkoutID)
      if (response.status === 200) {
        dispatch(loaderSuccess());
        console.log(response, `this is payload${stepper} response`)
        setPageLoad((prev) => !prev);
        // next step
      }
    }
    catch (e) {
      dispatch(error(e.response.data.error.message));
    }

  }

  console.log(`payload${stepper}`)

  const handleBack = () => {
    stepper > 1 && setStepper((prev) => prev - 1)
  }

  const handlePublish = (e) => {
    e.preventDefault();
    if (button === 1) {
      (stepper > 0 && stepper <= steps?.length) && setStepper(prev => prev + 1)
      if (stepper === 1) {
        console.log("payload" + stepper)
        handlePayloadRequestOne({ ...payload1, checkin: formatCheckoutDates(payload1?.checkin), checkout: formatCheckoutDates(payload1?.checkout) })
      }
      if (stepper === 2) {
        handlePayloadRequestTwo(payload2)
      }
      else {
        console.log(`payload${stepper} step complated`)
      }
    }
    if (button === 2) {
      console.log("all steps completed payload3", payload3)
      handlePayloadRequestTwo(payload3)
      isClose()
    }

  }


  return (
    <>
      <form className='flex flex-col justify-between relative h-full' onSubmit={handlePublish}>
        {
          isCreate &&
          <>
            {steps?.map((each, idx) => (
              each.step === stepper && <div key={idx}>{each.component}</div>
            ))}
          </>
        }
        {/* <div className='self-end'> */}
        <div className='py-5 flex items-center justify-between bottom-0 my-10'>
          <Button type="secondary" buttonType={"button"} value={"Back"} onClick={handleBack} />
          {stepper === steps?.length ?
            <Button buttonType={"submit"} type="secondary" name={"btn1"} value={"Publish"} onClick={() => setButton(2)} /> :
            <Button buttonType={"submit"} type="secondary" name={"btn2"} value={"Next"} onClick={() => setButton(1)} />
          }
          {/* </div> */}
        </div>
      </form>
    </>
  )
}

export default CheckoutCreateForm