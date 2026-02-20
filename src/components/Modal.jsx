import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function Modal({
  setModal,
  newTitle,
  setNewTitle,
  newDesc,
  setNewDesc,
  newDate,
  setNewDate,
  addPlans,
  closeModal,
  editId,
  updatePlans,
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className={`w-105 bg-white rounded-lg p-5 relative`}>
        <h2 className="font-semibold text-[20px] mb-4">
          Yangi vazifa qo'shish
        </h2>
        <hr className="mb-4 border-gray-300" />
        <IoClose
          className="absolute top-3 right-3 text-[18px] text-gray-500 cursor-pointer"
          onClick={() => {
            closeModal();
          }}
        />
        <form
          id="modalForm"
          action=""
          className="grid w-full"
          onSubmit={(e) => {
            e.preventDefault();
            {
              editId ? updatePlans() : addPlans();
            }
          }}
        >
          <label
            className="font-medium text-[14px] text-gray-900 mb-2.5"
            htmlFor=""
          >
            Yangi vazifa
          </label>
          <input
            className="w-full text-[14px] text-gray-700 border border-[#E9ECEF] bg-[#F8F9FA] py-2 px-4 mb-5 outline-none rounded-md "
            required
            type="text"
            placeholder="Vazifa nomini kiriting..."
            value={newTitle}
            onInput={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <label
            className="font-medium text-[14px] text-gray-900 mb-2.5"
            htmlFor=""
          >
            Tavsif
          </label>
          <textarea
            required
            name=""
            id=""
            placeholder="Vazifa haqida batafsil ma'lumot"
            className="w-full text-[14px] text-gray-700 border border-[#E9ECEF] bg-[#F8F9FA] py-2 px-4 mb-5 outline-none rounded-md"
            value={newDesc}
            onInput={(e) => {
              setNewDesc(e.target.value);
            }}
          ></textarea>
          <div className="flex justify-between gap-5 items-start">
            <div className="grid w-1/2">
              <label
                htmlFor=""
                className="font-medium text-[14px] text-gray-900 mb-2.5"
              >
                Muddat
              </label>
              <input
                required
                type="date"
                className="w-full text-[14px] text-gray-700 border border-[#E9ECEF] bg-[#F8F9FA] py-2 px-4 mb-5 outline-none rounded-md "
                value={newDate || ""}
                onInput={(e) => {
                  setNewDate(e.target.value);
                }}
              />
            </div>
            <div className="grid w-1/2">
              <label
                htmlFor=""
                className="font-medium text-[14px] text-gray-900 mb-2.5 "
              >
                Muhimlik darajasi
              </label>
              <select
                name=""
                id=""
                className="w-full text-[14px] text-gray-700 border border-[#E9ECEF] bg-[#F8F9FA] py-2 px-4 mb-5 outline-none rounded-md capitalize"
              >
                <option value="o'rta">o'rta</option>
                <option value="past">past</option>
                <option value="yuqori">yuqori</option>
              </select>
            </div>
          </div>
        </form>
        <hr className="mb-4 border-gray-300" />
        <div className="flex justify-end gap-3">
          <button
            className="border border-[#E9ECEF] py-2 px-5 rounded-md cursor-pointer text-[15px] text-gray-500 transition-all duration-300 ease-in-out  hover:-translate-y-px"
            onClick={() => {
              closeModal();
            }}
          >
            Bekor qilish
          </button>

          {editId ? (
            <button
              form="modalForm"
              type="submit"
              className="bg-[#4F46E5] text-white py-2 px-5 rounded-md cursor-pointer text-[15px] transition-all duration-300 ease-in-out hover:bg-[#4338CA] hover:-translate-y-px"
            >
              Tahrirlash
            </button>
          ) : (
            <button
              form="modalForm"
              type="submit"
              className="bg-[#4F46E5] text-white py-2 px-5 rounded-md cursor-pointer text-[15px] transition-all duration-300 ease-in-out hover:bg-[#4338CA] hover:-translate-y-px"
            >
              Saqlash
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
