/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSetup, deleteSetup, dropdownMapping, updateSetup } from "services/channel-manager/apis";
import { useChannelManagerSetup, useChannelManagerVendorSelector } from "store/selectors/channel-manager";
import { mappingLoader, setMapping, setSetup, updateTab } from "store/slices/channel-manager";
import { FilledButton, OutlinedButton } from "ui/buttons";
import Textarea from "ui/input/textarea";
import TextField from "ui/input/textfield";

export default function IntegrationsTab() {
  const dispatch = useDispatch();
  const setup = useChannelManagerSetup();
  const vendorName = useChannelManagerVendorSelector();
  const [state, setState] = useState({
    delete_loading: false,
    loading: false,
    error: ''
  });

  const [formData, setFormData] = useState({
    client_id: '',
    client_secret_id: '',
  });

  useEffect(() => {
    setFormData({
      client_id: setup?.data?.client_id || '',
      client_secret_id: setup?.data?.client_secret_id || '',
    });
  }, [setup]);

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

  const refreshMapping = async () => {
    dispatch(mappingLoader(true));
    const mappingResponse = await dropdownMapping(vendorName);
    dispatch(setMapping(mappingResponse || {}));
    dispatch(mappingLoader(false));
  }

  const handleIntegration = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const setupRes = await (!setup.status ? createSetup(vendorName, formData) : updateSetup(vendorName, formData));
    if (setupRes.status) {
      dispatch(setSetup(setupRes));
      refreshMapping();
    }
    setState({ ...state, error: setupRes.message, loading: false });
  }

  const deleteVendor = async () => {
    if (confirm('Are you sure you want to delete?')) {
      setState({ ...state, delete_loading: true });
      const setupRes = await deleteSetup(vendorName);
      if (setupRes.status) {
        dispatch(setSetup({ ...setupRes, status: false }));
        refreshMapping();
        setTimeout(() => {
          dispatch(updateTab('tab1'));
        }, 1000);
      }
      setState({ ...state, error: setupRes.message, delete_loading: false });
    }
  }

  return (
    <div className="relative">
      <div className="mb-4 border-b">
        {detailsRender('Webhook', 'webhook')}
        {detailsRender(labelRender('client_id', true), 'client_id')}
        {detailsRender(labelRender('client_secret_id', true), 'client_secret_id')}
      </div>


      {(!state.loading && state.error) ?
        <div>
          <p className="border bg-primary font-[500] text-white p-3 text-[14px] rounded-[5px] mb-5">{state.error}</p>
        </div> : ''}

      <form className="flex flex-col mt-[32px]" onSubmit={handleIntegration}>
        <TextField
          labelName={labelRender('client_id')}
          value={formData.client_id}
          onChange={(e: { target: { value: string }; }) => setFormData({ ...formData, client_id: e.target.value })}
          inputClass="text-lg w-full mb-5"
          required
        />

        <Textarea
          row={5}
          required={labelRender('required')}
          labelName={labelRender('client_secret_id')}
          value={formData.client_secret_id}
          onChange={(e) => setFormData({ ...formData, client_secret_id: e })}
          className="border-grey-dark border-0 rounded-none border-b !outline-none p-0 text-lg w-full mb-8"
        />

        <div className="flex justify-between">
          <FilledButton
            disabled={state.loading || state.delete_loading}
            type="submit"
            text={state.loading ? 'Please wait...' : (setup.status ? 'Update' : 'Save')}
            buttonClass={`px-8 py-3 ${(state.loading || state.delete_loading) ? `cursor-loading bg-[#aaa]` : ``}`}
          />

          {(!state.loading && setup.status) ?
            <OutlinedButton
              disabled={state.delete_loading}
              onClick={deleteVendor}
              type="button"
              text={state.delete_loading ? 'Please wait...' : 'Delete'}
              buttonClass={`ml-3 px-8 font-[500] py-3 ${state.delete_loading ? `cursor-loading bg-[#aaa]` : ``}`}
            /> : ''}
        </div>
      </form>
    </div>
  );
}

const detailsRender = (name: string, key: string) => {
  const setup = useChannelManagerSetup();

  return <p className="mb-4 flex break-all text-[14px]">
    <b className="inline-block min-w-[190px] text-primary mr-10">{name}</b>
    <span className="text-black break-all">{(setup?.data?.[key] || '-')}</span>
  </p>
}

const labelRender = (name: string, skipRequired: boolean = false) => {
  const vendorName = useChannelManagerVendorSelector();
  const vendorKey = String(vendorName).toLowerCase();
  const labelObj = {
    hostaway: { client_id: 'Client ID*', client_secret_id: 'Client Secret*', required: true },
    ownerrez: { client_id: 'Client Email*', client_secret_id: 'Client Secret*', required: true },
    lohono: { client_id: 'API Key*', client_secret_id: 'Email*', required: true },
    rmscloud: { client_id: 'Client ID*', client_secret_id: 'Client Secret (JSON Data)*', required: true },
    wordpress: { client_id: 'API URL*', client_secret_id: 'Domain Name*', required: true },
  }

  if (skipRequired) return (labelObj?.[vendorKey]?.[name] || "").replace('*', '');
  return labelObj?.[vendorKey]?.[name]
}
