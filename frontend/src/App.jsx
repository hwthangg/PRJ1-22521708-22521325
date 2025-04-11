import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import DateSelect from "./components/Date/Date";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Listunionmember from "./pages/Admin/Listunionmember/Listunionmember";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="search-date-wrapper">
        <Search />
        <DateSelect />
      </div>

      <Routes>
        <Route path="/" element={<Listunionmember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
