import { useEffect, useState } from "react";
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

const BASE = "https://todopage.pythonanywhere.com";

function App() {
  const [navbarTitle, setNavbarTitle] = useState("Mening vazifalarim");
  const [aside, setAside] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar");
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  const [modal, setModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState(null);
  const [newLevel, setNewLevel] = useState("o'rta");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // API da level maydoni yo'q, localStorage da saqlanadi
  const getLevels = () => {
    try {
      return JSON.parse(localStorage.getItem("taskLevels")) || {};
    } catch {
      return {};
    }
  };

  const saveLevel = (id, level) => {
    const levels = getLevels();
    levels[id] = level;
    localStorage.setItem("taskLevels", JSON.stringify(levels));
  };

  const removeLevel = (id) => {
    const levels = getLevels();
    delete levels[id];
    localStorage.setItem("taskLevels", JSON.stringify(levels));
  };

  const getData = () => {
    fetch(`${BASE}/todos/`)
      .then((r) => r.json())
      .then((result) => {
        const levels = getLevels();
        setPlans(result.map((item) => ({ ...item, level: levels[item.id] || "o'rta" })));
      })
      .catch(console.error);
  };

  useEffect(() => {
    getData();
  }, []);

  const closeModal = () => {
    setModal(false);
    setNewTitle("");
    setNewDesc("");
    setNewDate(null);
    setNewLevel("o'rta");
    setEditId(null);
  };

  const addPlans = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ title: newTitle, description: newDesc, status: "Not Started", deadline: newDate });

    fetch(`${BASE}/todo/add/`, { method: "POST", headers: myHeaders, body: raw, redirect: "follow" })
      .then((r) => r.json())
      .then((result) => {
        saveLevel(result.id, newLevel);
        getData();
        closeModal();
      })
      .catch(console.error);
  };

  const getObj = (id) => {
    fetch(`${BASE}/todos/${id}/`)
      .then((r) => r.json())
      .then((result) => {
        setNewTitle(result.title);
        setNewDesc(result.description);
        setNewDate(result.deadline);
        const levels = getLevels();
        setNewLevel(levels[id] || "o'rta");
      })
      .catch(console.error);
  };

  const updatePlans = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ title: newTitle, description: newDesc, status: "Not Started", deadline: newDate });

    fetch(`${BASE}/todos/${editId}/`, { method: "PUT", headers: myHeaders, body: raw, redirect: "follow" })
      .then((r) => r.json())
      .then(() => {
        saveLevel(editId, newLevel);
        getData();
        closeModal();
      })
      .catch(console.error);
  };

  const toggleStatus = (item) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      title: item.title,
      description: item.description,
      status: item.status === "Completed" ? "Not Started" : "Completed",
      deadline: item.deadline,
    });

    fetch(`${BASE}/todos/${item.id}/`, { method: "PUT", headers: myHeaders, body: raw, redirect: "follow" })
      .then((r) => r.json())
      .then(() => getData())
      .catch(console.error);
  };

  const clearCompletedTasks = () => {
    const completed = plans.filter((p) => p.status === "Completed");
    Promise.all(
      completed.map((item) => {
        removeLevel(item.id);
        return fetch(`${BASE}/todos/${item.id}/`, { method: "DELETE", redirect: "follow" });
      })
    ).then(() => getData());
  };

  const delPlans = (id) => {
    fetch(`${BASE}/todos/${id}/`, { method: "DELETE", redirect: "follow" })
      .then(() => {
        removeLevel(id);
        getData();
      })
      .catch(console.error);
  };

  const filterPlans = plans.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "completed" && item.status === "Completed") ||
      (filter === "notstarted" && item.status === "Not Started");
    return matchSearch && matchFilter;
  });

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar
          navbarTitle={navbarTitle}
          aside={aside}
          setAside={setAside}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {modal && (
          <Modal
            newTitle={newTitle}
            newDesc={newDesc}
            newDate={newDate}
            newLevel={newLevel}
            setNewTitle={setNewTitle}
            setNewDesc={setNewDesc}
            setNewDate={setNewDate}
            setNewLevel={setNewLevel}
            addPlans={addPlans}
            closeModal={closeModal}
            editId={editId}
            updatePlans={updatePlans}
          />
        )}

        <div className="flex flex-1 pt-20">
          <Aside setNavbarTitle={setNavbarTitle} aside={aside} setAside={setAside} />
          <main className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${aside ? "ml-20" : "ml-64"}`}>
            <div className="pt-3 pl-5">
              <button
                className="flex items-center gap-3 px-5 py-2 bg-[#4F46E5] text-white rounded-lg text-[13px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#4338CA] hover:-translate-y-px"
                onClick={() => setModal(true)}
              >
                <FaPlus /> Vazifa qo'shish
              </button>
            </div>
            <div className="flex-1 p-5">
              <Routes>
                <Route path="/" element={<Home plans={plans} clearCompletedTasks={clearCompletedTasks} />} />
                <Route path="/alltasks" element={<AllTasks plans={filterPlans} delPlans={delPlans} setModal={setModal} setEditId={setEditId} getObj={getObj} toggleStatus={toggleStatus} />} />
                <Route path="/checktasks" element={<CheckTasks plans={filterPlans} delPlans={delPlans} setModal={setModal} setEditId={setEditId} getObj={getObj} toggleStatus={toggleStatus} />} />
                <Route path="/nochecktasks" element={<NoCheckTasks plans={filterPlans} delPlans={delPlans} setModal={setModal} setEditId={setEditId} getObj={getObj} toggleStatus={toggleStatus} />} />
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
