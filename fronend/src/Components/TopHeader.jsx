import React, { useState } from "react";
import { Avatar, DeliveryBx, Logo, Notification, Search } from "../Assets";
import Input from "./Share/Input";
import SVGIcon from "./Share/SVGIcon";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import useLogout from "../Hooks/useLogout";

export default function TopHeader() {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div className="flex justify-between items-center py-5 space-x-8">
      <div className="flex items-center space-x-3.5">
        <Link to="/">
          <SVGIcon Icon={Logo} />
        </Link>
        <p className="text-textHeader font-bold text-base leading-none">
          Project <br /> packers
        </p>
      </div>
      <div className="flex-1 relative">
        <Input placeholder="Paste the URL of the product" className="pl-12" />
        <SVGIcon Icon={Search} className="absolute top-1/4 left-3" />
      </div>
      <div className="flex items-center space-x-4 ">
        <Link
          to="/products"
          className="text-base font-normal text-textColor pr-2 hover:underline"
        >
          Products
        </Link>
        {!authUser && (
          <Link
            to="/login"
            className="text-base font-normal text-textColor pr-2 hover:underline"
          >
            Join As A Dropshipper
          </Link>
        )}
        <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full">
          <SVGIcon Icon={Notification} />
        </div>
        <div className="bg-bgLogo w-10 h-10 flex items-center justify-center rounded-full">
          <SVGIcon Icon={DeliveryBx} />
        </div>
        <div
          onMouseOver={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
          className="bg-[#FBE697] w-10 h-10 flex items-center justify-center rounded-full"
        >
          {authUser ? (
            <div className="relative">
              <img src={authUser?.profilePic} alt="" />

              <div
                className={`transition-all duration-300 ${
                  showLogout ? "block opacity-100" : "hidden opacity-0"
                }`}
              >
                <div className="h-[10px] absolute w-full bg-transparent"></div>
                <div className="bg-header text-white absolute top-[45px]  z-10 -left-[130px] rounded-md w-[170px] p-5">
                  <div className="w-full relative">
                    <div className="w-6 h-6 rotate-45 bg-header -top-5 -right-2 absolute z-20"></div>
                    <p>{authUser?.fullName}</p>
                    <hr />
                    <div className="bg-bgLogo text-header w-full rounded-md mt-3 py-1">
                      {!loading ? (
                        <button className="w-full" onClick={logout}>
                          Logout
                        </button>
                      ) : (
                        <span className="loading loading-spinner"></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SVGIcon Icon={Avatar} />
          )}
        </div>
      </div>
    </div>
  );
}
