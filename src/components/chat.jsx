import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import {user} from '../store/user'
import useWebSocket from '../hooks/use_socket';
import Button from './Button';
import {useForm,useWatch} from 'react-hook-form'
import { IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import Draggable from 'react-draggable'

const Chat = ()=>{
    const isUser = user((state)=>state.user)
    const token = isUser.token || '';
    const [chatMessages, setChatMessages] = useState([]) 
    const [toggleChatWindow, setToggleChatWindow] = useState(true)
    const {register, handleSubmit, reset,control,
        formState: { errors, isDirty,},} = useForm();
     const watchMessageField = useWatch({ control, name: "message" });
    // const [connectionError, setConnectionError] = useState('');
    const {connected, emit, on} = useWebSocket('http://localhost:3000',{
         path: '/v1/ws',
            // transports: ['websocket'], //optional, socket automatically decides the best option to use
            auth: {
                token: `Bearer ${token}` 
            }
        })

      
        useEffect(()=>{
              emit('join-room')
        },[]);

        useEffect(()=>{
             on('chat-message',({message})=>{
            // console.log('is repeated')
            setChatMessages((prevMessages)=>[...prevMessages,message])
        })
        },[])

    const handleToggleChatWindow = ()=>{
        setToggleChatWindow(!toggleChatWindow)
    }
    

    const sendMessage = async(data)=>{
        // console.log(data)
        if(isDirty == false){
            //  console.log('isDirty:',isDirty)
              reset();
            return;
        }else if(watchMessageField == ''){
            // console.log('watchMessageField :',watchMessageField )
             reset();
            return;
        }
        const message = data.message.trim();
        if(message == ''){
             reset();
            return
        }
         emit('chat-message', {message})
        reset();
    }

    return(
        <section id='chat'>
            <div className='hide-chat-window-btn-wrapper'>
                <div className='live-chat-header-wrapper'>
                    <h1>Live Chat</h1>
                </div>
                <div onClick={handleToggleChatWindow} className='icon-wrapper'>
                    {toggleChatWindow ?<IoCloseSharp color='#ffffff' size={20}/>
                     : <FaMinus color='#ffffff' size={20}/>}
                </div>
            </div>
            <div className={toggleChatWindow?'chat-window': 'hide-chat-area'}>
                <div className='display-msg'>
                    <div>
                    {
                        chatMessages.map((message,index)=>(
                            <span key={index}>
                                {message}
                            </span>
                        ))
                    }
                    </div>
                </div>
                <form onSubmit={handleSubmit(sendMessage)}>
                    <div>
                        <div className='chat-txtmsg-area'>
                            <textarea placeholder='type message'{...register('message',)}/>
                        </div>
                        <div className='btn-wrapper'>
                            <Button type='submit'>
                                <IoMdSend />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Chat

