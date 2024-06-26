import dynamic from "next/dynamic";

const LoginWithFacebook = dynamic(() => import("ui/social/facebook"), {
  ssr: false,
});

const LoginWithX = dynamic(() => import("ui/social/x"), {
  ssr: false,
});

const LoginWithLinkedIn = dynamic(() => import("ui/social/linkedIn"), {
  ssr: false,
});

const LoginWithApple = dynamic(() => import("ui/social/apple"), {
  ssr: false,
});

function Social() {
  return (
    <div>
      <p className="text-xl font-medium">Connect your socials</p>
      <p className="text-lg font-normal text-grey-light mt-2">
        Before you get started connect your social
      </p>
      <div className="grid grid-cols-2 md:grid-cols-1 w-full gap-x-10 gap-y-4 my-8">
        <LoginWithFacebook title="Desmith Rose" />
        <LoginWithX title="Desmith Rose" />
        <LoginWithLinkedIn title="Desmith Rose" />
        <LoginWithApple title="Desmith Rose" />
      </div>
    </div>
  );
}

export default Social;
