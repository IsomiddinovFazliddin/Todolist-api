import React from "react";
import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

function Navbar({ title, aside, setAside }) {
  return (
    <nav
      className={`fixed top-0 right-0 flex justify-center  border-b border-[#E9ECEF] bg-white z-20 transition-all duration-500 ease-in-out ${aside ? "left-20" : "left-64"} px-5 lg:px-0`}
    >
      <div
        className={`container  flexStill py-5 justify-between ${aside ? "px-0" : "px-5"}`}
      >
        <div className="logo flex gap-5 items-end ">
          <h1 className="font-bold text-[24px] text-[#212529]">{title}</h1>
          <span className="flex gap-1 text-[#6C757D] text-[12px]">
            {/* <h6>3</h6> vazifa */}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <form className="flex relative" action="">
            <input
              className="w-70 font-normal text-[14px] text-gray-700 py-2 px-5 pl-8 bg-[#F8F9FA] border border-[#E9ECEF] outline-none rounded-lg transition-all duration-500 ease-in-out hover:border-[#4F46E5] focus:border-[#4F46E5]"
              type="text"
              placeholder="Vazifa qidirish..."
            />
            <IoSearch className="text-[#6c757da6] absolute left-2 top-[50%] translate-y-[-50%] text-[18px]" />
          </form>
          <button className="flexStill gap-2 bg-[#F8F9FA] border border-[#E9ECEF] text-gray-700 font-normal text-[14px] py-2 px-3 rounded-lg cursor-pointer transition-all duration-500 ease-in-out hover:border-[#4F46E5]">
            <CiFilter className="text-[#6C757D] text-[18px]" /> Barchasi{" "}
            <TiArrowSortedDown className="text-[18px] text-[#6C757D] ml-3" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
