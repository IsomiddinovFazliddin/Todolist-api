import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllTasks from "./pages/AllTasks";
import CheckTasks from "./pages/CheckTasks";
import NoCheckTasks from "./pages/NoCheckTasks";
import Settings from "./pages/Settings";
import { FaPlus } from "react-icons/fa";
import Modal from "./components/Modal";

function App() {
  const [title, setTitle] = useState("Mening vazifalarim");
  const [aside, setAside] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar");
      return saved !== null ? JSON.parse(saved) : false;
    } catch (error) {
      return false;
    }
  });
  const [modal, setModal] = useState(false);
  const [plans, setPlans] = useState([]);

  const [edit, setEdit] = useState(null);

  const getData = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://todopage.pythonanywhere.com/todos/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlans(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    localStorage.setItem("sidebar", JSON.stringify(aside));
  }, [aside]);

  useEffect(() => {
    getData();
  }, []);

  const addToCard = (item) => {
    const obj = {
      id: plans.length + 1,
      title: item.title,
      description: item.description,
      deadline: item.deadline || new Date().toISOString().split("T")[0],
      level: item.level || "o'rta",
    };
    setPlans([...plans, obj]);
    setModal(false);
  };

  const updateTask = (updatedItem) => {
    const update = plans.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    setPlans(update);
    setEdit(null);
    setModal(false);
  };

  const del = (id) => {
    const filterDta = plans.filter((item) => item.id !== id);
    setPlans(filterDta);
  };

  const filterPlans = (status) => {
    if (status === "checked") {
      return plans.filter((item) => item.checked);
    } else if (status === "unchecked") {
      return plans.filter((item) => !item.checked);
    }
    return plans;
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar title={title} aside={aside} setAside={setAside} />

        {modal ? (
          <Modal
            modal={modal}
            setModal={setModal}
            addToCard={addToCard}
            edit={edit}
            setEdit={setEdit}
            updateTask={updateTask}
          />
        ) : (
          ""
        )}

        <div className="flex flex-1 pt-20 ">
          <Aside setTitle={setTitle} aside={aside} setAside={setAside} />
          <main
            className={`flex flex-col flex-1 transition-all duration-300 ease-in-out   ${aside ? "ml-20" : "ml-64"}`}
          >
            <div className="pt-3 pl-5">
              <button
                className="flex items-center gap-3 px-5 py-2 bg-[#4F46E5] text-white rounded-lg text-[13px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4338CA] hover:-translate-y-px"
                onClick={() => {
                  setModal(true);
                }}
              >
                <FaPlus /> Vazifa qo'shish
              </button>
            </div>
            <div className="flex-1 p-5 ">
              <Routes>
                <Route path="/" element={<Home plans={plans} />} />
                <Route
                  path="/alltasks"
                  element={
                    <AllTasks
                      plans={plans}
                      setModal={setModal}
                      del={del}
                      setEdit={setEdit}
                    />
                  }
                />
                <Route path="/checktasks" element={<CheckTasks filterPlans={filterPlans} />} />
                <Route path="/nochecktasks" element={<NoCheckTasks />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
