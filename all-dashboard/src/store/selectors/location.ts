import { useSelector } from "react-redux";
import { RootStoreState } from "..";

export const useLocationSelector = () =>
  useSelector((state: RootStoreState) => state.location);
