import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authFail } from "../../store/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

const Header = () => {
  const [toggleProfile, setToggleProfile] = useState(true);
  const token = localStorage.getItem("token");
  // const token = Cookies.get("accessToken");
  const userDetails = jwtDecode(token);
  const { email, name, picture } = userDetails;

  const dispatch = useDispatch();
  const handleGoToWebsite = () => {
    window.open("https://www.snizle.com");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    // Cookies.remove("accessToken");
    dispatch(authFail());
  };

  return (
    <header className="bg-white h-[70px] w-[100%] z-[10] flex justify-between items-center px-[20px] fixed top-0 left-0 right-0 shadow-sm">
      <img src="/hkLogo.svg" alt="holiday keepers logo" />

      <div className="relative group">
        <img
          src={`${picture}`}
          alt="profile image"
          className="w-[37px] h-[37px] rounded-full cursor-pointer"
        />
        <div
          className={`absolute bg-white shadow-lg p-6 rounded-md flex flex-col  invisible group-hover:visible -left-[150px] w-[200px]`}
        >
          <span className="text-[20px] font-medium">{name && name}</span>
          <span className="text-slate-500 text-[11px]">{email && email}</span>
          <span className="cursor-pointer py-1" onClick={handleGoToWebsite}>
            Go to Website
          </span>
          <hr />
          <span onClick={handleLogOut} className="cursor-pointer">
            Logout
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
