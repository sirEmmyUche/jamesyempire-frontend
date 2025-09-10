import { useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../../property_sample.json'
import Card from './card'
import UseCardSkeleton from './use_card_skeleton'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllProperty } from '../APIs';
import { showToast } from '../utils/toast';

const HomePagePropertyListingSample = ()=>{
    const [page, setPage] = useState(0); 
     const {data, error, isFetching, isPlaceholderData, isLoading } = useQuery({
        queryKey: ['homepageProperties'],
        queryFn: async () => getAllProperty({page}),
        placeholderData: keepPreviousData,
    });
     if(isLoading){
        return <UseCardSkeleton/>
    }

    if(error){
        console.error('render resource query error:',error)
        showToast('Something went wrong','error')
    }
    if(data && !data?.success){
        // console.log('render resource query data:',data)
        showToast(data?.error?.message,'info')
    }

    const hasProperty = data?.success && data?.properties?.length > 0;

  

    return (
        <div className='homepage-sample-listing-main-container'>
            <h1 className='--header'>Find Properties Based On Your Location</h1>
            <h2 className='sub-header'>Some of our picked properties for you.</h2>
            <div className="card-map-container">
                {data?.properties?.map((item) => (
                    <Card key={item.property_id} title={item.title} 
                    image={item.image}
                    country={item.country}
                    property_id={item.property_id} 
                    address = {item.address}
                    status={item.status}
                    description={item.description}
                    price={item.price}
                    state={item.state}
                    available_for={item.available_for} 
                    category={item.category}
                    make={item.property_features?.make}
                    model={item.property_features?.model}
                    bedrooms={item.property_features?.bathroom}
                    bathrooms={item.property_features?.bedroom}
                    capacity={item.property_features.capacity}
                    cabin={item.property_features.cabin}
                    vessel={item.property_features.vessel}
                    year={item.property_features.year}
                    square={item.property_features.square}
                    />
                ))}
            </div>
            <h2 className='more-options'>
                <Link to={'/listing'}>
                    Browse more properties
                </Link>
            </h2>
        </div>
      );
    
}
export default HomePagePropertyListingSample;