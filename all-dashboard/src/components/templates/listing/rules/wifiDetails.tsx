import WifiIcon from "assets/icons/wifi.svg";
import { FilledButton } from "ui/buttons";
import Divider from "ui/divider";
import OutlinedInput from "ui/input/outlinedInput";
import Image from "next/image";
import ArrowDownIcon from "assets/icons/down-arrow.png";
import ArrowUpIcon from "assets/icons/up-arrow.png";

export default function WifiDetails(props: any) {
  const {
    wifi_network_name,
    wifi_network_password,
    wifi_upload_speed,
    wifi_download_speed,
    onChange,
  } = props;

  return (
    <div className="p-5 flex 1xl:flex-col items-center border-grey border-2 rounded-[16px] opacity-50 cursor-not-allowed">
      <div className="shrink-0 self-start md:self-center">
        <div className="flex">
          <Image src={WifiIcon} alt="wifi" />
          <p className="ml-3 text-xl">Wifi details</p>
        </div>
        <Divider className="md-m:hidden !my-6" />
        <div className="mt-8 text-lg">
          <div className="grid grid-cols-2 gap-x-3">
            <p>Wifi network name</p>
            <OutlinedInput
              label="Enter your SSID"
              className="min-w-[120px] h-fit placeholder:text-xs"
              value={wifi_network_name}
              disabled
              onChange={(e) => onChange("wifi_network_name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 mt-6 gap-x-3">
            <p className="">Wifi password</p>
            <OutlinedInput
              label="Enter your password"
              className="min-w-[120px] h-fit placeholder:text-xs"
              value={wifi_network_password}
              disabled
              onChange={(e) =>
                onChange("wifi_network_password", e.target.value)
              }
            />
          </div>
          {/* this is for the mobile version */}
          <div className="grid grid-cols-2 mt-6 gap-x-3 md-m:hidden">
            <p className="">Internet speed</p>
            <div className="flex items-center">
              <div className="flex items-center gap-0.5">
                <Image src={ArrowDownIcon} alt="download" />
                <p className="text-center">
                  <span>{wifi_download_speed}</span>
                  <span className="text-grey-500 text-xs ml-0.5">Mbps</span>
                </p>
              </div>
              <Divider orientation="vertical" className="!mx-1.5" />
              <div className="flex items-center gap-0.5">
                <Image src={ArrowUpIcon} alt="upload" />
                <p className="text-center">
                  <span> {wifi_upload_speed}</span>
                  <span className="text-grey-500 text-xs ml-0.5">Mbps</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider className="md:hidden !mx-10" orientation="vertical" />
      <Divider className="md-m:hidden !my-6" />
      {/* this is for the web version */}
      <div>
        <div className="flex justify-between gap-3 md:hidden">
          <div>
            <p>Download speed</p>
            <p className="text-center">
              <span className="text-3xl">{wifi_download_speed}</span> Mbps
            </p>
          </div>
          <div>
            <h5>Upload speed</h5>
            <p className="text-center">
              <span className="text-3xl">{wifi_upload_speed}</span> Mbps
            </p>
          </div>
        </div>

        <FilledButton
              disabled
          text="Test internet speed"
          buttonClass="mt-7 w-full text-lg py-3 md:max-w-[212px] md:mx-auto md:block"
        />
        <p className="text-xs mt-8 md:text-center">
          Check the download and upload speeds of you WIFI network. This will
          help to update details.
        </p>
      </div>
    </div>
  );
}
