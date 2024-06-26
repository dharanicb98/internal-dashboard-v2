/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dropdownMapping, importVendorListing } from "services/channel-manager/apis";
import { useChannelManagerMapping, useChannelManagerMappingLoader, useChannelManagerTabSelector, useChannelManagerVendorSelector } from "store/selectors/channel-manager";
import { mappingLoader, setMapping } from "store/slices/channel-manager";
import { OutlinedButton } from "ui/buttons";
import Loading from "ui/loading";

export default function ListingsTab({ type }) {
  const loading = useChannelManagerMappingLoader();
  const mapping = useChannelManagerMapping();

  const dispatch = useDispatch();
  const vendorName = useChannelManagerVendorSelector();
  const tabID = useChannelManagerTabSelector();
  const [state, setState] = useState({
    id: '',
    loading: false,
    error: ''
  });

  const listings = mapping.data?.[type] || [];
  const baseCol = tabID == 'tab2' ? 5 : 4;

  const importData = async (id: string) => {
    if (confirm('Are you sure you want to import?')) {
      setState({ ...state, loading: true, id });
      const setupRes = await importVendorListing(vendorName, id);
      if (setupRes.status) {
        dispatch(mappingLoader(true));
        const mappingResponse = await dropdownMapping(vendorName);
        dispatch(setMapping(mappingResponse || {}));
        dispatch(mappingLoader(false));
      }
      setState({ ...state, error: setupRes.message, loading: false });
    }
  }

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (state.error) {
      timer = setTimeout(() => {
        setState({ ...state, error: '' });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="relative">
      <div className="hidden">
        <div className="basis-1/4" />
        <div className="basis-1/5" />
      </div>

      {loading ? <div className="p-4 pt-10 text-center"><Loading /></div> :
        <div className="mb-4">
          {!listings.length ?
            <p className="text-[12px]">{mapping.message}..!</p>
            :
            <div className="block">
              {(!state.loading && state.error) ?
                <div>
                  <p className="border bg-primary font-[500] text-white p-3 text-[14px] rounded-[5px] mb-5">{state.error}</p>
                </div> : ''}

              <div className="flex w-full border-b-2 pb-2 font-[600]">
                <p className={`basis-1/${baseCol}`}>ID</p>
                <p className={`basis-2/${baseCol}`}>Title</p>
                <p className={`basis-1/${baseCol} text-center`}>Details</p>
                {baseCol == 5 ? <p className={`basis-1/${baseCol} text-center`}>Import</p> : ''}
              </div>

              {listings.map((ele) => {
                return <div className="flex items-center my-4" key={ele._id}>
                  <p className={`basis-1/${baseCol}`}>{ele.listing_id}</p>
                  <p className={`basis-2/${baseCol}`}>{ele.title}</p>
                  <p className={`basis-1/${baseCol} text-center`}><OutlinedButton onClick={() => alert(ele._id)} text="Details" /></p>
                  {baseCol == 5 ? <p className={`basis-1/${baseCol} text-center`}><OutlinedButton
                    disabled={state.loading} onClick={() => importData(ele._id)} text={(state.loading && state.id == ele._id) ? 'Please wait...' : 'Import'} /></p> : ''}
                </div>
              })}
            </div>
          }
        </div >
      }
    </div >
  );
}
