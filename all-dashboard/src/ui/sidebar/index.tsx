import Link from "next/link";
import Image from "next/image";
import Logo from "assets/images/logo-ico.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateTab } from "store/slices/user";
import { usePathname } from "next/navigation";

const Sidebar = ({ menu, }) => {
  const logout = useSelector((s: any) => s.user?.logout);
  const userDetail = useSelector((s: any) => s.user?.details);
  const pathname = usePathname();
  const [active, setIsActive] = useState("home");
  // console.log(pathname);

  useEffect(() => {
    if (logout) {
      if (global?.window && window) window.location.href = '/accounts/signin';
    }
  }, [logout]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userDetail?.user_id) {
      const newUserId = JSON.parse(localStorage.getItem("token") || "{}");
      if (newUserId?.user_id) dispatch(updateTab(newUserId));
    }
  }, [userDetail?.user_id]);

 
 
  return (
    <div className="px-3 bg-white shadow drop-shadow-xl flex-shrink-0 min-h-screen md:hidden">
      <div className="px-4 py-5 sticky top-4">
        <Image src={Logo} alt="logo" className="m-auto" />
        <div className="pt-4 m-auto w-fit">
          {menu.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className={`link ${pathname === "${item.link}" ? "active" : ""}`}
            >
              {/* <div
                key={idx}
                className="py-4 mx-auto "
                onClick={() => handleIsActive(item.alt)}
              >
                {item.icon}
              </div> */}
              <Image
                src={item.icon}
                alt={item.alt}
                key={idx}
                className="py-4 mx-auto"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
