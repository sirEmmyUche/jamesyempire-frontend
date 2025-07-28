import { useState, useEffect,} from 'react';
import ChatList from "../components/chat_list"
import ChatWindow from "../components/chat_window"
import ChatMsgInput from "../components/chat_msg_input"
import useWebSocket from "../hooks/use_socket"
import { user } from "../store/user"
import { showToast } from '../utils/toast';
import { useChatStore } from '../store/chat';
import { baseUrl } from '../APIs';

const ChatListPage = ()=>{
    const isUser = user((state)=>state.user)
    const token = isUser.token || '';

    const {emit, on, off} = useWebSocket(`${baseUrl}`,{
         path: '/v1/ws',
            auth: {
                token: `Bearer ${token}` 
            }
        })
      

   useEffect(() => {
    const handleChatMessage = ({ payload }) => {
      // Get LATEST state directly from the store to break the dependency cycle.
      const currentChatRoomId = useChatStore.getState().chatRoomId;
      if (currentChatRoomId) {
        useChatStore.getState().addChats(currentChatRoomId, payload);
      }
    };

    const handleUserLeft = ({userLeftPayload}) => {
      if (userJoinedPayload?.room_id) {
        useChatStore.getState().addChats(userLeftPayload.room_id, userLeftPayload);
        // useChatStore.getState().setChatRoomId(userJoinedPayload.room_id);
      }
    };

    // const handleYouJoined = ({ joinedMsgPayLoad }) => {
    //   if (joinedMsgPayLoad?.room_id) {
    //     // console.log('you-joined')
    //     useChatStore.getState().addChats(joinedMsgPayLoad.room_id, joinedMsgPayLoad);
    //     useChatStore.getState().setChatRoomId(joinedMsgPayLoad.room_id);
    //   }
    // };

    const handleError = ({ message }) => {
      console.error('websocket error:', message);
      showToast(`${message}`, 'error')
    };

    on('chat-message', handleChatMessage);
    on('user-left', handleUserLeft);
    // on('you-joined', handleYouJoined);
    on('error', handleError);

    return () => {
      off('chat-message', handleChatMessage);
      off('user-left', handleUserLeft);
      // off('you-joined', handleYouJoined);
      off('error', handleError);
    };
  }, [on, off,]);


    const handleRequestToJoinChatroom = (chatroom_id)=>{
        // console.log('this is the chatroom_id:', chatroom_id)
        if(chatroom_id && chatroom_id != ''){
             emit('request-to-join-chat-room', {chatroom_id})
        }
        return   
    }
   

    const emitMessage = (message) => {
        const chatRoomId = useChatStore.getState().chatRoomId;
        if (!chatRoomId) return;
        const messagePayLoad = { message, room_id: chatRoomId };
        emit('chat-message', { messagePayLoad });
    };
    
    return(
        <section className="chat-listing-page">
            <h1>Chats</h1>
            <div className="parent-wrapper">
                <div className="chatlist-wrapper">
                    <ChatList 
                    requestToJoin={handleRequestToJoinChatroom}
                     />
                </div>
                <div className="msg-display-form-wrapper">
                    <div className="chat-window-wrapper">
                        <ChatWindow mode='agent'/>
                    </div>
                    <div className="msgInput-wrapper">
                        <ChatMsgInput emit={emitMessage}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChatListPage