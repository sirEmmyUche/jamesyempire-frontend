import { MdOutlineBedroomParent } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { GiAirplaneDeparture } from "react-icons/gi";
import { GiSpeedBoat } from "react-icons/gi";

const Card = ({title,image,country,state,status,price, showAlldetails = false,
  availableFor, make, model, category, bedrooms, bathrooms,address,description
}) => {

  const categoryDetails = {
    house: (
      <div className="icon-holder">
        <div className="child-icon-holder">
          <span><MdOutlineBedroomParent color="#7065f0" size={16}/></span>
          <p>{`${bedrooms} beds`}</p>
        </div>
        <div className="child-icon-holder">
          <span><MdOutlineBathtub color="#7065f0" size={16}/></span>
          <p>{`${bathrooms} bathrooms`}</p>
        </div>
      </div>
    ),
    car: (
      <div className="icon-holder">
        <div className="child-icon-holder">
          <span><IoCarSport color="#7065f0" size={16}/></span>
          <p>{make}</p>
        </div>
        <div className="child-icon-holder">
          <span><IoCarSport color="#7065f0" size={16}/></span>
          <p>{model}</p>
        </div>
      </div>
    ),
    
    jet: (
      <div className="icon-holder">
        <div className="child-icon-holder">
          <span><GiAirplaneDeparture color="#7065f0" size={16}/></span>
          <p>{make}</p>
        </div>
        <div className="child-icon-holder">
          <span><GiAirplaneDeparture color="#7065f0" size={16}/></span>
          <p>{model}</p>
        </div>
      </div>
    ),
    boat: (
      <div className="icon-holder">
        <div className="child-icon-holder">
          <span><GiSpeedBoat color="#7065f0" size={16}/></span>
          <p>{make}</p>
        </div>
        <div className="child-icon-holder">
          <span><GiSpeedBoat color="#7065f0" size={16}/></span>
          <p>{model}</p>
        </div>
      </div>
    ),
    // Add more categories as needed
  };

  return (
    // NB: address, property type and other details are to be added in the prop detail page
    <div className="card">
      <div className="card-first-child">
        <div className="card-img-holder">
            <img src={image} alt={title}/>
        </div>
        <h4>{availableFor}</h4>
      </div>
      <div className="card-second-child">
        <h1>₦{parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
        <h2>{title}</h2>
        <p>{`${country},${state}`}</p>
        {
          showAlldetails? (
            <>
              <p>{category=='house'?address:null}</p>
              <p>{description}</p>
            </>
          ): null
        }
        <div className="categories-features">{categoryDetails[category] || null}</div>
      </div>
    </div>
  );
};

export default Card;
