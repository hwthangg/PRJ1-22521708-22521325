import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import DateSelect from "./components/Date/Date";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Listunionmember from "./pages/Leader/Listunionmember/Listunionmember";
import Filter from "./components/Filter/Filter";
import Add from "./components/Add/Add";
import ActivityStatistics from "./pages/Leader/ActivityStatistics/ActivityStatistics";
import Listevent from "./pages/Leader/Listevent/Listevent";
import Message from "./pages/Leader/Message/Message";
import Informationevent from "./pages/Leader/Informationevent/Informationevent";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* <div className="search-date-wrapper">
  <Search />
  <Filter />
  <div className="no-flex">
    <Add />
  </div>
</div> */}

      <Routes>
        <Route path="/" element={<Informationevent />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
