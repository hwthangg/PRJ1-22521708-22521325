import React from 'react'
import { Outlet } from "react-router-dom";
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
function AdminLayout() {
  return (
    <>
    <div style={{display:'flex', flexDirection:'row'}}>
<SideBar/>
    <Outlet/>

    </div>
    
    </>
    

  )
}

export default AdminLayout