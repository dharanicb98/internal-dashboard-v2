import { wrapper } from "store/index";
import "../styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import "../styles/calendar-override.css";
import "../styles/custom-calendar.css";
import "flowbite";

function App({ Component, pageProps }) {
  // If page layout is available, use it. Else return the page
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(App);
