import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineHome } from "react-icons/ai";
import { FiAlertCircle, FiMoon } from "react-icons/fi";
import { LuSettings, LuSquareCheckBig } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, Link } from "react-router-dom";

function Aside({ setNavbarTitle, aside, setAside }) {
  return (
    <aside
      className={`fixed flex flex-col left-0 top-0  h-screen border-r border-[#E9ECEF] bg-white z-20 transition-all duration-500 ease-in-out ${aside ? "w-20" : "w-64"}`}
    >
      <div className="logo border-b border-[#E9ECEF] p-5 flex justify-between gap-2 items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9  bg-[#473DD4] rounded-lg flex justify-center items-center">
            <LuSquareCheckBig className="text-white text-[21px]" />
          </div>
          {!aside && (
            <h2 className="font-semibold text-[18px] text-[#212529]">
              TaskFlow
            </h2>
          )}
        </div>
        <button className="p-1.5 transition-all duration-500 ease-in-out hover:bg-[#F8F9FA] rounded-md cursor-pointer">
          <RxHamburgerMenu
            className="text-[#212529] text-[18px]"
            onClick={() => {
              setAside(!aside);
            }}
          />
        </button>
      </div>
      <div className="main p-5 flex-1">
        <NavLink
          to={"/"}
          onClick={()=>{
            setNavbarTitle("Bosh sahifa")
          }}
          className={({ isActive }) =>
            `flex p-3 group items-center  mb-2.5 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#F8F9FA] ${aside ? "justify-center" : "gap-3"} ${
              isActive
                ? "bg-indigo-100 text-[#4F46E5]"
                : "text-[#6C757D] hover:bg-gray-100"
            }`
          }
        >
          <AiOutlineHome />
          {aside ? (
            ""
          ) : (
            <h3
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                aside ? "max-w-0 opacity-0 ml-0" : "max-w-auto opacity-100"
              }`}
            >
              Bosh sahifa
            </h3>
          )}
        </NavLink>
        <NavLink
          to={"/alltasks"}
          onClick={()=>{
            setNavbarTitle("Barcha vazifalar")
          }}
          className={({ isActive }) =>
            `flex p-3 group items-center  mb-2.5 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#F8F9FA] ${aside ? "justify-center" : "gap-3"} ${
              isActive
                ? "bg-indigo-100 text-[#4F46E5]"
                : "text-[#6C757D] hover:bg-gray-100"
            }`
          }
        >
          <LuSquareCheckBig />
          {aside ? (
            ""
          ) : (
            <h3
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                aside ? "max-w-0 opacity-0 ml-0" : "max-w-auto opacity-100"
              }`}
            >
              Barcha vazifalar
            </h3>
          )}
        </NavLink>
        <NavLink
          to={"/checktasks"}
          onClick={()=>{
            setNavbarTitle("Bajarilgan")
          }}
          className={({ isActive }) =>
            `flex p-3 group items-center  mb-2.5 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#F8F9FA] ${aside ? "justify-center" : "gap-3"} ${
              isActive
                ? "bg-indigo-100 text-[#4F46E5]"
                : "text-[#6C757D] hover:bg-gray-100"
            }`
          }
        >
          <AiOutlineCheckCircle />
          {aside ? (
            ""
          ) : (
            <h3
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                aside ? "max-w-0 opacity-0 ml-0" : "max-w-auto opacity-100"
              }`}
            >
              Bajarilgan
            </h3>
          )}
        </NavLink>
        <NavLink
          to={"/nochecktasks"}
          onClick={()=>{
            setNavbarTitle("Bajarilmagan")
          }}
          className={({ isActive }) =>
            `flex p-3 group items-center  mb-2.5 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#F8F9FA] ${aside ? "justify-center" : "gap-3"} ${
              isActive
                ? "bg-indigo-100 text-[#4F46E5]"
                : "text-[#6C757D] hover:bg-gray-100"
            }`
          }
        >
          <FiAlertCircle />
          {aside ? (
            ""
          ) : (
            <h3
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                aside ? "max-w-0 opacity-0 ml-0" : "max-w-auto opacity-100"
              }`}
            >
              Bajarilmagan
            </h3>
          )}
        </NavLink>
        <NavLink
          to={"/settings"}
          onClick={()=>{
            setNavbarTitle("Sozlamalar")
          }}
          className={({ isActive }) =>
            `flex p-3 group items-center  mb-2.5 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#F8F9FA] ${aside ? "justify-center" : "gap-3"} ${
              isActive
                ? "bg-indigo-100 text-[#4F46E5]"
                : "text-[#6C757D] hover:bg-gray-100"
            }`
          }
        >
          <LuSettings />
          {aside ? (
            ""
          ) : (
            <h3
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                aside ? "max-w-0 opacity-0 ml-0" : "max-w-auto opacity-100"
              }`}
            >
              Sozlamalar
            </h3>
          )}
        </NavLink>
      </div>
      <div className="p-3 border-t border-[#E9ECEF] ">
        <button
          className={`w-full boxAside group  ${aside ? "justify-center" : "gap-3"}`}
        >
          <FiMoon className="text-[#6C757D] text-[20px] group-hover:text-black transition-all duration-300 ease-in-out group-focus:text-[#4F46E5]" />
          <h3
            className={`text-gray-500 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              aside ? "max-w-0 opacity-0 ml-0" : "max-w-auto opacity-100"
            }`}
          >
            Qorong'u rejim
          </h3>
        </button>
      </div>
    </aside>
  );
}

export default Aside;
