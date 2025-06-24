import { useState } from "react";
import Search from "../components/search_property";
import UseCardSkeleton from "../components/use_card_skeleton";
import Card from "../components/card"
// import data from "../../property_sample.json"
import {useQuery,keepPreviousData} from '@tanstack/react-query'
import { getAllProperty } from "../APIs";
import { showToast } from "../utils/toast";


function Listing (){
     const [page, setPage] = useState(0);

   const { isPending, isError, data, error, isLoading,
        isFetching, isPlaceholderData } = useQuery({
        queryKey: ['properties', page],
        queryFn:async()=> getAllProperty({page}),
        placeholderData: keepPreviousData,
        // use this if your data doesn't change frequently
        cacheTime: 1800000, // Cache for 30 minutes (1800000 milliseconds)
        refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
        // refetchOnMount: true,
      });

    if(data && !data.success) {
        console.log(data)
        showToast(data.error.message,'error')
    }

    if(error){
        console.error(error)
        showToast('Unable to display properties at the moment, please try again later.','error')
    }

    return(<section id="listing">
        <div className="child-1">
            <div className="subchild-1">
                 <h1>Find Your Dream Home</h1>
            </div>
            <div className="subchild-2">
                <Search/>
            </div>
        </div>
        {/* <Skeleton count={6}/> */}
        <div className="child-2">
            {
                isLoading ? <UseCardSkeleton/> : 
                <div className="card-holder">
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
                    availableFor={item.available_for} 
                    make={item.property_features?.make}
                    model={item.property_features?.model}
                    category={item.category}
                    bedroom={item.property_features?.bathroom}
                    bathroom={item.property_features?.bedroom}
                    capacity={item.property_features.capacity}
                    cabin={item.property_features.cabin}
                    vessel={item.property_features.vessel}
                    year={item.property_features.year}
                    square={item.property_features.square}
                    />
                ))}
                </div>
                
            }
        </div>
    </section>)
}

export default Listing