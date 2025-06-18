import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { useEffect } from "react";
import { connectSocket } from "../../../utils/socket";
import ChatBot from "../../components/Chatbot/Chatbot";

export default function Layout() {

  return (
    <div style={{ display: "flex", height: "100vh", zIndex: 2 }}>
      <SideBar />
      <div style={{ marginLeft: "300px", flex: 1, overflowY: "auto" , zIndex:0}}>
        <ChatBot/>
        <Outlet />
      </div>
    </div>
  );
}
