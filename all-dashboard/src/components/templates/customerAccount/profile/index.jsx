import React, { useEffect, useState } from "react";
import Avatar from "ui/avatar";
import { FilledButton, OutlinedButton } from "ui/buttons";
import Image from "next/image";
import LabeledInput from "../../../../ui/input/labelInput";
import Select from "ui/input/select";
import VerifiedStarIcon from "assets/icons/verified-star.png";
import CloseRoundedIcon from "assets/icons/close-rounded.svg";
import ArrowDownIcon from "assets/icons/arrow-down.png";
import Checkbox from "ui/input/checkbox";
import UploadIcon from "assets/icons/upload.png";
import FilesDragAndDrop from "ui/input/dnd";
import { fileUpload } from "services/uploadFile";
import MobileBackgroundImage from "assets/images/mobilebackground.png";
import MobileProfile from "./mobileProfile";
import FloatingInput from "../../login/floatingInput";
import formatDate from '../../../../utils/date'
import {useRegionsSelector, useCountrySelector} from 'selectors/listing'
import { profileImageUpload , updateProfileData, getUserById } from "../../../../services/account/editProfile";
import AvatarIcon from "assets/images/avatar.svg";
import FloatingSelect from "../../../../ui/input/floatingSelect";
import moment from "moment";
import { countryCodes } from "../../../../constants/phoneExtensionWithoutFlag";
import Loading from "../../../../ui/loading";


const genderOptions = [
  { id:1, name:'Male', value:'male' },
  { id:2, name:'Female', value:'female' }
]

