import React from "react";
import XIcon from "assets/icons/twitter.png";
import SocialButton from "./socialButton";
import { LoginSocialTwitter } from "reactjs-social-login";
import { TWITTER_V2_APP_KEY } from "src/constants/api";

const REDIRECT_URI = "http://localhost:5173/";

const LoginWithX = (props: { title: string }) => {
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
    <LoginSocialTwitter
      onReject={onAuthReject}
      onResolve={onAuthResolve}
      redirect_uri={REDIRECT_URI}
      onLoginStart={onLoginStart}
      onLogoutSuccess={onLogoutSuccess}
      client_id={TWITTER_V2_APP_KEY || ""}
    >
      <SocialButton icon={XIcon} name="X" title={props.title} />
    </LoginSocialTwitter>
  );
};

export default LoginWithX;
