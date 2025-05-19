import { Outlet } from "react-router-dom";
import Nav from '../components/Navbar'
import Footer from "../components/Footer";

function PublicLayout() {
    return (
      <div>
        <Nav/>
        <Outlet /> {/* This is where nested routes render */}
        <Footer/>
      </div>
    );
  }
  
  export default PublicLayout;