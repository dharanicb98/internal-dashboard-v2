import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useChannelManagerLoadingSelector, useChannelManagerSetup, useChannelManagerTabSelector, useChannelManagerVendorSelector } from "store/selectors/channel-manager";
import { Tab, TabWrapper } from "ui/tab";
import { mappingLoader, setMapping, setSetup, setupLoader, updateTab, updateVendor } from "slices/channel-manager";
import { checkSetup, dropdownMapping } from "services/channel-manager/apis";
import IntegrationsTab from "./tabs/integrations";
import ListingsTab from "./tabs/listings";
import MappingTab from "./tabs/mapping";
import Loading from "ui/loading";

export default function VendorConfiguration() {
  const dispatch = useDispatch();
  const vendorName = useChannelManagerVendorSelector();
  const tabID = useChannelManagerTabSelector();
  const loading = useChannelManagerLoadingSelector();
  const setup = useChannelManagerSetup();

  useEffect(() => {
    const scrollDiv = document.getElementById('tabScroll');
    if (scrollDiv) scrollDiv.scrollTop = 0;
  }, [tabID]);

  useEffect(() => {
    if (vendorName) {
      (async () => {
        dispatch(setupLoader(true));
        const setupResponse = await checkSetup(vendorName);
        if (setupResponse.status == undefined) {
          dispatch(updateVendor(""));
        } else {
          dispatch(setSetup(setupResponse || {}));
        }
        dispatch(setupLoader(false));
      })();
    }
  }, [vendorName]);

  useEffect(() => {
    if (vendorName && tabID && ['tab1', 'tab2'].includes(tabID)) {
      (async () => {
        dispatch(mappingLoader(true));
        const mappingResponse = await dropdownMapping(vendorName);
        dispatch(setMapping(mappingResponse || {}));
        dispatch(mappingLoader(false));
      })();
    }
  }, [vendorName, tabID]);

  const tabItems = [{
    key: "HolidayKeepers",
    value: "tab1",
  }, {
    key: vendorName,
    value: "tab2",
  }, {
    key: "Mapping",
    value: "tab3",
  }, {
    key: "Reservations",
    value: "tab4",
  }, {
    key: "Integrations",
    value: "tab5",
  }];

  const tabPanels = [{
    component: <ListingsTab type="internal" />,
    value: "tab1",
  }, {
    component: <ListingsTab type="vendor" />,
    value: "tab2",
  }, {
    component: <MappingTab />,
    value: "tab3",
  }, {
    component: <p>Reservations - Pending</p>,
    value: "tab4",
  }, {
    component: <IntegrationsTab />,
    value: "tab5",
  }];

  return (
    vendorName ?
      <div className="p-4 flex-auto overflow-auto" id="tabScroll">
        <h3 className="pb-5 font-[600] text-[28px] text-primary">{vendorName}</h3>

        {(!loading && !setup.status && tabID != 'tab5') ? <p
          onClick={() => dispatch(updateTab('tab5'))}
          className="border bg-primary font-[500] text-white cursor-pointer p-3 text-[14px] rounded-[5px] mb-5"
        >Please click on integrations tab {">"} Add client secret and client ID. </p> : ''}

        <Tab
          items={tabItems}
          defaultTab="profile"
          sticky
          onChange={(value) => dispatch(updateTab(value))}
          value={tabID}
          flexProps={{
            className: "flex justify-between gap-8 overflow-auto",
          }}
          selectedTabClass="text-primary border-primary"
          buttonClass="whitespace-nowrap text-[15px]"
        />

        {loading ? <div className="p-4 pt-10 text-center"><Loading /></div> :
          <TabWrapper
            tabs={tabPanels}
            value={tabID}
            itemClass="my-6 dark-scrollbar md:mb-[76px]"
          />
        }

      </div>
      :
      <div className="flex flex-auto justify-center items-center">
        <p className="opacity-[0.2]">Please select the vendor...</p>
      </div>
  );
}
