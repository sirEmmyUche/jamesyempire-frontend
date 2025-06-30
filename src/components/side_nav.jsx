import {useState} from 'react'
import { Link} from "react-router-dom"
import { MdOutlineFileUpload } from "react-icons/md";

const SideNav =({isCollapsed})=>{
    const [menubar, setMenubar] = useState(false);
    const toggleMenubar = ()=> setMenubar(!menubar);
    return(<aside>
        <div>
            Profile
        </div>
        <ul className={menubar?"side-nav-responsive-holder":"--hide"} onClick={toggleMenubar }>
            <li>
                <Link to={'/dashboard'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdOutlineFileUpload color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Home</p>}
                </Link>
            </li>
            <li>
                <Link to={'/listing'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdOutlineFileUpload color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Properties</p>}
                </Link>
            </li>
             <li>
                <Link to={'/dashboard/upload'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdOutlineFileUpload color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Upload</p>}
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/chat-list'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdOutlineFileUpload color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Chats</p>}
                </Link>
            </li>
        </ul>
        <div className={!menubar?"hamburger":"cross-hamburger"} onClick={toggleMenubar}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </aside>)
}

export default SideNav