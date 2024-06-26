import { useSelector, useDispatch } from "react-redux";
import RouteComp from "../src/routes/index";
import Login from "./pages/login";
import { isValidToken } from "./utils";
import { authSuccess, logout } from "./store/reducers/authSlice";
import { error } from "./store/reducers/loaderSlice";
// import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  const checkAuthToken = () => {
    const token = localStorage.getItem("token");
    // const token = Cookies.get("accessToken");
    if (token) {
      let parseToken = JSON.parse(token);
      const validateToken = isValidToken(parseToken);
      if (validateToken.data) {
        dispatch(authSuccess());
      } else {
        dispatch(error(validateToken.error));
        // dispatch(logout());
      }
    }
  };
  checkAuthToken();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return <>{isAuthenticated ? <RouteComp /> : <Login />}</>;
}

export default App;
