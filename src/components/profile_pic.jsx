import Skeleton from 'react-loading-skeleton';
import { user } from '../store/user';

const ProfilePic = ({ mode = 'default', useImgSrc, isLoading }) => {
  const isUser = user((state) => state.user);
  const profilePic = isUser?.profile_pic?.secure_url;
  let imgSrc;
  let profilePicPlaceholder = "/images/user-profile-pic-placeholder.png";

  if (mode === 'default') {
    imgSrc = profilePic || profilePicPlaceholder;
  } else if (useImgSrc) {
    imgSrc = useImgSrc;
  } else {
    imgSrc = profilePicPlaceholder;
  }

//   console.log('use-img', useImgSrc);
//   console.log('img', imgSrc);

  return (
    <div id='profile-pics'>
      {isLoading ? (
        <Skeleton circle width={'100%'} height={'100%'} />
      ) : (
        <div className='img-wrapper'>
          <img src={imgSrc} alt='profile_pic' onError={(e) => {
            e.target.src = profilePicPlaceholder;
          }} />
        </div>
      )}
    </div>
  );
};

export default ProfilePic;



// import Skeleton from 'react-loading-skeleton';
// import {user} from '../store/user'

// const ProfilePic = ({mode = 'default', useImgSrc, isLoading})=>{
//     const isUser = user((state)=>state.user);
//     // console.log(isUser)
//     const profilePic = isUser?.profile_pic?.secure_url;
//     let imgSrc;
//     let profilePicPlaceholder = "/images/user-profile-pic-placeholder.png"

//     if(!profilePic && !useImgSrc) imgSrc = profilePicPlaceholder

//     if( mode == 'default' && !profilePic){
//         imgSrc = profilePicPlaceholder
//     }else if( mode == 'default' && profilePic && profilePic !== ''){
//        imgSrc = profilePic
//     }
//     if(mode !== 'default' && useImgSrc && useImgSrc !== '' ){
//         imgSrc = useImgSrc
//     }
//     console.log('use-img', useImgSrc)
//     console.log('img',  imgSrc)
//     return(
//         <div id='profile-pics'>
//             {
//                 isLoading?<Skeleton circle width={'100%'} height={'100%'}/>
//                 : 
//                 <div className='img-wrapper'>
//                     <img src={imgSrc} alt='profile_pic'/>
//                 </div>
//             }
           
//         </div>
//     )
// }

// export default ProfilePic