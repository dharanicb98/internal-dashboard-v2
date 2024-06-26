import React, { useEffect, useState } from "react";
import LeftBar from "./leftBar";
import Header from "./header";
import Footer from "./footer";
import Testing from "../../pages/testing";
import { useDispatch } from "react-redux";
import { getCountyData } from "../../store/reducers/countrySlice";

const Layout = ({ children }) => {
  const [displaySideText, setDisplaySideText] = useState(true);
  let dispatch = useDispatch();
  const onCloseSideText = () => {
    setDisplaySideText(false);
  };

  const onOpenSideText = () => {
    setDisplaySideText(true);
  };
  useEffect(() => {
    dispatch(getCountyData());
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex mt-12 left-0 right-0 top-4">
        <div className="h-screen overflow-auto border-r-2 w-[260px]">
          {/* <LeftBar
            setDisplaySideText={setDisplaySideText}
            displaySideText={displaySideText}
            onCloseSideText={onCloseSideText}
            onOpenSideText={onOpenSideText}
          /> */}
          <Testing />
        </div>
        <div className="w-full overflow-y-auto h-screen ">
          <div className="">{children}</div>
          {/* <div className="items-end"><Footer /></div> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
