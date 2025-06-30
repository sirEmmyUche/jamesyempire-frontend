import data from '../../chats.json'
import Skeleton from 'react-loading-skeleton'
import ProfilePic from './profile_pic'

const ChatList = ()=>{
      const isLoading = false
    return(
        <section id='chat-list'>
            <h1>Chats</h1>
              {/* <ProfilePic/> */}
            {
                data?.chats?.map((item)=>(
                    <div className='chat-list-item'>
                        <div className={isLoading?'chat-is-active':'chat-is-notActive'}></div>
                        <div className='chat-profile-pic-wrapper'>
                            <ProfilePic isLoading={isLoading}/>
                        </div>
                        <div className='chat-list-content'>
                            <h2>{isLoading? <Skeleton width={'50%'}/>:item.sender_info.firstname}</h2>
                            <h3>{isLoading?<Skeleton width={'100%'} />:item.property_info.title}</h3>
                            <p>{isLoading?<Skeleton width={150} />:item.created_at}</p>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default ChatList