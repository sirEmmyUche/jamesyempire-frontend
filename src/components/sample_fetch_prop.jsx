import { Link } from 'react-router-dom';
import data from '../../property_sample.json'
import Card from './card'

const HomePagePropertyListingSample = ()=>{
    //ideally, your fetch logic is supposed to be here

    return (
        <div className='homepage-sample-listing-main-container'>
            <h1 className='sub-header'>Some of our picked properties for you.</h1>
            <div className="card-map-container">
                {data?.properties?.map((item) => (
                    <Card key={item.id} title={item.title} 
                    image={item.image}
                    country={item.country} 
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
                    />
                ))}
            </div>
            <h2 className='more-options'>
                <Link to={'/'}>
                    Browse more properties
                </Link>
            </h2>
        </div>
      );
    
}
export default HomePagePropertyListingSample;