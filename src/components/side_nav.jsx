import {useState} from 'react'
import { Link} from "react-router-dom"
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdRealEstateAgent} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import ProfilePic from './profile_pic';
import { user } from '../store/user';

const SideNav =({isCollapsed})=>{
    const [menubar, setMenubar] = useState(false);
    const toggleMenubar = ()=> setMenubar(!menubar);
    const isUser = user((state)=>state.user);
    const firstname = isUser?.firstName;
    return(<aside>
        {
            !isCollapsed && (
            <div className='avatar-parent-wrapper'>
                <div className='avatar-holder'>
                    <ProfilePic/>
                </div>
                <span>{firstname}</span>
             </div>
            )
        }
        
        
        <ul className={menubar?"side-nav-responsive-holder":"--hide"} onClick={toggleMenubar }>
            <li>
                <Link to={'/dashboard'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <IoIosHome color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Home</p>}
                </Link>
            </li>
            <li>
                <Link to={'/listing'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <FaListUl color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Listings</p>}
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
                        <IoMdChatbubbles color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Chats</p>}
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/chat-list'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdRealEstateAgent color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Agents</p>}
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/settings'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <IoMdSettings color="#ffffff" size={20}/>
                    </span>
                    {!isCollapsed && <p>Settings</p>}
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