import { useSelector } from "react-redux";

export const useAccountsTabSelector = () =>
    useSelector((state) => state.accounts.tab);
