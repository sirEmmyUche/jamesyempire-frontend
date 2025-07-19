import { useState } from "react";
import Search from "../components/search_property";
import UseCardSkeleton from "../components/use_card_skeleton";
import Card from "../components/card"
// import data from "../../property_sample.json"
// import {useQuery,keepPreviousData} from '@tanstack/react-query'
import { searchProperty } from "../APIs";
// import { showToast } from "../utils/toast";
import RenderResourceData from "../components/render_resources_data";


function Listing (){
    const [searchParams, setSearchParams] = useState({});

    const handleSearchSubmit = (data) => {
          console.log("Submitted data:", data);
        if(data && data?.available_for == 'all'){
             setSearchParams({}) 
        }
    setSearchParams(data) // passed from Search component
  }

    return(<section id="listing">
        <div className="child-1">
            <div className="subchild-1">
                 <h1>Find Your Dream Home</h1>
                 <h3>easy to find, easy to connect</h3>
            </div>
            <div className="subchild-2">
                <Search onSubmit={ handleSearchSubmit}/>
            </div>
        </div>
        <div className="child-2">
            <RenderResourceData 
            mode="property" 
            uniqueKey="properties" 
             params={searchParams}
            resourceAPIFn={searchProperty}/>
        </div>
    </section>)
}

export default Listing