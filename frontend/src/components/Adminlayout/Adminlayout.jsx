// src/components/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
import './Adminlayount.module.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
