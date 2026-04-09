import React, { useState, useRef, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

const filterOptions = [
  { value: "all", label: "Barchasi" },
  { value: "completed", label: "Bajarilgan" },
  { value: "notstarted", label: "Bajarilmagan" },
];

function Navbar({ navbarTitle, aside, setSearch, filter, setFilter }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel = filterOptions.find((o) => o.value === filter)?.label || "Barchasi";

  return (
    <nav
      className={`fixed top-0 right-0 flex justify-center  border-b border-[#E9ECEF] bg-white z-20 transition-all duration-500 ease-in-out ${aside ? "left-20" : "left-64"} px-5 lg:px-0`}
    >
      <div
        className={`container  flexStill py-5 justify-between ${aside ? "px-0" : "px-5"}`}
      >
        <div className="logo flex gap-5 items-end ">
          <h1 className="font-bold text-[24px] text-[#212529]">
            {navbarTitle}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <form
            className="flex relative"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-70 font-normal text-[14px] text-gray-700 py-2 px-5 pl-8 bg-[#F8F9FA] border border-[#E9ECEF] outline-none rounded-lg transition-all duration-500 ease-in-out hover:border-[#4F46E5] focus:border-[#4F46E5]"
              type="text"
              placeholder="Vazifa qidirish..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearch className="text-[#6c757da6] absolute left-2 top-[50%] translate-y-[-50%] text-[18px]" />
          </form>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flexStill gap-2 bg-[#F8F9FA] border border-[#E9ECEF] text-gray-700 font-normal text-[14px] py-2 px-3 rounded-lg cursor-pointer transition-all duration-500 ease-in-out hover:border-[#4F46E5]"
              onClick={() => setOpen(!open)}
            >
              <CiFilter className="text-[#6C757D] text-[18px]" />
              {activeLabel}
              <TiArrowSortedDown className="text-[18px] text-[#6C757D] ml-3" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E9ECEF] rounded-lg shadow-md z-30 min-w-[150px]">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`w-full text-left px-4 py-2 text-[14px] transition-all duration-200 hover:bg-[#F8F9FA] ${filter === opt.value ? "text-[#4F46E5] font-medium" : "text-gray-700"}`}
                    onClick={() => {
                      setFilter(opt.value);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
