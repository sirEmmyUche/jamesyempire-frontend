import {useState} from 'react'
import { Link} from "react-router-dom"
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdRealEstateAgent} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoMdLogOut } from 'react-icons/io';
import ProfilePic from './profile_pic';
import { user } from '../store/user';
import UseModal from "./useModal"
import Button from "./Button"
import Logo from './logo';

const SideNav =({isCollapsed})=>{
    const [menubar, setMenubar] = useState(false);
    const toggleMenubar = ()=> setMenubar(!menubar);
    const isUser = user((state)=>state.user);
    const firstname = isUser?.firstname;
    const [isOpen, setIsOpen] = useState(false);
    const iconSize = 20

     function openModal() {
    setIsOpen(true);
    }

    function closeModal() {
    setIsOpen(false);
    }

    const logOut = user((state)=>state.clearUser);

    return(<aside>

        <div className='logo-holder-wrapper'>
            <Logo linkTo={'/dashboard'}/>
        </div>
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
                        <IoIosHome color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Home</p>}
                </Link>
            </li>
            <li>
                <Link to={'/listing'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <FaListUl color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Listings</p>}
                </Link>
            </li>
             <li>
                <Link to={'/dashboard/upload'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdOutlineFileUpload color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Upload</p>}
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/chat-list'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <IoMdChatbubbles color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Chats</p>}
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/chat-list'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <MdRealEstateAgent color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Agents</p>}
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/settings'}>
                    <span className={`${isCollapsed?'expand':''}`}>
                        <IoMdSettings color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Settings</p>}
                </Link>
            </li>
            <li onClick={openModal} className='log-out'>
                {/* <Link to={'/dashboard/settings'}> */}
                    <span className={`${isCollapsed?'expand':''}`}>
                        <IoMdLogOut color="#ffffff" size={iconSize}/>
                    </span>
                    {!isCollapsed && <p>Log out</p>}
                {/* </Link> */}
            </li>
        </ul>
        <UseModal isOpen={isOpen} onRequestClose={closeModal}>
                <div className="delete-resource-group">
                    <h3>Are you sure you want to log out?</h3>
                    <div className="delete-resource-btn-wrapper">
                        <div className="cancel-delete-btn">
                            <Button text={'Cancle'} 
                            onClick={closeModal}/>
                        </div>
                        <div className="delete-btn">
                            <Button text={'Log out'}
                            // isLoading={isLoading}
                            // iconLeft={<IoMdLogOut size={20} color="#ffffff"/>}
                            onClick={()=>logOut()}/>
                        </div>
                    </div>
                </div>
            </UseModal>
        <div className={!menubar?"hamburger":"cross-hamburger"} onClick={toggleMenubar}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </aside>)
}

export default SideNav