import React from 'react'
import { Outlet } from "react-router-dom";
import ManagerSideBar from '../../components/ManagerSideBar/ManagerSideBar';

function ManagerLayout() {
  return (
    <>
    <div style={{display:'flex', flexDirection:'row'}}>
<ManagerSideBar/>
    <Outlet/>

    </div>
    
    </>
    

  )
}

export default ManagerLayout