function Profile() {
  const [selectedCountry, setSelectedCountry] = React.useState("india");
  const [showCard, setShowCard] = React.useState("");
  const [imageStatus, setImageStatus] = React.useState({total: 0, uploaded: 0});
  const [userData, setUserData] = useState();
  const [payload, setPayload] = useState({});
  const [showLoader, setShowLoader] = useState(false)
  const [profileLoader,setProfileLoader] = useState(false)



  const regionsData = useRegionsSelector()
  const countriesData = useCountrySelector()



  const countryList = [
    {
      key: "India",
      value: "india",
    },
    {
      key: "USA",
      value: "usa",
    },
    {
      key: "UAE",
      value: "uae",
    },
  ];

  const selectedCountryItem = countryList.find((item) => item.value === selectedCountry);

  const addHandler = async (files) => {
    setImageStatus((prev) => ({ ...prev, total: files.length }));
    const promises = files
      .map(async (item) => {
        if (item) {
          const res = await fileUpload(item);
          if (!res.err) {
            setImageStatus((prev) => ({
              ...prev,
              uploaded: prev.uploaded + 1,
            }));
            return res.url;
          }
        }
        return "";
      })
      .filter(Boolean);
    await Promise.all(promises);
  };

  useEffect(() => {
    (async () => {
      try{
        const userDetails = localStorage?.getItem('token');
        const parseData = JSON.parse(userDetails)
        if ( parseData ) {
          const response = await getUserById( parseData?.user_id )
          const [data] = response.data
          setUserData(data)
        }
      }
      catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const handleOnChangeInput = ( e, key, selectValue='', type ) => {

    if (type === 'select' ) {
      setPayload((prev) => { return {...prev, [key]:selectValue}})
      setUserData((prev) => { return {...prev, [key]:selectValue}})
    }
    else {
      let value = e.target.value 
      setPayload((prev) => { return {...prev, [key]:value}})
      setUserData((prev) => { return {...prev, [key]:value}})
    }
    
  }

  const handleSave = async  () => {
    try {
      setShowLoader(true)
      const userDetails = localStorage?.getItem('token');
      const parseData = JSON.parse(userDetails)
      if ( parseData ) {
        const response = await updateProfileData(parseData?.user_id, payload)
        setShowLoader(false)
      }
    }
    catch ( e ) {
      alert( e )
      setShowLoader(false)
    }
  }

  const handleFileChange = async ( e ) => {
    setShowLoader(true)
    setProfileLoader(true)
    const file = e?.target?.files[0]
  
    try {
      if (file) {
        const formData = new FormData();
        formData.append( 'image', file )
        const response = await profileImageUpload( formData )
        if ( response.status === 200 ){
          const profileImage = response?.data[0]
          setPayload((prev) => { return {...prev, user_avatar:profileImage?.file_path}})
          setUserData((prev) => { return {...prev, user_avatar:profileImage?.file_path}})
          setShowLoader(false)
          setProfileLoader(false)
        }
      }
    }
    catch ( e ) {
      alert( e )
      setShowLoader(false)
      setProfileLoader(false)
    }


  }

  const handleRemove =  ( ) => {
    try {
      setShowLoader(true)
      setPayload((prev) => { return {...prev, user_avatar:''}})
      setUserData((prev) => { return {...prev, user_avatar:''}})
      setShowLoader(false)
    }
    catch (e) {
      console.log(e)
    }
  }

  const formatDate = ( date ) => {
    const formattedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return formattedDate
  }


  return (
    <div className="">
      <div className="flex justify-between gap-[38px] relative md:hidden">
          <div className="flex-1 h-[65vh] overflow-auto min-w-[300px]">
            <div>
              <p className="text-xl font-medium">Personal Information</p>
              <div className="flex gap-9 mt-[42px]">
                <div className={`relative h-32 w-32`}>
                  <Image
                    className="rounded-full"
                    src={
                      userData?.user_avatar
                        ? `${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}/${userData?.user_avatar}`
                        : AvatarIcon
                    }
                    alt="Rounded avatar"
                    fill
                  />
                  {profileLoader && <div className="absolute  h-full w-full flex justify-center items-center">
                  <Loading containerClass=" !w-16 !h-16 fill-black"/>
                  </div>}
                </div>

                <div className="flex flex-col gap-[14px] justify-center relative">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer relative"
                  >
                    <FilledButton
                      text="Change Photo"
                      buttonClass="!rounded-2xl px-8 py-4"
                    />
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  <OutlinedButton
                    onClick={handleRemove}
                    text="Remove Photo"
                    primary={false}
                    buttonClass="!rounded-2xl px-8 py-4"
                  />
                </div>
              </div>
            </div>

            <div className="py-2.5 flex flex-col gap-y-3 mt-20">
              <LabeledInput
                label="First Name"
                inputClass="text-lg"
                labelClass="text-base peer-placeholder-shown:leading-[76px]"
                value={userData?.fname}
                onChange={(e) => handleOnChangeInput(e, "fname")}
              />

              <LabeledInput
                label="Last Name"
                inputClass="text-lg"
                labelClass="text-base peer-placeholder-shown:leading-[76px]"
                value={userData?.lname}
                onChange={(e) => handleOnChangeInput(e, "lname")}
              />

              <div className="relative mb-3">
                <input
                  value={formatDate(userData?.dob)}
                  onChange={(e) => handleOnChangeInput(e, "dob")}
                  type="date"
                  className={`peer h-full w-full rounded-lg border border-grey 
            border-t-transparent bg-transparent p-6 outline outline-0 transition-all 
            placeholder-shown:border placeholder-shown:border-grey focus:border-grey  outline-none
            focus:border-t-transparent !focus:outline-0 !focus:ring-0 !focus:outline-none disabled:border-0 `}
                  placeholder=" "
                  style={{ outline: "none", boxShadow: "none" }}
                />

                <label
                  className={`first-letter:before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full 
            select-none leading-tight text-grey-dark transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5
            before:w-2.5 before:rounded-tl-lg before:border-t before:border-l before:border-grey before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 
            after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-lg after:border-t after:border-r after:border-grey after:transition-all
            peer-placeholder-shown:leading-[5.75]  peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent 
            peer-focus:leading-tight peer-focus:text-grey-dark peer-focus:before:border-grey peer-focus:after:border-grey peer-disabled:text-transparent
            peer-disabled:before:border-transparent peer-disabled:after:border-transparent`}
                >
                  Date of birth
                </label>
              </div>

              <LabeledInput
                label="Bio"
                textarea
                inputClass="text-lg"
                labelClass="text-base peer-placeholder-shown:leading-[76px]"
                value={userData?.bio}
                onChange={(e) => handleOnChangeInput(e, "bio")}
              />

              <FloatingSelect
                value={userData?.gender}
                onChange={(e) => handleOnChangeInput(e, "gender")}
                options={genderOptions}
                key="name"
                selectValue="id"
                initialOption="choose Gender"
                label="Gender"
              />

              <LabeledInput
                label="Email"
                inputClass="text-lg"
                labelClass="text-base peer-placeholder-shown:leading-[76px]"
                value={userData?.email}
                onChange={(e) => handleOnChangeInput(e, "email")}
              />

              <FloatingSelect
                options={countriesData?.country}
                initialOption="Choose Country"
                label="Country"
                value={userData?.country_id}
                selectValue={"id"}
                onChange={(e) => handleOnChangeInput(e, "country_id")}
              />

              <FloatingSelect
                options={regionsData}
                initialOption="Choose Region"
                label="Region"
                value={userData?.state_id}
                selectValue={"id"}
                onChange={(e) => handleOnChangeInput(e, "state_id")}
              />

              <LabeledInput
                label="Address"
                inputClass="text-lg"
                labelClass="text-base peer-placeholder-shown:leading-[76px]"
                value={userData?.address1}
                onChange={(e) => handleOnChangeInput(e, "address1")}
              />

              <fieldset className="border border-grey  flex  items-center rounded-lg mb-3">
                <legend className="ml-3 px-1 leading-tight text-grey-dark">
                  {" "}
                  Phone Number
                </legend>
                <select
                  value={userData?.mobile_ext}
                  onChange={(e) => handleOnChangeInput(e, "mobile_ext")}
                  className=" h-full px-2 place-items-center text-blue-gray-500 outline-none rounded-[7px] border-0"
                >
                  <option value={""}>0</option>
                  {countryCodes?.map((code, idx) => {
                    return (
                      <option key={idx} value={code?.dial_code}>
                        {code?.dial_code}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  value={userData?.mobile}
                  onChange={(e) => handleOnChangeInput(e, "mobile")}
                  className="h-full w-full focus:outline-none rounded-[7px] text-lg border-0 p-6 focus:ring-0"
                />
              </fieldset>

              <LabeledInput
                label="Languages"
                inputClass="text-lg"
                labelClass="text-base peer-placeholder-shown:leading-[76px]"
                value={userData?.languages}
                onChange={(e) => handleOnChangeInput(e, "languages")}
              />
            </div>

            <div className="flex w-full relative  ">
            <FilledButton text="Save" onClick={handleSave} buttonClass="px-6" />
            {showLoader && <Loader className={"!w-10 !h-10 left-[100px]  !-top-9"}/>}
          </div>
          </div>
      

        <div className="md:hidden">
          <div className="flex p-4 gap-2 border border-grey shadow-base rounded-2xl">
            <div>
              <p className="mb-3 font-medium text-xl">Verify Yourself</p>
              <p className="max-w-[259px] mb-4">
                Official ID verification builds trust between guests and hosts.
              </p>
              <a className="underline font-medium">Upload your document</a>
            </div>
            <Image
              src={VerifiedStarIcon}
              alt="star"
              className="h-[85px] w-[85px]"
            />
          </div>
          <div className="flex p-4 gap-2 border border-grey shadow-base rounded-2xl mt-4">
            <div>
              <p className="mb-3 font-medium text-xl">Profile progress</p>
              <div className="max-w-[259px] mb-4 flex flex-col ">
                <p className="inline mr-1">
                  Lets fix 20 more work and complete your Profile.
                </p>
                <a
                  className="underline inline before:content-['('] after:content-[')'] before:inline-block after:inline-block font-medium"
                  onClick={() => setShowCard("")}
                >
                  Tap here
                </a>
              </div>
            </div>
            <div className="flex items-end mb-5">
              <div
                className="dui-radial-progress"
                style={{
                  "--value": 70,
                  "--size": "4.5rem",
                  "--thickness": "5px",
                }}
              >
                70%
              </div>
            </div>
          </div>
          <div
            className={`p-4 gap-2 border border-grey shadow-base rounded-2xl mt-4 ${
              showCard === "verify" ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-between">
              <p className="mb-3 font-medium text-xl">
                Choose Your Verification ID
              </p>
              <Image
                src={CloseRoundedIcon}
                alt="star"
                className="h-[26px] w-[26px] cursor-pointer"
                onClick={() => setShowCard("")}
              />
            </div>

            <Select
              listPaperClass="w-full shadow-base"
              buttonContent={
                <div className="flex justify-between items-center border border-grey p-2 rounded-lg">
                  <p>{selectedCountryItem.key}</p>
                  <Image src={ArrowDownIcon} alt="down" />
                </div>
              }
              options={countryList.map((item) => ({
                ...item,
                key: (
                  <div className="flex justify-between items-center">
                    <p>{item.key}</p>
                    <Image src={ArrowDownIcon} alt="down" />
                  </div>
                ),
              }))}
              onChange={(val) => setSelectedCountry(val)}
            />
            <div className="flex flex-col gap-4 mt-9">
              <div className="flex justify-between">
                <p>Driving License</p>
                <Checkbox />
              </div>
              <div className="flex justify-between">
                <p>Passport</p>
                <Checkbox />
              </div>
              <div className="flex justify-between">
                <p>Government ID</p>
                <Checkbox />
              </div>
            </div>
            <FilledButton
              text="Confirm"
              buttonClass="px-6 mt-4 ml-auto block"
              onClick={() => setShowCard("upload")}
            />
          </div>
          <div
            className={`p-4 gap-2 border border-grey shadow-base rounded-2xl mt-4 ${
              showCard === "upload" ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-between">
              <p className="mb-3 font-medium text-xl">Upload Driving License</p>
              <Image
                src={CloseRoundedIcon}
                alt="star"
                className="h-[26px] w-[26px] cursor-pointer"
                onClick={() => setShowCard("")}
              />
            </div>
            <FilesDragAndDrop
              onUpload={(files) => addHandler(files)}
              formats={["jpg", "png", "svg", "webp"]}
              openDialogOnClick
              containerStyles={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="flex-center flex-col relative w-full py-[55px] rounded-2xl border border-grey">
                <Image src={UploadIcon} alt="upload" />
                <p className="text-grey-dark text-center text-[18px] mt-6">
                  Click to upload <br /> Images/Drag and drop
                </p>
              </div>
            </FilesDragAndDrop>
            {!!imageStatus.total && (
              <div className="flex items-center gap-3 mt-6">
                <div class="w-full bg-grey h-1.5  rounded overflow-hidden flex-1">
                  <div
                    class="bg-black h-1.5"
                    style={{
                      width: `${
                        (imageStatus.uploaded / imageStatus.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                <p className="text-grey-dark">
                  {Math.ceil((imageStatus.uploaded / imageStatus.total) * 100)}%
                  uploaded
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:block py-12">
        <MobileProfile
          userData={userData}
          handleOnChangeInput={handleOnChangeInput}
          showLoader={showLoader}
          handleFileChange={handleFileChange}
          handleSave={handleSave}
        />
      </div>

      {showLoader && <Loader className={"md-m:hidden"}/>}
    </div>
  );
}



const Loader = ({className}) => {
  return (
    <div className={`flex justify-center w-full h-full absolute  top-[60%] ${className}`} role="status">
    <svg aria-hidden="true" class="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    <span class="sr-only">Loading...</span>
  </div>
  )
}

export default Profile;
