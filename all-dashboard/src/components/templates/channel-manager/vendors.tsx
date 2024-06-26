import React from "react";
import { useDispatch } from "react-redux";
import { updateTab, updateVendor } from "slices/channel-manager";
import { useChannelManagerLoadingSelector, useChannelManagerVendorSelector } from "store/selectors/channel-manager";

export default function Vendors() {
  const dispatch = useDispatch();
  const vendorId = useChannelManagerVendorSelector();
  const loading = useChannelManagerLoadingSelector();

  const setVendor = (vendorName: string) => {
    if (!loading) {
      dispatch(updateVendor(vendorName));
      dispatch(updateTab('tab1'))
    }
  }

  return (
    <div className="border-r on border-grey py-4 last:pb-0 overflow-y-auto last:border-none min-w-[150px]">
      {['HostAway', 'ownerRez', 'Lohono', 'rmsCloud', 'WordPress'].map(v => {
        return <div
          onClick={() => setVendor(v)}
          className={`cursor-${loading ? `not-allowed` : `pointer`} py-4 font-[500] hover:text-primary ${vendorId == v ? `text-primary` : ``}`}
          key={v}
        >{v}</div>;
      })}
    </div>
  );
}
