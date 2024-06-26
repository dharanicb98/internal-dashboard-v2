import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isValidToken } from "../../utils";
import { authSuccess, authFail } from "../../store/reducers/authSlice";
import { error } from "../../store/reducers/loaderSlice";
import ErrorPopup from "../../components/popup/errorPopup";
import Cookies from "js-cookie";

function Login() {
  const errorMessage = useSelector((state) => state.loader.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    window.googleSSOSuccess = function (e) {
      const token = e.credential;

      if (!token) {
      } else {
        localStorage.setItem("token", JSON.stringify(token));
        Cookies.set("accessToken", token);
        const validateToken = isValidToken(token);
        if (validateToken.data) {
          dispatch(authSuccess());
        } else {
          dispatch(error(validateToken.error));
          dispatch(authFail());
        }
      }
    };
    loadScript("https://accounts.google.com/gsi/client");
  }, [dispatch]);

  const loadScript = (url) => {
    const myScript = document.createElement("script");
    myScript.src = url;
    document.body.appendChild(myScript);
  };

  return (
    <>
      {errorMessage && <ErrorPopup isOpen={true} errorMessage={errorMessage} />}
      <div
        style={{ backgroundColor: "rgba(245, 242, 235, 1)" }}
        className="flex flex-col justify-center items-center h-screen"
      >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <img
              width="184"
              alt="logo"
              src="https://www.holidaykeepers.com/wp-content/uploads/2022/05/holidaykeepers-logo.png"
            />
            <div className="mt-4">
              <GoogleSSOButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GoogleSSOButton() {
  const clientId =
    "763908872557-dairn99om87rgo41oq0g827fe3jg8dvq.apps.googleusercontent.com";

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={clientId}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="googleSSOSuccess"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
}

export default Login;
