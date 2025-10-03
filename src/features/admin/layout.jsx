import Sidebar from "@/layout/sidebar-layout/Sidebar";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}

export default Layout;
