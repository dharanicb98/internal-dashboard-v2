import Image from "next/image";
import ChevronLeft from "assets/icons/chevron-left.svg";
import Divider from "ui/divider";
import Avatar from "ui/avatar";
import TextField from "ui/input/textfield";
import Select from "ui/input/select";
import React, { useState } from "react";
import moment from "moment";
import {useRegionsSelector, useCountrySelector} from 'selectors/listing'
import { countryCodes } from "../../../../constants/phoneExtensionWithoutFlag";
import AvatarIcon from "assets/images/avatar.svg";


function EditProfileTab(props) {
  const { showEditProfile, userData, showLoader, handleFileChange, handleSave, handleOnChangeInput} = props;
 
  const [values, setValues] = React.useState({ gender: "male",});
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenCountry, setIsOpenCountry] = useState(false)
  const [isOpenRegion, setIsOpenRegion] = useState(false)
  const [isOpenCountryCode, setIsOpenCountryCode] = useState(false)

  const regionsData = useRegionsSelector()
  const countriesData = useCountrySelector()

  const genderOptions = [
    { name:'Male', value:1 },
    { name:'Female', value:2 }
  ]

  const handleSelect = ( key, value ) => {
    handleOnChangeInput(undefined, key, value, 'select')
    
    switch (key) {
      case 'gender':
        setIsOpen(false)
        return

      case 'country_id':
        setIsOpenCountry(false)
        return

      case 'state_id':
        setIsOpenRegion(false)
        return

      case 'mobile_ext':
        setIsOpenCountryCode(false)
        return

      default:
        break
    }
  }


  const handleChangeValues = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const formatJoinedDate = ( date ) => {
    const formatDate = moment(date).format('MMM D, YYYY')
    return formatDate
  }

  const formatDobDate = ( date ) => {
    const formattedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return formattedDate
  }



  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4 shrink-0 ">
          <Image
            src={ChevronLeft}
            alt="back"
            onClick={() => showEditProfile(false)}
          />
          <p className="font-medium text-xl">Edit profile</p>
        </div>
        <p className="text-sm text-[rgba(0,_0,_0,_0.50)]">{userData?.created_at && `Joined ${formatJoinedDate(userData?.created_at)}`}</p>
      </div>
      <Divider className="-mx-6" />

      <div className="flex flex-col items-center mt-8">
        <div className={`relative h-[100px] w-[100px]`}>
            <Image
              className="rounded-full"
                src={userData?.user_avatar ? `${process.env.NEXT_PUBLIC_RENTMYHOTEL_CDN}/${userData?.user_avatar}`: AvatarIcon}
                alt="Rounded avatar"
                fill
                />
            <div className="absolute right-0 bottom-0">
            <label htmlFor="fileInput" className="cursor-pointer relative">
              <Image src="/assets/icons/cameraIcon.png" alt='camera-icon' width='30' height='30'/>
              <input type="file" id="fileInput" onChange={handleFileChange}  className="absolute inset-0 opacity-0 cursor-pointer"/>
            </label>
              
            </div>
        </div>
        <p className="text-xl font-medium leading-8 mt-4">{userData?.fname} {userData?.lname}</p>
        <p className="text-primary font-light leading-8">{userData?.email}</p>
      </div>


      <div className="mt-8 flex flex-col gap-8">
        <TextField onChange={(e) => handleOnChangeInput(e, 'fname')} labelName="First Name" inputClass="text-lg w-full" value={userData?.fname} />

        <TextField onChange={(e) => handleOnChangeInput(e, 'lname')} labelName="Last Name" inputClass="text-lg w-full" value={userData?.lname} />

        <TextField onChange={(e) => handleOnChangeInput(e, 'bio')} labelName="Bio" inputClass="text-lg w-full" value={userData?.bio} />

        <div className="grid grid-cols-2 gap-[38px]">
          <div className="flex flex-col w-full">
            <label className="block mb-auto  font-light text-grey-dark">Gender</label>
            <div className={`relative`}>
               <div className="cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
              <div className="flex justify-between items-center pb-2 border-b border-b-black w-full">
                   {genderOptions.find((item) => item.value === userData?.gender)?.name || 'choose Gender'}
                 <div><Image src="/assets/icons/chevronTopAndBottom.png" alt="chevronTopAndBottom" width="10" height="10"/></div>
              </div>
            </div>
              <ul id="options" className={`bg-white options absolute select__index mt-2 top-full ${isOpen ? "block" : "hidden"}  rounded`}>
                {genderOptions?.map((option, index) => (
                  <li key={index}
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-100 text-center`}
                    onClick={(e) => {e.stopPropagation(); handleSelect( 'gender', option.value);}}>
                    {option.name}
                  </li>
                ))}
              </ul>
          </div>

            {/* <Select
              listPaperClass="shadow"
              buttonContent={
                <div className="flex justify-between items-center pb-2 border-b border-b-black w-full">
                   {genderOptions.find((item) => item.value === userData?.gender)?.name}

                  <Image src="/assets/icons/chevronTopAndBottom.png" alt="chevronTopAndBottom" width="10" height="10"/>
                </div>
              }
              options={genderOptions}
              onChange={(val) => handleChangeValues("gender", val)}
            /> */}
          </div>
          {/* <TextField labelName="DOB" inputClass="text-lg w-full" input="date" value={formatDobDate(userData?.dob)}/> */}
          <div className={`w-full`}>
                <label className="block mb-2 font-light text-grey-dark">DOB</label>
                <input type='date' value={formatDobDate(userData?.dob)}
                  onChange={(e) => handleOnChangeInput(e, 'dob')}
                  className={`border-grey-dark border-t-0 border-l-0 border-r-0 focus:outline-0 focus:ring-0 focus:border-black`}
                />
              </div>
        </div>

        <div>
          <label className="font-light text-grey-dark">Telephone</label>
          <div className="grid grid-cols-2 gap-[38px] " >

            <div className={`relative mt-3`}>
              <div className="cursor-pointer" onClick={() => setIsOpenCountryCode((prev) => !prev)}>
                <div className="flex justify-between items-center pb-2 border-b border-b-black w-full">
                      {countryCodes?.find((item) => item.dial_code === userData?.mobile_ext)?.dial_code || 'choose  code'}
                    <div><Image src="/assets/icons/chevronTopAndBottom.png" alt="chevronTopAndBottom" width="10" height="10"/></div>
                  </div>
                </div>

                <ul id="options" className={`bg-white options absolute select__index mt-2 top-full ${isOpenCountryCode ? "block" : "hidden"}  rounded overflow-y-auto h-32`}>
                  {countryCodes?.map((option, index) => (
                    <li key={index}
                      className={`py-2 px-4 cursor-pointer hover:bg-gray-100 text-center`}
                      onClick={(e) => {e.stopPropagation(); handleSelect( 'mobile_ext', option.dial_code);}}>
                      {option.dial_code}
                    </li>
                  ))}
                </ul>
            </div>
            
            <div className="mt-3">
              <input className="border-b border-black pb-2" onChange={(e) => handleOnChangeInput(e, 'mobile')} value={userData?.mobile}/>
            </div>

          </div>
        </div>


        
        <TextField onChange={(e) => handleOnChangeInput(e, 'address1')} labelName="Address" inputClass="text-lg w-full" value={userData?.address1} />

        <TextField onChange={(e) => handleOnChangeInput(e, 'email')} labelName="E-mail" inputClass="text-lg w-full" value={userData?.email}/>

        <div className="grid grid-cols-2 gap-[38px]">
          <div>
          <label className=" mb-auto  font-light text-grey-dark">Country</label>
            <div className={`relative`}>
               <div className="cursor-pointer" onClick={() => setIsOpenCountry((prev) => !prev)}>
              <div className="flex justify-between items-center pb-2 border-b border-b-black w-full">
                   {countriesData?.country?.find((item) => item.id === userData?.country_id)?.name || 'choose Country'}
                 <div><Image src="/assets/icons/chevronTopAndBottom.png" alt="chevronTopAndBottom" width="10" height="10"/></div>
              </div>
            </div>
              <ul id="options" className={`bg-white options absolute select__index mt-2 top-full ${isOpenCountry ? "block" : "hidden"}  rounded overflow-y-auto h-32`}>
                {countriesData?.country?.map((option, index) => (
                  <li key={index}
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-100 text-center`}
                    onClick={(e) => {e.stopPropagation(); handleSelect( 'country_id', option.id);}}>
                    {option.name}
                  </li>
                ))}
              </ul>
          </div>
          </div>

          <div>
          <label className=" mb-auto  font-light text-grey-dark">Region</label>
            <div className={`relative`}>
               <div className="cursor-pointer" onClick={() => setIsOpenRegion((prev) => !prev)}>
              <div className="flex justify-between items-center pb-2 border-b border-b-black w-full">
                   {regionsData?.find((item) => item.id === userData?.state_id)?.name || 'choose Region'}
                 <div><Image src="/assets/icons/chevronTopAndBottom.png" alt="chevronTopAndBottom" width="10" height="10"/></div>
              </div>
            </div>
              <ul id="options" className={`bg-white options absolute select__index mt-2 top-full ${isOpenRegion ? "block" : "hidden"}  rounded overflow-y-auto h-32`}>
                {regionsData?.map((option, index) => (
                  <li key={index}
                    className={`py-2 px-4 cursor-pointer hover:bg-gray-100 text-center`}
                    onClick={(e) => {e.stopPropagation(); handleSelect( 'state_id', option.id);}}>
                    {option.name}
                  </li>
                ))}
              </ul>
          </div>
          </div>
        </div>

      </div>

     <div className="flex items-center justify-center">
       <button onClick={handleSave} className="bg-[#000000] mt-7 py-2 px-[142px] rounded-3xl text-[#FFFFFF] text-xl leading-6 font-medium">Save</button>
     </div>

     {showLoader &&  (<Loader/>)}
    </div>
  );
}


const Loader = ({ className }) => {
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

export default EditProfileTab;
