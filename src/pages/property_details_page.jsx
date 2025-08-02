import { getPropertyById, deletePropertyById} from "../APIs";
import Carousel from '../components/carousel';
// import data from '../../property_sample.json'
import {useParams,useLocation} from 'react-router-dom'
import DetailsOfProperty from "../components/details_of_property";
import PropertyForm from '../components/property_form'
import {useQuery,keepPreviousData} from '@tanstack/react-query'
import { showToast } from "../utils/toast";
import {user} from '../store/user'
import Chat from "../components/chat";
import DeleteResources from "../components/delete_resources";
// import CommentOnProperty from "../components/property_comments";


// fetch query property should happen here.
const PropertyDetails = ()=>{
    let image
     const isUser = user((state) => state.user); 
     const userId = isUser?.account_id || ''
     const params = useParams();
     const location = useLocation();
     const property_id = params.id
     const initialImage = location?.state?.image || 'xxx'
     const role = isUser?.role
    //  console.log('initial-image',initialImage)
     const { isPending, isError, data, error, isLoading,
        isFetching, isPlaceholderData } = useQuery({
        queryKey: ['propertyById',],
        queryFn:async()=> getPropertyById(property_id),
        placeholderData: keepPreviousData,
        // use this if your data doesn't change frequently
        cacheTime: 1800000, // Cache for 30 minutes (1800000 milliseconds)
        refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
        // refetchOnMount: true,
      });
   
    if(isLoading){
         //initial image was rendered twice here in the array to allow carousel 
        // to have more than one item to render thus avoiding unexpected behaviour
        image = [initialImage,initialImage] || []
    }

    if(error){
        console.error(error)
        image = [initialImage,initialImage] || []
        showToast('Unable to display this property at the moment, please try again later','error')
    }

    if(data && !data.success) {
        // console.log(data)
        image = [initialImage,initialImage] || []
        showToast(data.error.message,'error')
    }

    if(data && data.success){
        if(data?.property?.image && data?.property?.image.length >= 2){
            image = data?.property?.image
        }else{
            image = [initialImage,initialImage] || []
        }
    }

    return(<section id="property-details">
        <div className="prop-details-child-1">
            <div className="prop-details-carousel-holder">
                <Carousel images={image}/>
            </div>
            <div className="property-description-holder">
                <DetailsOfProperty data={data?.property} isLoading={isLoading}/>
            </div>
        </div>

        {/* this section is to hold both comments and the live chat */}
        <div className="prop-details-child-2">
            {/* <div className="comment-wrapper">
                <CommentOnProperty/>
            </div> */}
            <div className="chat-wrapper">
                <Chat propertyData={data?.property}/>
            </div>
        </div>

        {
             userId == data?.property?.account_id &&
             <div className="prop-details-child-3">
                 <PropertyForm mode="edit" propertyData={data?.property}/>
             </div>
           
        }
{/* 
        <div className="prop-details-child-3">
            { 
            //!isLoading && 
            userId == data?.property?.account_id &&
            <PropertyForm mode="edit" propertyData={data?.property}/>
            }
        </div> */}
        {
              userId == data?.property?.account_id || role =='admin'?
              <div className="prop-details-child-4">
                <DeleteResources 
                resourceAPIFn={deletePropertyById}
                resourceId={property_id}/>
            </div>
            : null
        }
        
    </section>)
}

export default PropertyDetails;