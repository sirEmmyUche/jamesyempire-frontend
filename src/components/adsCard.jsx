import { useState } from 'react';
import he from 'he'
import { ImBin } from "react-icons/im";
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../utils/toast';
import { deleteAdsResponseById } from '../APIs';
import { user } from '../store/user';
// import { set } from 'react-hook-form';

const AdsCard = ({name,location,message,phone,email,ads_response_id}) => {
     const isUser = user((state)=>state.user)
    const token = isUser?.token || '';
    const [loadingImageId, setLoadingImageId] = useState(null);

    // console.log(isUser)
    const mutation = useMutation({
        mutationFn: async (id) =>
           deleteAdsResponseById(id, token),
        onError: (error) => {
          showToast('Something went wrong', 'error');
          console.log('mutation property form error:', error);
        },
        onSuccess: (data) => {
          console.log('mutation success data:', data);
          if (data.success) {
            showToast(data.message, 'success');
          } else {
            showToast(data.error?.message, 'error');
          }
        },
      });

    const handleDeleteAds = (id) => {
        setLoadingImageId(id);
      mutation.mutate(id);
    };

    return (
        <div className="ads-card">
            <div className="ads-card-content">
                <div className='ads-card-delete'>
                    <Button
                    isLoading={loadingImageId === ads_response_id && mutation.isPending}
                    iconLeft={<ImBin color='#000000' size={20}/>}
                    onClick={()=>handleDeleteAds(ads_response_id)}
                    />
                </div>
                <h2>{`Name: ${he.decode(name)}`}</h2>
                 <p>{`Email: ${he.decode(email)}`}</p>
                  <p>{`Phone: ${he.decode(phone)}`}</p>
                <p>{`Desired property location: ${he.decode(location)}`}</p>
                 <p>{`Message: ${he.decode(message)}`}</p>
            </div>
        </div>
    );
};

export default AdsCard;
