import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";

function App() {
  return (
  <BrowserRouter>
  <Header/> 
  <Search/>
    <Routes>
    <Route path="/" element={<TestPage/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>)

}

export default App
