import { useState } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideNav from '../components/side_nav'
import Footer from "../components/Footer";
import Fallback from "../components/fallback";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Logo from '../components/logo'

function DashboardLayout() {
    const [isCollapsed, setisCollapsed] = useState(false)
    const toggleSidebar=()=>{
        setisCollapsed(!isCollapsed)
    }
    return (
      <div className={`dashboard-grid-layout ${isCollapsed?'collapsed':''}`}>
        <div className="dashboard-side-nav">
            <SideNav isCollapsed={isCollapsed}/>
            <div  className="collapse-side-nav">
                <div className="parent-logo-toggle-icon">
                  {!isCollapsed &&  <div className="logo-holder"><Logo linkTo={'/dashboard'}/></div>}
                 
                  <div onClick={toggleSidebar}>
                    { isCollapsed?<FaLongArrowAltRight color="#ffffff" size={20}/>
                      :
                      <FaLongArrowAltLeft color="#ffffff" size={20}/>
                    }
                  </div>
                </div>
                
            </div>
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