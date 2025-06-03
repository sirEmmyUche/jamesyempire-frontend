import { getAllProperty } from "../APIs";
import Carousel from '../components/carousel';
import data from '../../property_sample.json'
import {useParams} from 'react-router-dom'
import DetailsOfProperty from "../components/details_of_property";
import PropertyForm from '../components/property_form'


// fetch query property should happen here.
const PropertyDetails = ()=>{
    // const handleClisck = async()=>{
    //     const api = await getAllProperty()
    //     console.log('this is the api from propertyDetail:', api)
    // }

    const params = useParams();
    const property_id = params.id
    const isLoading = false

    const filteredData = data?.properties?.filter((item)=>item.property_id === property_id)
    // const changeArrayToObj = Object.assign({}, filteredData);
    // console.log(filteredData)

    const images = [
        "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ];

    return(<section id="property-details">
        <div className="prop-details-child-1">
            <div className="prop-details-carousel-holder">
                <Carousel images={images}/>
            </div>
            <div className="property-description-holder">
                <DetailsOfProperty data={filteredData} isLoading={isLoading}/>
            </div>
        </div>
        <div className="prop-details-child-2">
            <PropertyForm mode="edit" propertyData={filteredData[0]}/>
        </div>
    </section>)
}

export default PropertyDetails;