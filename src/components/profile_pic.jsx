import Skeleton from 'react-loading-skeleton';
import {user} from '../store/user'

const ProfilePic = ({mode = 'default', useImgSrc, isLoading})=>{
    const isUser = user((state)=>state.user);
    const profilePic= isUser?.profile_pic;
    let imgSrc;

    if(!profilePic && !useImgSrc) imgSrc = "/images/home-img.jpg"

    if(profilePic == '' && mode == 'default'){
        imgSrc = "/images/home-img.jpg"
    }else if(profilePic && profilePic !== '' && mode == 'default'){
       imgSrc = profilePic
    }
    if(mode !== 'default' && useImgSrc && useImgSrc == '' ){
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