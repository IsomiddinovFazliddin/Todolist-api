import React from "react";
import { FaTasks, FaCheckCircle, FaClock, FaPlus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function Home({ plans }) {
  const total = plans.length;
  const completed = plans.filter((p) => p.completed).length;
  const pending = total - completed;

  const today = new Date().toISOString().split("T")[0];
  const todayTasks = plans.filter((p) => p.deadline === today);
  return (
    
    <div className="container mx-auto p-5">
        
      <h1 className="text-2xl font-bold mb-5">Salom! Bugungi vazifalaringiz</h1>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center">
          <FaTasks className="text-3xl text-blue-500 mb-2" />
          <span className="text-gray-500 text-sm">Jami vazifalar</span>
          <span className="font-bold text-xl">{total}</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center">
          <FaCheckCircle className="text-3xl text-green-500 mb-2" />
          <span className="text-gray-500 text-sm">Bajarilgan</span>
          <span className="font-bold text-xl">{completed}</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center">
          <FaClock className="text-3xl text-yellow-500 mb-2" />
          <span className="text-gray-500 text-sm">Bajarilmagan</span>
          <span className="font-bold text-xl">{pending}</span>
        </div>
        <div
          className="bg-red-500 text-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-red-600 w-full md:w-auto"
          onClick={() => clearCompletedTasks()} // clearCompletedTasks funksiyasini yozish kerak
        >
          <RiDeleteBin5Fill className="text-3xl mb-2" />
          <span className="font-bold text-sm">Bajarilganlarni tozalash</span>
        </div>
      </div>

      {/* Bugungi vazifalar */}
      <h2 className="text-xl font-semibold mb-3">
        Bugungi vazifalar ({todayTasks.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-lg mb-1">{task.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{task.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    task.level === "yuqori"
                      ? "bg-red-100 text-red-600"
                      : task.level === "past"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.level}
                </span>
                <span className="text-gray-400">{task.deadline}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            Bugun uchun vazifa yo‘q 🎉
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
