import RenderResourceData from "./render_resources_data"
import { getMyProperty} from "../APIs"
import {useQuery,keepPreviousData} from '@tanstack/react-query'
import UseCardSkeleton from "./use_card_skeleton"
import { showToast } from "../utils/toast"

const MyProperties = ()=>{
     const { isPending, isError, data, error, isLoading,
            isFetching, isPlaceholderData } = useQuery({
            queryKey: ['propertyById',],
            queryFn:async()=> getMyProperty(property_id),
            placeholderData: keepPreviousData,
            // use this if your data doesn't change frequently
            cacheTime: 1800000, // Cache for 30 minutes (1800000 milliseconds)
            refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
            // refetchOnMount: true,
          });

        if(isLoading){
            return <UseCardSkeleton/>
        }

        if(error){
            console.error('my-properties-componennt-error:', error);
            showToast('Something went wrong, please try later.', 'error')
        }

    return(
        <section className="my-properties">
            My properties
            {/* <RenderResourceData resourceAPIFn={getAllProperty}/> */}
        </section>
    )
} 

export default MyProperties