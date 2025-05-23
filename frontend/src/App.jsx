import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TestPage from "./pages/TestPage/TestPage";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import Search from "./components/Search/Search";
// import DateSelect from "./components/Date/Date";
// import Listunionmember from "./pages/Manager/Listunionmember/Listunionmember";
// import Filter from "./components/Filter/Filter";
// import Add from "./components/Add/Add";
// import ActivityStatistics from "./pages/Manager/ActivityStatistics/ActivityStatistics";
// import Listevent from "./pages/Manager/Listevent/Listevent";
// import Message from "./pages/Manager/Message/Message";
// import Informationevent from "./pages/Manager/Informationevent/Informationevent";
// import Create_event from "./pages/Manager/Create_event/Create_event";
// import Listdocument from "./pages/Manager/Listdocument/Listdocument";
// import Listmember from "./pages/Manager/Listmember/Listmember";
// import Listaccount from "./pages/Admin/Listaccount/Listaccount";
// import AdminLayout from "./components/Adminlayout/Adminlayout";
// import UnionDetail from "./pages/Admin/Uniondetail/Uniondetail";
// import ChatwithAI from "./pages/Manager/ChatwithAI/ChatwithAI";

import "./App.css";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import Login from "./pages/Auth/Login/Login";
// import Home from "./pages/Manager/Home/Home";
// import Register from "./pages/Auth/Register/Register";
// import SidebarAdmin from "./components/SidebarAdmin/SidebarAdmin";
// import Listunion from "./pages/Admin/Listunion/Listunion";
import ManagerLayout from "./pages/Manager/ManagerLayout";
import News from "./pages/Manager/News/News";
import Listmember from "./pages/Manager/Listmember/Listmember";

function App() {


  return (
    <BrowserRouter>
      <>
        {/* <div className="search-date-wrapper">
  <Search />
  <Filter />
  <div className="no-flex">
    <Add />
  </div>
</div> */}

        {/* {role == "leader" && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <> */}
        {/* <Route path="/leader" element={<Informationevent />} />
        <Route path="/message" element={<Message />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />*/}
        {/* <Route path="/test" element={<TestPage />} />
        </>
        <Route path="/home" element={<Home />} />
        <Route path="/members/receiving" element={<Listunionmember />} />
        <Route
          path="/members/activity-statistic"
          element={<ActivityStatistics />}
        />
        <Route path="/listmember" element={<Listmember />} />
        <Route path="/events" element={<Listevent />} />
        <Route path="/events/:eventId" element={<Informationevent />} />
        <Route path="/documents" element={<Listdocument />} />

        <Route path="/message" element={<Message />} />
        <Route path="/ChatwithAI" element={<ChatwithAI />} />
        <Route path="/admin/*" element={role === 'admin' ? <AdminLayout /> : <Login />}>
          <Route path="listaccount" element={<Listaccount />} />
          <Route path="listunion" element={<Listunion />} />
          <Route path="uniondetail" element={<UnionDetail />} />
          {/* Thêm các route khác cho admin ở đây */}
        {/* </Route>    
      </Routes> */}
      </>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<ManagerLayout />}>
          <Route path="/home" element={<News />} />
          <Route path="/members" element={<Listmember/>} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
