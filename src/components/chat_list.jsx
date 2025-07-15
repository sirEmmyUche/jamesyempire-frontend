import Skeleton from 'react-loading-skeleton'
import ProfilePic from './profile_pic'
import { showToast } from '../utils/toast'
import {useQuery,keepPreviousData} from '@tanstack/react-query'
import { getMyChatRequest } from '../APIs'
import { user } from '../store/user'
import { useChatStore } from '../store/chat'
import { formatTimestamp } from '../utils/time_formats'

const ChatList = ({requestToJoin,})=>{
    const isUser = user((state)=>state.user)
    const token = isUser.token || '';
    const { data, error, isLoading,} = useQuery({
            queryKey: ['chatlist',],
            queryFn:async()=> getMyChatRequest(token),
            placeholderData: keepPreviousData,
          });

    if(data && !data.success) {
            const message = data.error?.message || 'unable to show chats'
            showToast(message,'info')
        } 

    if(error){
        console.error('error trying to fetch chatlist',error)
         showToast('something went wrong, please try later','error')
    }
    // console.log(data)

    const fnUpdateChatroomDetails = (item)=>{
         console.log('this is the item:',item)
         useChatStore.getState().setChatRoomId(item.chatroom_id);
         useChatStore.getState().setSelectedUser(item);

         // call the request to join fn
        requestToJoin(useChatStore.getState().chatRoomId)
    }
    return(
        <section id='chat-list'>
              {/* <ProfilePic/> */}
            {
                data?.chatlist?.map((item,index)=>( //use item.id as key props instead of index
                    <div className='chat-list-item' 
                        onClick={()=>fnUpdateChatroomDetails(item)} 
                        key={item.id}>
                        {/* <div className={item.status =='active'?'chat-is-active':'chat-is-notActive'}></div> */}
                        <div className={`chat-profile-pic-wrapper ${item.status =='active'?'chat-is-active':'chat-is-notActive'}`}>
                            <ProfilePic isLoading={isLoading} 
                            useImgSrc={item?.user_profile_img}
                            mode='user-avi'/>
                        </div>
                        <div className='chat-list-content'>
                            <h2>{isLoading? <Skeleton width={'50%'}/>:item.user_firstname}</h2>
                            <h3>{isLoading?<Skeleton width={'100%'} />:item.title}</h3>
                            <p>
                                {
                                isLoading?<Skeleton width={150} />:
                                // `${new Date(item.created_at).toLocaleDateString()} ${new Date(item.created_at).toLocaleTimeString()}`
                                 formatTimestamp(item?.created_at)
                            }
                            </p>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default ChatList  