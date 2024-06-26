import React from "react";
import SocialButton from "./socialButton";
import FacebookIcon from "assets/icons/fb.png";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FB_APP_ID } from "src/constants/api";

const REDIRECT_URI = "http://localhost:5173/";

const LoginWithFacebook = (props: { title: string }) => {
  const [provider, setProvider] = React.useState("");
  const [profile, setProfile] = React.useState<any>();

  const onLoginStart = React.useCallback(() => {
    console.log("login start");
  }, []);

  const onLogoutSuccess = React.useCallback(() => {
    setProfile(null);
    setProvider("");
    console.log("logout success");
  }, []);

  const onAuthResolve = ({ provider, data }: any) => {
    setProvider(provider);
    setProfile(data);
  };

  const onAuthReject = (err: any) => {
    console.log(err);
  };

  return (
    <LoginSocialFacebook
      onReject={onAuthReject}
      onResolve={onAuthResolve}
      onLoginStart={onLoginStart}
      redirect_uri={REDIRECT_URI}
      onLogoutSuccess={onLogoutSuccess}
      appId={FB_APP_ID || ""}
      fieldsProfile={
        "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
      }
    >
      <SocialButton icon={FacebookIcon} name="Facebook" title={props.title} />
    </LoginSocialFacebook>
  );
};

export default LoginWithFacebook;
