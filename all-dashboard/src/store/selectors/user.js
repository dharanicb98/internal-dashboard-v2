import { useSelector } from "react-redux";

export const useUserDetailsSelector = () =>
  useSelector((state) => state.user.details);
