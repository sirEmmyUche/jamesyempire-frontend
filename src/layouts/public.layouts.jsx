import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from '../components/Navbar'
import Footer from "../components/Footer";
import Fallback from "../components/fallback";

function PublicLayout() {
    return (
      <div>
        <Nav/>
        <Suspense fallback={<Fallback/>}>
            <Outlet /> {/* This is where nested routes render */}
        </Suspense>
        <Footer/>
      </div>
    );
  }
  
  export default PublicLayout;