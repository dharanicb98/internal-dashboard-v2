import React from "react";
import SocialButton from "./socialButton";
import LinkedinIcon from "assets/icons/linked-in.png";
import { LoginSocialLinkedin } from "reactjs-social-login";
import { LINKEDIN_APP_ID, LINKEDIN_APP_SECRET } from "src/constants/api";

const REDIRECT_URI = "http://localhost:5173/";

const LoginWithLinkedIn = (props: { title: string }) => {
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
    <LoginSocialLinkedin
      onReject={onAuthReject}
      onResolve={onAuthResolve}
      onLoginStart={onLoginStart}
      redirect_uri={REDIRECT_URI}
      onLogoutSuccess={onLogoutSuccess}
      client_id={LINKEDIN_APP_ID || ""}
      client_secret={LINKEDIN_APP_SECRET || ""}
    >
      <SocialButton icon={LinkedinIcon} name="LinkedIn" title={props.title} />
    </LoginSocialLinkedin>
  );
};

export default LoginWithLinkedIn;
