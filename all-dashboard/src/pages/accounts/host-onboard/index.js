import LoginLayout from "components/layouts/login";
import HostForm from "../../../components/hostOnboarding";
import Stepper from "../../../components/hostOnboarding/faq/stepperWidget";
import { useSelector } from "react-redux";
import Head from "next/head";
import Image from "next/image";
export const getServerSideProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default function HostOnboard({}) {
  const step = useSelector((state) => state.hostPage.currentStep);
  return (
    <>
      <Head>
        <title>Join HolidayKeepers and Start Your Hosting Journey Today</title>
        <meta
          name="description"
          content="Unlock the potential of your property with HolidayKeepers. Experience seamless onboarding as a host and gain access to a global network of travelers."
        />
      </Head>
      <center className="mb-8 md-m-1:hidden">
        <Image
          src="/assets/images/loginHKLogo.svg"
          alt="hk-logo"
          width="138"
          height="37"
        />
      </center>

      {/* <div className="w-full h-[90px] bg-black"></div> */}
      <div className="max-w-screen-hk mx-auto grid grid-cols-12 sm:block min-h-[100%] animate-fade-in overflow-auto ">
        <div
          className={`${
            step === 0 ? "hidden" : ""
          } col-span-10 lg:col-span-6 col-start-2 lg:col-start-4 mt-10`}
        >
          <Stepper steps={[1, 2, 3]} activeStep={step} />
        </div>
        <div className="col-span-12">
          <HostForm />
        </div>
      </div>
    </>
  );
}

HostOnboard.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
