import { useState, useEffect, useRef } from "react";
import { user } from "../store/user"
import ProfilePic from "./profile_pic";
import { useChatStore } from "../store/chat";
import { formatTimestamp } from "../utils/time_formats";


const ChatWindow = ({ mode='user', data={}})=>{
    const isUser = user((state)=>state.user)
    const userId = isUser?.account_id;
    const chatRoomId = useChatStore((state) => state.chatRoomId);
    const chats = useChatStore((state) => state.chats);
    const chatMessages = chats[chatRoomId] || [];
    const endRef = useRef(null);
    const getChatroomDetails =  useChatStore((state) => state.selectedUser)
  
    // console.log('window-data:', data);
    // console.log('window-get-mes:', getChatroomDetails );

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);
    
    return(
        <div className="main-chat-window">
            <div className="user-property-detail">
                <div className="user-details">
                    <div className="profile-pic-wrapper">
                        <ProfilePic 
                        mode="not-default"
                        useImgSrc={mode==='user'? data?.agent_profile_img : 
                        getChatroomDetails?.user_profile_img_metadata?.secure_url}/>
                    </div>
                    <span>{mode==='user'? data?.posted_by : getChatroomDetails?.user_firstname}</span>
                </div>
                {
                     mode == 'agent' && getChatroomDetails && (
                        <div className="short-msg">
                            <p>{`Hello ${getChatroomDetails?.agent_firstname}, ${getChatroomDetails?.user_firstname} wants to chat with you concerning this property`}</p>
                        </div>
                     )
                }
                
                {
                    mode == 'agent' && getChatroomDetails &&(
                    <div className="property-details">
                        <div className="prop-img-wrapper">
                            <div className="img-holder">
                                <img src={getChatroomDetails?.image}/>
                            </div>
                        </div>
                        <div className="property-txt">
                            <p>{getChatroomDetails?.title}</p>
                            <p className="price-txt">{`₦${getChatroomDetails?.price}`}</p>
                        </div>
                    </div>
                    )
                }
            </div>

            <div className='display-msg'>
            <div>
                {
                    chatMessages?.map((message,index)=>(
                        <div key={index}>
                            <div>
                                {
                                    !message?.sender? (
                                        <div className="servers-socket-broadcastmsg">
                                            <p className="announcement">{typeof message === 'string' ? message : message?.message}</p>
                                            <p className="announcement">{
                                                // `${new Date(message?.timestamp).toLocaleDateString()} ${ new Date(message?.timestamp).toLocaleTimeString()}`
                                                message?.timestamp? formatTimestamp(message?.timestamp): null
                                                }
                                            </p>
                                        </div>
                                    ):(
                                        <div>
                                            {
                                                userId == message?.sender?.user_id ? (
                                                    <div className="sender-chat-wrapper">
                                                        <p className="msg-content">{typeof message === 'string' ? message : message?.message}</p>
                                                        <p className="msg-date">
                                                            {message?.timestamp? formatTimestamp(message?.timestamp): null} 
                                                        </p>
                                                    </div>
                                                ):(
                                                    <div className="receiver-chat-wrapper">
                                                        <p className="msg-content">{typeof message === 'string' ? message : message?.message}</p>
                                                        <p className="msg-date">
                                                            {/* {
                                                              `${new Date(message?.timestamp).toLocaleDateString()} ${ new Date(message?.timestamp).toLocaleTimeString()}`
                                                            } */}
                                                            {formatTimestamp(message?.timestamp)}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            <div ref={endRef} /> 
                            </div>
                           
                            {/* <small>
                                {
                                   
                                }
                            </small> */}
                        </div>
                    ))
                }
            </div>
        </div>
        </div> 
    )
}
export default ChatWindow