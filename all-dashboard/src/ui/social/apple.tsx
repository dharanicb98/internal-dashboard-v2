import React from "react";
import SocialButton from "./socialButton";
import AppleIcon from "assets/icons/apple.png";
import { LoginSocialApple } from "reactjs-social-login";
import { APPLE_ID } from "src/constants/api";

const REDIRECT_URI = "http://localhost:5173/";

const LoginWithApple = (props: { title: string }) => {
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
    <LoginSocialApple
      client_id={process.env.REACT_APP_APPLE_ID || ""}
      scope={"name email"}
      redirect_uri={REDIRECT_URI}
      onLoginStart={onLoginStart}
      onResolve={({ provider, data }) => {
        setProvider(provider);
        setProfile(data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <SocialButton icon={AppleIcon} name="Apple" title={props.title} />
    </LoginSocialApple>
  );
};

export default LoginWithApple;
