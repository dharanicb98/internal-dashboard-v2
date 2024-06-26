import React, { useState, useEffect } from "react";
import Typography from "../../ui/typography/typography";
import Input from "../../ui/input/defaultInput";
import { useDispatch } from "react-redux";
import { nextStep, updateHostPassword } from "../../store/slices/hostSlice";
import {
  createOnBoardingHost,
  getCountryList,
  getCityList,
  getCountryMobileList,
  getStateList,
} from "../../services/onBoardingHostServices";
import Icon from "../../public/assets/icons/icon";
import Image from "next/image";
import Modal from "../../ui/dialog";
import { useRouter } from "next/router";
// city value should be selected by default
// store user details in cookies , fetch if found and populate the form
// selection check for mobilecode , country and city from cookie

export default function Step1() {
  const router = useRouter();
  const myLoader = ({ src, width, quality }) => {
    return `https://cdn.holidaykeepers.com/wp-content/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: "sample1",
      iso2: "default1",
    },
  ]);
  
  const [countriesFlag, setCountriesFlag] = useState("🇺🇸");
  const [states, setStates] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [country, setCountry] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [hostType, setHostType] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [modalErrorContent, setModalErrorContent] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch();
  const getFormData = async () => {
    const body = {
      fname,
      lname,
      email,
      mobile,
      host_type: Number(hostType),
      company_name: companyName,
      company_address: companyAddress,
      country,
      state,
      city,
      phone_ext: phoneCode,
    };
    try {
      const host = await createOnBoardingHost(body);
      const id = host.data.id;
      localStorage.setItem(
        "hostDetails",
        JSON.stringify({ ...body, id, mobileCountryCode })
      );
      setShowLoader(false);
      return true;
    } catch (e) {
      setModalErrorContent(e?.response?.data?.error?.message || e.message);
      setShowLoader(false);
      return false;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      const validData = await getFormData();
      if (validData) {
        const hostDetails = localStorage.getItem("hostDetails");

        document.cookie = `hostDetails=${hostDetails};path=/`;
        setShowLoader(false);
        dispatch(updateHostPassword(password))
        dispatch(nextStep());
      }
    } catch (e) {}
  };

  const getCountriesAndSetValues = async () => {
    try {
      const countries = await getCountryList();
      setCountries(countries.data);

      setCountry(countries.data[0].name);
      setCountryCode(countries.data[0].iso2);

      getStatesAndSetValues(countries.data[0].iso2);
    } catch (e) {
      console.log("sorry there is an error ", e);
    }
  };

  const getStatesAndSetValues = async (countryCode) => {
    try {
      const states = await getStateList(countryCode);
      setStates(states.data);
      setState(states.data[0].name);
      setStateCode(states.data[0].iso2);

      getCityAndSetValues(countryCode, states.data[0].iso2);
    } catch (e) {
      console.log("sorry there is an error ");
    }
  };

  const getCityAndSetValues = async (countryCode, stateCode) => {
    try {
      const cities = await getCityList(countryCode, stateCode);
      if (cities.length) {
        setCities(cities.data);

        setCity(cities.data[0].name);
      }
    } catch (e) {
      console.log("sorry there is an error ");
    }
  };

  const getCountryCodesMobile = async (countryCode) => {
    try {
      const mobileCountries = await getCountryMobileList(
        JSON.parse(countryCode).iso2
      );

      setPhoneCode(`+${mobileCountries.data.phonecode}`);
      setCountriesFlag(mobileCountries.data.emoji);
    } catch (e) {
      console.log("sorry there is an error ");
    }
  };

  const getAndSetFormValues = () => {
    try {
      let hostDetails = JSON.parse(
        document.cookie
          ?.split(";")
          ?.find((c) => c.trim().startsWith("hostDetails"))
          ?.split("=")[1]
      );

      if (hostDetails) {
        // setting form values here
        setFname(hostDetails.fname);
        setLname(hostDetails.lname);
        setEmail(hostDetails.email);
        setMobile(hostDetails.mobile);
        setCompanyName(hostDetails.company_name);
        setCompanyAddress(hostDetails.company_address);
        getCountryCodesMobile(hostDetails.mobileCountryCode);
        setMobileCountryCode(hostDetails.mobileCountryCode);
      }
    } catch (e) {
      console.log("you have undefined cookie");
    }
  };

  useEffect(() => {
    getCountriesAndSetValues();
    getAndSetFormValues();
    if (!hostType) {
      localStorage.removeItem("hostDetails");
      localStorage.removeItem("PDF_URL");
    }
  }, []);

  useEffect(() => {
    if (hostType == null) {
      document.cookie = `hostDetails=;path=/`;
    }
  }, [hostType]);

  const displayForm = () => {
    return (
      <>
        <Modal
          open={Boolean(modalErrorContent)}
          onClose={() => setModalErrorContent("")}
          contentClass={
            "h-auto w-[95%] md-m:w-[422px] bg-[#fff] p-6 rounded-xl "
          }
        >
          <h3 className="text-center font-[600] text-[18px] mb-3">Try Again</h3>
          <p className="text-center mb-7">{modalErrorContent}</p>

          <span
            onClick={() => setModalErrorContent("")}
            className="border-t-[1px] border-grey-100 pt-3 cursor-pointer block text-center text-[#CD264F]"
          >
            Okay
          </span>
        </Modal>

        <form
          onSubmit={(e) => handleClick(e)}
          className={`flex flex-col gap-2  w-full mt-10 mx-auto ${
            showLoader ? "opacity-60" : ""
          }`}
        >
          <PageHeading className={"text-xl px-5 md:px-0 md:text-4xl "}>
            Now let's make you a HolidayKeepers <br className="lg:hidden" />{" "}
            Host
          </PageHeading>

          <PageSubHeading className={"mx-5 md:mx-0 mb-6"}>
            Begin your hosting journey
          </PageSubHeading>
          <div className="grid md:grid-cols-12 gap-4 px-5 md:px-0">
            <div className="col-span-12 flex flex-col gap-2 text-center mt-4 md:mt-0">
              <div className=" flex gap-4 mb-4">
                <div
                  className={`flex justify-center items-center `}
                  onClick={(e) => {
                    setHostType(Number(e.target.value));
                  }}
                >
                  <label
                    htmlFor="individual"
                    className={`flex flex-row md:flex-col items-center gap-2 border p-2 rounded-lg cursor-pointer ${
                      hostType === 1 ? "border-[#CD264F]" : ""
                    }`}
                  >
                    <Icon
                      icon="induvidualSVG"
                      height={18}
                      width={18}
                      strokeWidth={1}
                    />
                    Individual
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    id="individual"
                    name="hostType"
                    value={1}
                  />
                </div>
                <div
                  className={`flex justify-center items-center`}
                  onClick={(e) => {
                    setHostType(Number(e.target.value));
                  }}
                >
                  <label
                    htmlFor="company"
                    className={`flex flex-row md:flex-col items-center gap-2 border p-2 rounded-lg cursor-pointer ${
                      hostType === 2 ? "border-[#CD264F]" : ""
                    }`}
                  >
                    <Icon
                      icon="companySVG"
                      height={24}
                      width={24}
                      strokeWidth={1}
                    />
                    Company
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    id="company"
                    name="hostType"
                    value={2}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 flex flex-col gap-2">
              <Input
                placeholder={"First name"}
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                lable={"First Name"}
                required={true}
              />
            </div>
            <div className="col-span-12 flex flex-col gap-2">
              <Input
                placeholder={"Last name"}
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                lable={"Last Name"}
                required={true}
              />
            </div>
            <div className="col-span-12  flex flex-col gap-2">
              <input
                className=" pl-4 py-4  border rounded-lg md:rounded-xl w-full"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Email`}
                value={email}
                required={true}
              />
            </div>

            <div className="col-span-12  flex flex-col gap-2 ">
              <input
                className=" pl-4 py-4  border rounded-lg md:rounded-xl"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`Password`}
                value={password}
                required={true}
              />
              {/* {showPassword ? <EyeOpen className={'col-span-2'}/> : <EyeClose className={'col-span-2'}/>} */}
            </div>
            <div className="col-span-12  flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <select
                  value={countriesFlag}
                  className="rounded-xl  w-[90px] border py-4 px-4 md:px-4 md:py-4 select_Option"
                  onChange={(e) => {
                    console.log("sselected :", e.target.value);
                    getCountryCodesMobile(e.target.value);
                    setMobileCountryCode(e.target.value);
                  }}
                >
                  <option key={`default`} value={`default`}>
                    {countriesFlag}
                  </option>

                  {countries.map((countryelement) => (
                    <option
                      key={`${countryelement.iso2}`}
                      value={`${JSON.stringify(countryelement)}`}
                    >
                      <>{countryelement.name} </>
                    </option>
                  ))}
                </select>

                <div className="py-4  w-[100%] border flex gap-2 rounded-xl px-3">
                  <div className="flex whitespace-nowrap">{`${phoneCode}`}</div>
                  <div
                    className={`text-slate-300 ${
                      phoneCode ? "block" : "hidden"
                    }`}
                  >{`|`}</div>
                  <input
                    className="pl-2 w-full focus:outline-none"
                    name={`mobile`}
                    id=""
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder={`Phone Number`}
                    value={`${mobile}`}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {hostType === 2 ? (
              <div className="col-span-12  flex flex-col gap-2">
                <Input
                  placeholder={"Company name"}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  lable={"Company Name"}
                  required={true}
                />
              </div>
            ) : (
              ""
            )}
            {hostType === 2 ? (
              <div className="col-span-12  flex flex-col gap-2">
                <Input
                  placeholder={"Company Address"}
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  lable={"Company Address"}
                />
              </div>
            ) : (
              ""
            )}
            <div className="col-span-12 flex flex-col gap-2">
              {/* Country */}
              <select
                onChange={async (e) => {
                  const country = JSON.parse(e.target.value).name;
                  const countryCode = JSON.parse(e.target.value).iso2;
                  setCountryCode(countryCode);
                  setCountry(country);

                  try {
                    const states = await getStateList(countryCode);
                    setStates(states.data);
                    setState(states.data[0]?.name);
                    setStateCode(states.data[0]?.iso2);
                    getCityAndSetValues(countryCode, states.data[0]?.iso2);
                  } catch (e) {
                    console.log("sorry there is an error ");
                  }
                }}
                className="pl-3 pr-6 py-4 md:p-4  border rounded-xl w-full hover:cursor-pointer select_Option truncate"
                name="country"
                id="country"
              >
                {/* <option key={`default`} value={`default`}>
        Country 
      </option> */}
                {countries.map((countryelement) => (
                  <option
                    key={`${countryelement.iso2}`}
                    value={`${JSON.stringify(countryelement)}`}
                  >
                    {countryelement.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 flex flex-col gap-2">
              {/* States */}
              <select
                onChange={async (e) => {
                  const state = JSON.parse(e.target.value);
                  setState(state.name);

                  try {
                    const cities = await getCityList(countryCode, state.iso2);
                    setCities(cities.data);
                  } catch (e) {
                    console.log("sorry there is an error ");
                  }
                }}
                className="p-4  border rounded-xl w-full hover:cursor-pointer select_Option truncate"
                name="country"
                id="country"
              >
                <option key={`default`} value={`default`}>
                  States
                </option>
                {states.map((state) => (
                  <option
                    key={`${state.iso2}`}
                    value={`${JSON.stringify(state)}`}
                  >
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 flex flex-col gap-2">
              {/* City */}
              <select
                onChange={async (e) => {
                  console.log("selected city:", JSON.parse(e.target.value));
                }}
                className="p-4  border rounded-xl w-full hover:cursor-pointer select_Option truncate"
                name="country"
                id="country"
              >
                <option key={`default`} value={`default`}>
                  City
                </option>
                {cities?.map((city, index) => (
                  <option key={`${index}`} value={`${JSON.stringify(city)}`}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <br />
          </div>
          <div className="flex gap-4 md:justify-end mb-14 mt-5 mx-5 md:mx-0">
            <button
              type="button"
              onClick={() => setHostType(null)}
              className="border p-4 rounded-lg border-black rotate-90"
            >
              <Icon icon="leftArrowSVG" />
            </button>
            <input
              className="bg-black text-white rounded-lg px-5 py-3 cursor-pointer w-full"
              type={"submit"}
              value="Next"
              onClick={handleClick}
            />
          </div>
        </form>
      </>
    );
  };

  return (
    <div>
      {hostType === null ? (
        <div className="col-span-12 flex flex-col gap-2 text-center mt-10">
          <Typography className={` text-2xl font-medium`} variant={"h2"}>
            Host Type
          </Typography>
          <div className=" p-4 flex justify-center gap-4">
            <div
              className={`flex justify-center items-center `}
              onClick={(e) => {
                setHostType(1);
              }}
            >
              <label
                htmlFor="individual"
                className={`flex flex-col items-center gap-2 border md:p-6 p-6 rounded-lg cursor-pointer ${
                  hostType === 1 ? "border-[#CD264F]" : ""
                }`}
              >
                <Icon
                  icon="induvidualSVG"
                  height={40}
                  width={40}
                  strokeWidth={1}
                />
                Individual
              </label>
              <input
                className="hidden"
                type="radio"
                id="individual"
                name="hostType"
                value={1}
              />
            </div>
            <div
              className={`flex justify-center items-center`}
              onClick={(e) => {
                setHostType(2);
              }}
            >
              <label
                htmlFor="company"
                className={`flex flex-col items-center gap-2 border md:p-6 p-6 rounded-lg cursor-pointer ${
                  hostType === 2 ? "border-[#CD264F]" : ""
                }`}
              >
                <Icon
                  icon="companySVG"
                  height={45}
                  width={45}
                  strokeWidth={1}
                />
                Company
              </label>
              <input
                className="hidden"
                type="radio"
                id="company"
                name="hostType"
                value={2}
              />
            </div>
          </div>
          <span
            onClick={() => router.back()}
            className="pt-3 cursor-pointer block text-center text-[#CD264F]"
          >
            Go Back
          </span>
        </div>
      ) : (
        <>
          {showLoader ? (
            <div className="relative">
              <div className="absolute top-0 left-0 w-full flex justify-center items-center h-full z-10">
                <Image
                  src={"2023/06/OTP-loader.gif"}
                  alt={"Loading..."}
                  loading="lazy"
                  height={80}
                  width={80}
                  loader={myLoader}
                />
              </div>
              {displayForm()}
            </div>
          ) : (
            displayForm()
          )}
        </>
      )}
    </div>
  );
}

export const PageHeading = ({ children, className, ...props }) => {
  return (
    <Typography
      className={`text-2xl md:text-[1.7rem] font-normal text-black ${className}`}
      variant={"h1"}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const PageSubHeading = ({ children, className, ...props }) => {
  return (
    <Typography
      className={`text-lg font-light text-black ${className}`}
      variant={"h2"}
      {...props}
    >
      {children}
    </Typography>
  );
};


const EyeOpen = ({className}) => {
  return (
     <div className={`${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-gray-500">
       <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
     </div>
  )
}

const EyeClose = ({className}) => {
   return (
      <div className={`${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
       <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
      </div>
   )
}

//----------------------------------------------------------------//
/*

ui changes

1st step
  after email and mobile
  there should be on radio button
    - is Individual
    - is company
    based on value there will be other fields
  
  country should be dropDown select(done)
  state and city will be the same as country(done)

2nd step
  one adjecent button for sending verification request ( square button with ✓ sign)

3rd step
  add loading state in middle of page
  make docuSign appereance as HKapp

other tasks
  - where to redirect

*/
