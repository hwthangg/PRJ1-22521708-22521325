import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar />
      <div style={{ marginLeft: "300px", flex: 1, overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}
