import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function Modal({ modal, setModal, addToCard, edit, setEdit, updateTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [level, setLevel] = useState("o'rta");

  useEffect(() => {
    if (edit) {
      setTitle(edit.title || "");
      setDesc(edit.description || "");
      setDate(edit.deadline ? edit.deadline.split("T")[0] : "");
      setLevel(edit.level || "o'rta");
    } else {
      setTitle("");
      setDesc("");
      setDate("");
      setLevel("o'rta");
    }
  }, [edit, modal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description: desc, deadline: date, level };

    if (!title.trim()) return;

    if (edit) {
      updateTask({ ...edit, ...task });
    } else {
      addToCard(task);
    }

    setTitle("");
    setDesc("");
    setDate("");
    setLevel("o'rta");
    setEdit(null);
    setModal(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-20">
      <div className={`w-105 bg-white rounded-lg p-5 relative`}>
        <h2 className="font-semibold text-[20px] mb-4">
          {edit ? "Vazifani tahrirlash" : "Yangi vazifa qo'shish"}
        </h2>
        <hr className="mb-4 border-gray-300" />
        <IoClose
          className="absolute top-3 right-3 text-[18px] text-gray-500 cursor-pointer"
          onClick={() => {
            setEdit(null);
            setModal(false);
          }}
        />
        <form
          id="modalForm"
          action=""
          className="grid w-full"
          onSubmit={handleSubmit}
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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label
            className="font-medium text-[14px] text-gray-900 mb-2.5"
            htmlFor=""
          >
            Tavsif
          </label>
          <textarea
            name=""
            id=""
            placeholder="Vazifa haqida batafsil ma'lumot"
            className="w-full text-[14px] text-gray-700 border border-[#E9ECEF] bg-[#F8F9FA] py-2 px-4 mb-5 outline-none rounded-md"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
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
                type="date"
                className="w-full text-[14px] text-gray-700 border border-[#E9ECEF] bg-[#F8F9FA] py-2 px-4 mb-5 outline-none rounded-md "
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
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
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
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
              setModal(false);
              setEdit(null);
            }}
          >
            Bekor qilish
          </button>
          <button
            form="modalForm"
            type="submit"
            className="bg-[#4F46E5] text-white py-2 px-5 rounded-md cursor-pointer text-[15px] transition-all duration-300 ease-in-out hover:bg-[#4338CA] hover:-translate-y-px"
          >
            {edit ? "Saqlash" : "Qo'shish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
