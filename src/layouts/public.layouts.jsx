import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Nav from '../components/Navbar'
import Footer from "../components/Footer";

function PublicLayout() {
    return (
      <div>
        <Nav/>
        <Suspense>
            <Outlet /> {/* This is where nested routes render */}
        </Suspense>
        <Footer/>
      </div>
    );
  }
  
  export default PublicLayout;