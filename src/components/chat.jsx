import { useState, useEffect,} from 'react';
import {user} from '../store/user'
import { useChatStore } from '../store/chat';
import { IoCloseSharp } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
// import Draggable from 'react-draggable'
import ChatWindow from './chat_window';
import ChatMsgInput from './chat_msg_input';
import { baseUrl } from '../APIs';
import useWebSocket from '../hooks/use_socket';
import { showToast } from '../utils/toast';
import Button from './Button';
import { Link } from 'react-router-dom';


const Chat = ({propertyData={},isLoading})=>{
  const isUser = user((state) => state.user);
  const token = isUser?.token || '';
  const [chatWithAgentBtn, setChatWithAgentBtn] = useState(false);
  const [toggleChatWindow, setToggleChatWindow] = useState(true);
  let property_id = propertyData?.property_id;
  let agent_id = propertyData.account_id;

  const { emit, on, off } = useWebSocket(`${baseUrl}`, {
    path: '/v1/ws',
    auth: { token: `Bearer ${token}` },
  });

useEffect(() => {
    const handleChatMessage = ({ payload }) => {
      // Get LATEST state directly from the store to break the dependency cycle.
      const currentChatRoomId = useChatStore.getState().chatRoomId;
      if (currentChatRoomId) {
        useChatStore.getState().addChats(currentChatRoomId, payload);
      }
    };

    const handleYouJoined = ({ joinedMsgPayLoad }) => {
      if (joinedMsgPayLoad?.room_id) {
        useChatStore.getState().addChats(joinedMsgPayLoad.room_id, joinedMsgPayLoad);
        useChatStore.getState().setChatRoomId(joinedMsgPayLoad.room_id);
      }
    };

    const handleUserJoined = ({ userJoinedPayload }) => {
      if (userJoinedPayload?.room_id) {
        useChatStore.getState().addChats(userJoinedPayload.room_id, joinedMsgPayLoad);
        useChatStore.getState().setChatRoomId(userJoinedPayload.room_id);
      }
    };

    const handleError = ({ message }) => {
      console.error('websocket error:', message);
      //  showToast(`${message}`, 'error') 
    };

    on('chat-message', handleChatMessage);
    on('user-joined',  handleUserJoined);
    on('you-joined', handleYouJoined);
    on('error', handleError);

    return () => {
      off('chat-message', handleChatMessage);
      off('you-joined', handleYouJoined);
      off('user-joined',  handleUserJoined);
      off('error', handleError);
    };
    // The dependency array is now stable. This effect runs only once on mount.
  }, [on, off,]);

  const createChatroom = () => {
    if (property_id && agent_id) {
      setChatWithAgentBtn(true);
      emit('create-chat-room', { property_id, agent_id });
    }
  };

  const handleToggleChatWindow = () => {
    setToggleChatWindow(!toggleChatWindow);
  };

  const emitMessage = (message) => {
    const chatRoomId = useChatStore.getState().chatRoomId;
    if (!chatRoomId) return;
    const messagePayLoad = { message, room_id: chatRoomId };
    emit('chat-message', { messagePayLoad });
  };
  
   
    return(
        <section id='chat'>
            {
                token? (
                <>
                    {
                        !chatWithAgentBtn? (
                        <>
                          {
                             isUser?.account_id !== agent_id &&
                             <div onClick={createChatroom} className='chat-with-agent-btn'>
                              <Button
                              type='button'
                              text={'Chat with agent'}/>
                            </div>
                          }
                            
                        </>) 
                        :

                        (<>
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
                                <div className='msg-display-form-wrapper'>
                                    <ChatWindow mode='user'
                                    data={propertyData}/>
                                    <ChatMsgInput emit={emitMessage}/>
                                </div>
                            </div>
                        </>
                        )
                    }
                </>
                ) : (
                    <>
                        <div className='login-to-chat-wrapper'>
                          <div className='login-to-chat-content'>
                            <Link to={'/login'}>
                                Login to chat.
                          </Link>
                          </div>
                        </div>
                    </>
                )
            }
            
        </section>
    )
}

export default Chat
