import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Accounts from "./pages/Main/Admin/Accounts/Accounts";
import Layout from "./pages/Main/Layout";
import Chapters from "./pages/Main/Admin/Chapters/Chapters";
import AdminStatistic from "./pages/Main/Admin/Statistic/AdminStatistic";
import Members from "./pages/Main/Manager/Members/Members.jsx";
import Events from "./pages/Main/Manager/Events/Events.jsx";
import Documents from "./pages/Main/Manager/Documents/Documents.jsx";
import Chat from "./pages/Main/Chat/Chat.jsx";
import Statistic from "./pages/Main/Manager/Statistic/Statistic.jsx";
import News from "./pages/Main/Member/News/News.jsx";
import MyEvents from "./pages/Main/Member/MyEvents/MyEvents.jsx";
import MemberDocument from "./pages/Main/Member/Document/MemberDocument.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/qldv" element={<Layout />}>
            <Route path="chat" element={<Chat />} />

            <Route path="admin/dashboard" element={<AdminStatistic />} />
            <Route path="admin/accounts" element={<Accounts />} />
            <Route path="admin/chapters" element={<Chapters />} />

            <Route path="manager/members" element={<Members />} />
            <Route path="manager/events" element={<Events />} />
            <Route path="manager/documents" element={<Documents />} />
            <Route path="manager/statistic" element={<Statistic />} />

            <Route path="member/news" element={<News />} />
            <Route path="member/my-events" element={<MyEvents />} />
               <Route path="member/documents" element={<MemberDocument />} />
        
          </Route>
          <></>
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
