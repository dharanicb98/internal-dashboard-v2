import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../store/slices/hostSlice";
import { BlackButton } from "./components/buttons/blackButton";
import Link from "next/link";
import RenderDocument from "./components/renderDocument";
import { submitDocUSign } from "../../services/onBoardingHostServices";
import Modal from "../../ui/dialog";
import { useSelector } from "react-redux";

export default function Step3() {
  const dispatch = useDispatch();
  const [docUri, setDocUri] = useState(null);
  const [envelopeId, setEnvelopeId] = useState(null);
  const [message, setMessage] = useState("loading...");
  const iframeRef = useRef(null);
  const [checkbox, setCheckBox] = useState(null);
  const [modalErrorContent, setModalErrorContent] = useState("");
  // const hostPassword = useSelector((state) => state.hostPage.hostPassword);

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("PDF_URL")));
    const partURL = JSON.parse(localStorage.getItem("PDF_URL")).results;
    const pdfurl = process.env.NEXT_PUBLIC_SNIZLE_HKJSON_API + partURL;
    console.log("localstorage :", JSON.parse(localStorage.getItem("PDF_URL")));

    console.log("PARTURL", partURL);
    console.log("pdfurl", pdfurl);
    setDocUri(pdfurl);
  }, []);

  const handleIframe = () => {
    const payload = {
      envelopeId: envelopeId,
    };
    console.log("payload", payload);

    axios
      .post("http://localhost:3000/confirm", payload)
      .then((res) => {
        console.log("res from confirming doc", res);
        const data = res.data;
        if (data.status === "completed") {
          setDocUri(null);
          setMessage("successfully signed contarct");
        } else if (data.status === "decline") {
          setDocUri(null);
          setMessage("contact declined");
        } else {
          setMessage("pending");
        }
      })
      .catch((err) => {
        console.log("error at confirming doc", err);
      });
  };

  const submitAgreement = async ( body ) => {
    try {
      const response = await submitDocUSign( body );
      if ( response.status === 200 ) {
        const userData = response?.data?.data?.user_data
        const token = response?.data?.data.jwt_token
        localStorage.removeItem('token')
        // let localStorageObj = { user_id: userData?.user_id, fname:userData?.fname, lname:userData?.lname, token:token}
        // localStorage.setItem('token', JSON.stringify(localStorageObj))
        localStorage.setItem('token', JSON.stringify({ ...userData, token:token, userId: userData.user_id, isHost: [5, 6].includes(userData.user_role) }))
        document.cookie = "accessToken="+token+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      }
      return response;
    } 
    catch ( e ) {
      setModalErrorContent(e?.response?.data?.error?.message || e.message);
      return false;
    }
  };

  const handleClick = async () => {
    // id email agreement_status
    const details = JSON.parse(localStorage.getItem("hostDetails"));
    const id = details.id;
    const email = details.email;
    let agreement_status;

    if (checkbox) {
      agreement_status = "completed";
    }

    const payload = { id, email, agreement_status };
    const agreed = await submitAgreement(payload);
    if (agreed) {
      dispatch(nextStep());
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <Modal
          open={Boolean(modalErrorContent)}
          onClose={() => setModalErrorContent("")}
          contentClass={"h-auto w-[95%] h-[400px] md-m:w-[422px] bg-[#fff] p-6 rounded-xl "}
        >
          <h3 className="text-center font-[600] text-[18px] mb-3">Try Again</h3>
          <p className="text-center mb-7">{modalErrorContent}</p>

          <span onClick={() => setModalErrorContent("")} className="border-t-[1px] border-grey-100 pt-3 cursor-pointer block text-center text-[#CD264F]">Okay</span>
        </Modal>
      <RenderDocument DocURL={docUri} />

      <div className="flex justify-center w-full bottom-0 left-0 ">
        <div className="w-[90%] mx-auto md:w-[45%] flex flex-col gap-4   bg-white py-4 ">
          <div className="flex gap-3 items-center">
            <input
              className="w-5 accent-brand"
              type="checkbox"
              onChange={(e) => setCheckBox(e.target.checked)}
            />
            <div className="text-lg">
              I agree to Holidaykeeper's{" "}
              <span className="text-brand font-medium"> Host Agreement </span>{" "}
              and{" "}
              <Link
                href="https://holidaykeepers.com/privacy"
                className="text-brand font-medium"
              >
                {" "}
                Privacy Policy{" "}
              </Link>
            </div>
          </div>
          <BlackButton
            isDisabled={!checkbox}
            onClick={handleClick}
            className={"col-span-4  w-full mx-auto md:w-full"}
          >
            Next
          </BlackButton>
        </div>
      </div>
    </div>
  );
}
