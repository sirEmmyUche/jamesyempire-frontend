import { MdOutlineBedroomParent } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { GiAirplaneDeparture } from "react-icons/gi";
import { GiSpeedBoat } from "react-icons/gi";
import { Link } from "react-router-dom";
// import { FaLandmark } from "react-icons/fa";
// import { MdLocationPin } from "react-icons/md";
// import { GiCargoShip } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { TbMeterSquare } from "react-icons/tb";
import { GiSteeringWheel } from "react-icons/gi";
import { MdCabin } from "react-icons/md";

const Card = ({title,image,country,state,status,price, showAlldetails = false,
  availableFor, make, model, category,property_id,
   bedroom=1, bathroom=1,address,description,capacity,cabin,vessel,year, square
}) => {

  const categoryDetails = {
    house: (
      <div className="icon-holder">
        <div className="child-icon-holder">
          <span><MdOutlineBedroomParent color="#7065f0" size={16}/></span>
          <p>{`${bedroom}`}</p>
        </div>
         <div className="child-icon-holder">
          <span><TbMeterSquare color="#7065f0" size={16}/></span>
          <p>{square}m<sup>2</sup></p>
        </div>
        <div className="child-icon-holder">
          <span><MdOutlineBathtub color="#7065f0" size={16}/></span>
          <p>{`${bathroom}`}</p>
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
          <span>< CiCalendarDate color="#7065f0" size={16}/></span>
          <p>{year}</p>
        </div>
        <div className="child-icon-holder">
          <span><GiSteeringWheel color="#7065f0" size={16}/></span>
          <p>{model}</p>
        </div>
      </div>
    ),
    
    jet: (
      <div className="icon-holder">
         <div className="child-icon-holder">
          <span><GiAirplaneDeparture color="#7065f0" size={16}/></span>
          <p>{model}</p>
        </div>
        <div className="child-icon-holder">
          <span><IoIosPeople color="#7065f0" size={16}/></span>
          <p>{capacity}</p>
        </div>
        <div className="child-icon-holder">
          <span><GiAirplaneDeparture color="#7065f0" size={16}/></span>
          <p>{vessel}</p>
        </div>
      </div>
    ),
    boat: (
      <div className="icon-holder">
        <div className="child-icon-holder">
          <span><GiSpeedBoat color="#7065f0" size={16}/></span>
          <p>{vessel}</p>
        </div>
          <div className="child-icon-holder">
          <span><IoIosPeople color="#7065f0" size={16}/></span>
          <p>{capacity}</p>
        </div>
        <div className="child-icon-holder">
          <span>< MdCabin color="#7065f0" size={16}/></span>
          <p>{cabin}</p>
        </div>
      </div>
    ),
    // Add more categories as needed
  };
 
  return (
    // NB: address, property type and other details are to be added in the prop detail page
    <>
      {
        // isLoading?():()
      }

      <div className="card">
      <div className="card-first-child">
        <div className="card-img-holder">
          <Link to={`/property/${property_id}`} state={{image}} >
              <img src={image} alt={title}/>
          </Link>
        </div>
        <h4 className="ribbon-1">{category}</h4>
        <h4 className="ribbon-2">{availableFor}</h4>
      </div>
      <div className="card-second-child">
        <h1>
          {
            price ? `₦${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`:null
          }
          </h1>
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
    </>
  );
};

export default Card;
