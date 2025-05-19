import { Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
    const [menubar, setMenubar] = useState(false);
    const toggleMenubar = ()=> setMenubar(!menubar);

    return (
      <nav>
        <div className="logo-container">
            <div className="img-holder">
                <img src="/images/logo.jpg" alt="logo"/>
            </div>
            <h5>
                <Link to={'/'}>JamesyEmpire</Link>
            </h5>
        </div>
        <div className={menubar?"nav-responsive-holder":"--hide"}>
            <ul className="nav-ul-container">
                <li>
                    <Link to={'/'}>Listings</Link>
                </li>
                <li>
                    <Link to={'/'}>Blogs</Link>
                </li>
            </ul>
            <div className="auth-container">
                <ul>
                    <li className="login">
                        <Link to={'/'}>Login</Link>
                    </li>
                    <li className="signup">
                        <Link to={'/'}>Sign up</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className={!menubar?"hamburger":"cross-hamburger"} onClick={toggleMenubar}>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </nav>
    );
  }
  
  export default Nav;