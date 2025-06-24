import { getPropertyById } from "../APIs";
import Carousel from '../components/carousel';
// import data from '../../property_sample.json'
import {useParams} from 'react-router-dom'
import DetailsOfProperty from "../components/details_of_property";
import PropertyForm from '../components/property_form'
import {useQuery,keepPreviousData} from '@tanstack/react-query'
import { showToast } from "../utils/toast";


// fetch query property should happen here.
const PropertyDetails = ()=>{
     const params = useParams();
     const property_id = params.id
     const { isPending, isError, data, error, isLoading,
        isFetching, isPlaceholderData } = useQuery({
        queryKey: ['properties',],
        queryFn:async()=> getPropertyById(property_id),
        placeholderData: keepPreviousData,
        // use this if your data doesn't change frequently
        cacheTime: 1800000, // Cache for 30 minutes (1800000 milliseconds)
        refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
        // refetchOnMount: true,
      });
    // const handleClisck = async()=>{
    //     const api = await getAllProperty()
    //     console.log('this is the api from propertyDetail:', api)
    // }
    // console.log('property by id:', data)

    if(error){
        console.error(error)
        showToast('Unable to display this property at the moment, please try again later','error')
    }

    if(data && !data.success) {
        console.log(data)
        showToast(data.error.message,'error')
    }


    // const filteredData = data?.properties?.filter((item)=>item.property_id === property_id)
    // const changeArrayToObj = Object.assign({}, filteredData);
    // console.log(filteredData)

    // const images = [
    //     "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   ];

     const images = data?.property?.image || []

    return(<section id="property-details">
        <div className="prop-details-child-1">
            <div className="prop-details-carousel-holder">
                <Carousel images={images}/>
            </div>
            <div className="property-description-holder">
                <DetailsOfProperty data={data?.property} isLoading={isLoading}/>
            </div>
        </div>
        <div className="prop-details-child-2">
            {!isLoading &&<PropertyForm mode="edit" propertyData={data?.property}/>}
            
        </div>
    </section>)
}

export default PropertyDetails;