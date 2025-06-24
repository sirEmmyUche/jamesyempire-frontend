import { useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideNav from '../components/side_nav'
import Footer from "../components/Footer";
import Fallback from "../components/fallback";

function DashboardLayout() {
    const [isCollapsed, setisCollapsed] = useState(false)
    const toggleSidebar=()=>{
        setisCollapsed(!isCollapsed)
    }
    return (
      <div className={`dashboard-grid-layout ${isCollapsed?'collapsed':''}`}>
        <div className="dashboard-side-nav">
            <button onClick={toggleSidebar}>Collapse</button>
            <SideNav isCollapsed={isCollapsed}/>
        </div>
        <div className="dashboard-main">
            <Suspense fallback={<Fallback/>}>
                <Outlet /> {/* This is where nested routes render */}
            </Suspense>
        </div>
        <div className="dashboard-footer">
              <Footer/>
        </div>   
      </div>
    );
  }
  
  export default DashboardLayout;