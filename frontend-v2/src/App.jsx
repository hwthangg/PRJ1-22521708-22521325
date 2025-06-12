import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

// Các import khác
import "./App.css";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Accounts from "./pages/Main/Admin/Accounts/Accounts";
import Layout from "./pages/Main/Layout";
import Chapters from "./pages/Main/Admin/Chapters/Chapters";
import News from "./pages/Main/Manager/News/News";
import Members from "./pages/Main/Manager/Members/Members";
import Events from "./pages/Main/Manager/Events/Events";
import Statistic from "./pages/trash/Statistic/Statistic";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/qldv" element={<Layout />}>
            <Route path="admin/accounts" element={<Accounts />} />
            <Route path="admin/chapters" element={<Chapters />} />
            <Route path="manager/news" element={<News />} />
            <Route path="manager/members" element={<Members />} />
            <Route path="manager/events" element={<Events />} />
             <Route path="statistic" element={<Statistic />} />
          </Route>
          <>
          </>
        </Routes>
      </BrowserRouter>

      {/* ToastContainer nằm ngoài BrowserRouter để luôn sẵn sàng hiển thị */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
