import { useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideNav from '../components/side_nav'
import Footer from "../components/Footer";
import Fallback from "../components/fallback";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

function DashboardLayout() {
    const [isCollapsed, setisCollapsed] = useState(false)
    const toggleSidebar=()=>{
        setisCollapsed(!isCollapsed)
    }
    return (
      <div className={`dashboard-grid-layout ${isCollapsed?'collapsed':''}`}>
        <div className="dashboard-side-nav">
            <div onClick={toggleSidebar} className="collapse-side-nav">
                {
                  isCollapsed?<FaLongArrowAltRight color="#ffffff" size={20}/>
                  
                  :<FaLongArrowAltLeft color="#ffffff" size={20}/>
                }
            </div>
            <SideNav isCollapsed={isCollapsed}/>
        </div>
        <div className="dashboard-main">
            <Suspense fallback={<Fallback/>}>
                <Outlet />
            </Suspense>
        </div>
        <div className="dashboard-footer">
              <Footer/>
        </div>   
      </div>
    );
  }
  
  export default DashboardLayout;