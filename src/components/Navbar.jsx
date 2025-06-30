import { Link } from "react-router-dom";
import { useState } from "react";
import { user } from "../store/user";

function Nav() {
    const [menubar, setMenubar] = useState(false);
    const toggleMenubar = ()=> setMenubar(!menubar);
    const isUser = user((state)=>state.user)
    const token = isUser.token;

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
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/listing'}>Listings</Link>
                </li>
                <li>
                    <Link to={'/'}>Blogs</Link>
                </li>
                {
                    token && (<li>
                    <Link to={'/dashboard'}>Resources</Link>
                </li>)
                }
            </ul>
            {
                !token && (
                <div className="auth-container">
                <ul>
                    <li className="login">
                        <Link to={'/login'}>Login</Link>
                    </li>
                    <li className="signup">
                        <Link to={'/signup'}>Sign up</Link>
                    </li>
                </ul>
            </div>
                )
            }
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