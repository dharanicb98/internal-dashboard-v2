/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useChannelManagerMapping, useChannelManagerMappingLoader, useChannelManagerVendorSelector } from "store/selectors/channel-manager";
import { OutlinedButton } from "ui/buttons";
import Select from "ui/input/select";
import Loading from "ui/loading";
import ArrowDownIcon from "assets/icons/arrow-down.png";
import Image from "next/image";
import { deleteMapping, getMapping, saveMapping } from "services/channel-manager/apis";

export default function MappingTab() {
  const loading = useChannelManagerMappingLoader();
  const mapping = useChannelManagerMapping();
  const vendorName = useChannelManagerVendorSelector();
  const [formData, setFormData] = useState({
    listing_id: '',
    vendor_listing_id: '',
  });
  const [state, setState] = useState({
    loading: false,
    mapping_loading: false,
    mapping_data: [],
    mapping_error: '',
    error: ''
  });

  const listingInternal = mapping.data?.internal || [];
  const listingVendor = mapping.data?.vendor || [];

  const getMappingData = async () => {
    setState({ ...state, mapping_loading: true });
    const mappingResponse = await getMapping(vendorName);
    const updatedState = { ...state, mapping_error: mappingResponse.message, mapping_loading: false };
    if (mappingResponse.status != undefined) updatedState.mapping_data = mappingResponse.data || [];
    setState(updatedState);
  }

  const deleteMappingData = async (id: number) => {
    if (confirm('Are you sure you want to delete?')) {
      setState({ ...state, mapping_loading: true });
      const mappingResponse = await deleteMapping(vendorName, { mapping_id: id });
      setState({ ...state, mapping_error: mappingResponse.message });
      getMappingData();
    }
  }

  const handleMapping = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const mappingResponse = await saveMapping(vendorName, formData);
    setState({ ...state, error: mappingResponse.message, loading: false });

    if (mappingResponse.status) {
      setFormData({
        listing_id: '',
        vendor_listing_id: '',
      });
      getMappingData();
    }
  }

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (state.error) {
      timer = setTimeout(() => {
        setState({ ...state, error: '' });
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getMappingData();
    }, 1000);
    return () => clearTimeout(timer);
  }, [vendorName]);

  return (
    <div className="relative">
      {loading ? <div className="p-4 pt-10 text-center"><Loading /></div> :
        <div className="mb-4">
          {(!listingInternal.length || !listingVendor.length) ?
            <p className="text-[12px]">{mapping.message}..!</p>
            :
            <div className="block">

              {(!state.loading && state.error) ?
                <div>
                  <p className="border bg-primary font-[500] text-white p-3 text-[14px] rounded-[5px] mb-5">{state.error}</p>
                </div> : ''}

              <form className="flex flex-col my-[32px]" onSubmit={handleMapping}>
                <div className="flex">
                  <div className="basis-2/4 px-2">
                    <p>HolidayKeepers</p>
                    <Select
                      buttonContent={
                        <div className="flex justify-between items-center border border-grey p-2 rounded-lg">
                          <p>{listingInternal.find((e: { _id: string; }) => e._id == formData.listing_id)?.title || <>&nbsp;</>}</p>
                          <Image src={ArrowDownIcon} alt="down" />
                        </div>
                      }
                      listPaperClass="w-full bg-[#eee] mt-0"
                      optionsClass='m-0 border-b'
                      onChange={(value: string) => setFormData({ ...formData, listing_id: value })}
                      options={listingInternal.map((e: { title: string; _id: string; }) => { return { key: e.title, value: e._id } })}
                    />
                  </div>
                  <div className="basis-2/4 px-2">
                    <p>{vendorName}</p>
                    <Select
                      buttonContent={
                        <div className="flex justify-between items-center border border-grey p-2 rounded-lg">
                          <p>{listingVendor.find((e: { _id: string; }) => e._id == formData.vendor_listing_id)?.title || <>&nbsp;</>}</p>
                          <Image src={ArrowDownIcon} alt="down" />
                        </div>
                      }
                      listPaperClass="w-full bg-[#eee] mt-0"
                      optionsClass='m-0 border-b'
                      onChange={(value: string) => setFormData({ ...formData, vendor_listing_id: value })}
                      options={listingVendor.map((e: { title: string; _id: string; }) => { return { key: e.title, value: e._id } })}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <OutlinedButton
                    disabled={state.loading}
                    buttonClass="px-5"
                    text={state.loading ? 'Please wait...' : 'Save'}
                  />
                </div>
              </form>

              {state.mapping_loading ? <div className="p-4 pt-10 text-center"><Loading /></div> :
                state.mapping_data.length ?
                  <div className="block">
                    <div className="flex w-full border-b-2 pb-2 font-[600]">
                      <p className="basis-2/5">HolidayKeepers</p>
                      <p className="basis-2/5">{vendorName}</p>
                      <p className="basis-1/5"> </p>
                    </div>

                    {state.mapping_error ?
                      <p className="border bg-primary font-[500] text-white p-3 text-[14px] rounded-[5px] mb-5">{state.mapping_error}</p> : ''}

                    {state.mapping_data.map((ele) => {
                      return <div className="flex items-center my-4" key={ele?.id}>
                        <p className="basis-2/5">{ele?.listing?.title}</p>
                        <p className="basis-2/5">{ele?.vendor_listing?.title}</p>
                        <p className="basis-1/5">
                          <OutlinedButton
                            onClick={() => deleteMappingData(ele.id)}
                            buttonClass="px-5"
                            text={'Delete'}
                          />
                        </p>
                      </div>;
                    })}
                  </div>
                  : ''}
            </div>
          }
        </div>
      }
    </div>
  );
}
