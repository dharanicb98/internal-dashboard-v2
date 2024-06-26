import { useSelector } from "react-redux";

export const useCustomerSupportTabSelector = () =>
  useSelector((state) => state.customerSupportTabs.tab);
