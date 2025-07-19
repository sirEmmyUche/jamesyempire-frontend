import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import Button from "./Button";
import UseCardSkeleton from './use_card_skeleton'
import { showToast } from "../utils/toast";
import Card from './card'

//This components renders card together with pagination
// Always pass the unique key to avoid unnecessary behaviour
const RenderResourceData = ({resourceAPIFn,
     mode='property', uniqueKey='properties',params={}})=>{
    const [page, setPage] = useState(0);
    const {data, error, isFetching, isPlaceholderData, isLoading } = useQuery({
        queryKey: [uniqueKey,page, params],
        queryFn: async () => resourceAPIFn({page, ...params}),
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
    const handlePrevPage = ()=>{
        setPage((old) => Math.max(old - 1, 0))
    }
    const handleNextPage = ()=>{
        if (!isPlaceholderData && data?.hasMore) {
            setPage((old) => old + 1);
        }
    }
    return(<section className="render-resources">
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

        {hasProperty  && (
                <div className="pagination-holder">
                    <div className="btn-holder">
                        <div className="btn-box">
                            <Button
                            type="button"
                            onClick={handlePrevPage}
                            disabled={page === 0}
                            >
                            Previous
                            </Button>
                        </div>
                         <div className="page">
                            <p>{page + 1}</p>
                        </div>
                         <div className="btn-box">
                            <Button
                                onClick={handleNextPage}
                                disabled={isPlaceholderData || !data?.hasMore}>
                            Next
                            </Button>
                         </div>
                        
                    </div>
                    <div className="fetch-pg">{isFetching ? <span> Loading...</span> : null}{' '}</div>
                </div>
            )}
    </section>)
}

export default RenderResourceData;