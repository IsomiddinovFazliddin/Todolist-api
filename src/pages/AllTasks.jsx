import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

function AllTasks({ plans, delPlans, setModal, setEditId, getObj }) {
  return (
    <div>
      <div className="container">
        {plans?.map((item) => {
          return (
            <div
              key={item.id}
              className="card flex justify-between items-center p-5 border border-gray-200 bg-white rounded-xl transition-all duration-300 ease-in-out hover:shadow-md hover:border-[#4F46E5] hover:-translate-y-0.5 mb-2.5 peer-checked:bg-gray-100"
            >
              <div className="">
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-700 peer"
                  />
                  <h4 className="text-[#212529] font-medium text-[16px] peer-checked:line-through peer-checked:text-gray-400">
                    {item.title}
                  </h4>
                </div>
                <h5 className="pl-7 text-gray-400 text-[13px] peer-checked:line-through ">
                  {item.description}
                </h5>
              </div>
              <div className=" ">
                <div className="flex items-center gap-5 mb-3 justify-end">
                  <span className="px-2 py-1.5 bg-[#FCF5DB] rounded-lg text-[12px] font-semibold text-[#fabe4e]">
                    o'rta
                  </span>
                  <div className="flex items-center gap-1.5">
                    <h6 className="capitalize text-[12px] text-gray-300 font-medium">
                      yaratildi:
                    </h6>
                    <span className="capitalize text-[12px] text-gray-300 font-medium">
                      {item.deadline}
                    </span>
                  </div>
                </div>
                <div className="btns flex gap-2.5">
                  <button
                    className="flex items-center gap-3 border border-gray-300 py-1.5 px-3 rounded-lg text-[12px] text-gray-500 capitalize font-medium cursor-pointer transition-all duration-300 ease-in hover:bg-[#E7F0FC] hover:border-[#8EB7F8] hover:text-[#6aa1fa]"
                    onClick={() => {
                      setModal(true);
                      setEditId(item.id);
                      getObj(item.id);
                    }}
                  >
                    <FiEdit2 className="text-[14px]" /> tahrirlash
                  </button>
                  <button
                    className="flex items-center gap-3 border border-gray-300 py-1.5 px-3 rounded-lg text-[12px] text-gray-500 capitalize font-medium cursor-pointer transition-all duration-300 ease-in hover:bg-[#FCEBEC] hover:border-[#F38C8D] hover:text-[#F38C8D]"
                    onClick={() => {
                      delPlans(item.id);
                    }}
                  >
                    <RiDeleteBin5Line className="text-[14px]" />
                    o'chirish
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllTasks;
