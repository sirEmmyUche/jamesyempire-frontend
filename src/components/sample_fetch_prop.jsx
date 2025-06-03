import { Link } from 'react-router-dom';
import data from '../../property_sample.json'
import Card from './card'

const HomePagePropertyListingSample = ()=>{
    //ideally, your fetch logic is supposed to be here

    return (
        <div className='homepage-sample-listing-main-container'>
            <h1 className='--header'>Find Properties Based On Your Location</h1>
            <h2 className='sub-header'>Some of our picked properties for you.</h2>
            <div className="card-map-container">
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
                    category={item.category}
                    make={item.property_features?.make}
                    model={item.property_features?.model}
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
            <h2 className='more-options'>
                <Link to={'/listing'}>
                    Browse more properties
                </Link>
            </h2>
        </div>
      );
    
}
export default HomePagePropertyListingSample;