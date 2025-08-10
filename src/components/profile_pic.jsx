import Skeleton from 'react-loading-skeleton';
import {user} from '../store/user'

const ProfilePic = ({mode = 'default', useImgSrc, isLoading})=>{
    const isUser = user((state)=>state.user);
    // console.log(isUser)
    const profilePic = isUser?.profile_pic?.secure_url;
    let imgSrc;
    let profilePicPlaceholder = "/images/user-profile-pic-placeholder.png"

    if(!profilePic && !useImgSrc) imgSrc = profilePicPlaceholder

    if(profilePic == '' && mode == 'default'){
        imgSrc = profilePicPlaceholder
    }else if(profilePic && profilePic !== '' && mode == 'default'){
       imgSrc = profilePic
    }
    if(mode !== 'default' && useImgSrc && useImgSrc !== '' ){
        imgSrc = useImgSrc
    }
    return(
        <div id='profile-pics'>
            {
                isLoading?<Skeleton circle width={'100%'} height={'100%'}/>
                : 
                <div className='img-wrapper'>
                    <img src={imgSrc} alt='profile_pic'/>
                </div>
            }
           
        </div>
    )
}

export default ProfilePic