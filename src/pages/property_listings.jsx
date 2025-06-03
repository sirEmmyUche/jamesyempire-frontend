import Search from "../components/search_property";
import UseCardSkeleton from "../components/use_card_skeleton";
import Card from "../components/card"
import data from "../../property_sample.json"


function Listing (){
    const isLoading = false

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
                    <Card key={item.id} title={item.title} 
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
                    bedrooms={item.property_features?.bathrooms}
                    bathrooms={item.property_features?.bedrooms}
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