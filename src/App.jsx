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
  const [navbarTitle, setNavbarTitle] = useState("Mening vazifalarim");
  const [aside, setAside] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar");
      return saved !== null ? JSON.parse(saved) : false;
    } catch (error) {
      return false;
    }
  });
  const [modal, setModal] = useState(false);
  //   const [loader, setLoader] = useState(false);
  const [plans, setPlans] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState(null);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const getData = () => {
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
    getData();
  }, []);

  const closeModal = () => {
    setModal(false);
    setNewTitle("");
    setNewDesc("");
    setNewDate(null);
    setEditId(null);
  };

  const addPlans = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: newTitle,
      description: newDesc,
      status: "Not Started",
      deadline: newDate,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://todopage.pythonanywhere.com/todo/add/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getData();
        closeModal();
      })
      .catch((error) => console.error(error));
  };

  const getObj = (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://todopage.pythonanywhere.com/todos/${id}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setNewTitle(result.title);
        setNewDesc(result.description);
        setNewDate(result.deadline);
      })
      .catch((error) => console.error(error));
  };

  const updatePlans = () => {
    console.log(newTitle, newDesc, newDate);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: newTitle,
      description: newDesc,
      status: "Not Started",
      deadline: "2026-02-19",
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://todopage.pythonanywhere.com/todos/${editId}/`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getData();
        closeModal();
      })
      .catch((error) => console.error(error));
  };

  const delPlans = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`https://todopage.pythonanywhere.com/todos/${id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((error) => console.error(error));
  };

  const filterPlans = plans.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* {loader ? (
          <div className="loader w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,5)] z-50">
            <img src="https://wallpapercave.com/wp/wp2730731.gif" alt="" />
          </div>
        ) : (
          ""
        )} */}
        <Navbar
          navbarTitle={navbarTitle}
          aside={aside}
          setAside={setAside}
          setSearch={setSearch}
        />

        {modal ? (
          <Modal
            setModal={setModal}
            newTitle={newTitle}
            newDesc={newDesc}
            newDate={newDate}
            setNewTitle={setNewTitle}
            setNewDesc={setNewDesc}
            setNewDate={setNewDate}
            addPlans={addPlans}
            closeModal={closeModal}
            editId={editId}
            updatePlans={updatePlans}
          />
        ) : (
          ""
        )}

        <div className="flex flex-1 pt-20 ">
          <Aside
            setNavbarTitle={setNavbarTitle}
            aside={aside}
            setAside={setAside}
          />
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
                      plans={filterPlans}
                      delPlans={delPlans}
                      setModal={setModal}
                      setEditId={setEditId}
                      getObj={getObj}
                    />
                  }
                />
                <Route path="/checktasks" element={<CheckTasks />} />
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
