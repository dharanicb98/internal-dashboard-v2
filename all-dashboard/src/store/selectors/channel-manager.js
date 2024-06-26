import { useSelector } from "react-redux";

export const useChannelManagerVendorSelector = () => useSelector((state) => state.channelManager.vendor);
export const useChannelManagerTabSelector = () => useSelector((state) => state.channelManager.tab);
export const useChannelManagerLoadingSelector = () => useSelector((state) => state.channelManager.setupLoading);
export const useChannelManagerSetup = () => useSelector((state) => state.channelManager.setup);

export const useChannelManagerMappingLoader = () => useSelector((state) => state.channelManager.mappingLoading);
export const useChannelManagerMapping = () => useSelector((state) => state.channelManager.mapping);