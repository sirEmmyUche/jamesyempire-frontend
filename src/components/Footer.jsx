import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

function Footer() {
    return (
      <footer>
        <div className="footer-main-holder">
            <div className="footer-main-holder-child-1">
                <div className="footer-main-holder-child-1-subchild-1">
                    <div className="img-holder">
                      <img src="/images/logo.jpg" alt="logo"/>
                    </div>
                    <h4>Jamesyempire</h4>
                </div>
                <div className="sub-child-2">
                    <h3>Products</h3>
                    <ul>
                        <li>Home</li>
                        <li>Cars</li>
                        <li>Jets</li>
                    </ul>
                </div>
                <div className="sub-child-3">
                    <h3>Resources</h3>
                    <ul>
                        <li>
                          <Link>Blogs</Link>
                        </li>
                        <li>
                          <Link>F&Q</Link>
                        </li>
                        <li>
                          <Link>Support</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-main-holder-child-2">
                <h5>copy 2025 JamesyEmpire. All right reserved</h5>
                <div className="icon-holder">
                    <div className="-icon">
                      <a href="https://www.facebook.com/share/1AFoDTpJKv/ " target="_blank" rel="noopener noreferrer">
                          <FaFacebookF size={20}/>
                      </a>
                    </div>
                    <div className="-icon">
                      <a href="https://www.instagram.com/jamesyempire.01?igsh=MTBzNjF5bWl6ajB1aA== " target="_blank" rel="noopener noreferrer">
                          <BsInstagram size={20}/>
                      </a>
                    </div>
                    <div className="-icon">
                      <a href="https://www.linkedin.com/company/jamesyempire/ " target="_blank" rel="noopener noreferrer">
                          <IoLogoLinkedin size={20}/>
                      </a>
                    </div>
                    <div className="-icon">
                      <a href="https://www.tiktok.com/@jamesyempire?_t=ZM-8wMD00La9by&_r=1 " target="_blank" rel="noopener noreferrer">
                          <FaTiktok size={20}/>
                      </a>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;