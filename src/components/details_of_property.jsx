import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import all icons this way to reduce build time and avoid loading the entire react-icon lib
import { MdOutlineBedroomParent } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { GiAirplaneDeparture } from "react-icons/gi";
import { GiSpeedBoat } from "react-icons/gi";
import { IoPricetagOutline } from "react-icons/io5";
// import { FaLandmark } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
// import { GiCargoShip } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { MdCabin } from "react-icons/md";
import { GrStatusUnknown } from "react-icons/gr";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaLandmark } from "react-icons/fa";
import { TbMeterSquare } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { GiSteeringWheel } from "react-icons/gi";



const DetailsOfProperty = ({data,isLoading})=>{
    console.log(data)
    const iconSize = 15

      const categoryDetails = {
        house: (
          <div className="parent">
            <div className="child">
              <div className="icon-holder"><MdOutlineBedroomParent color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Bedrooms</h4>
                    <p>{`${data[0].property_features.bedrooms}`}</p>
              </div>
            </div>
            <div className="child --border">
              <div className="icon-holder"><MdOutlineBathtub color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Bathrooms</h4>
                    <p>{`${data[0].property_features.bathrooms}`}</p>
              </div>
            </div>
             <div className="child">
              <div className='icon-holder'><TbMeterSquare color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Square</h4>
                    <p>{`${data[0].property_features.square}m`}</p>
              </div>
            </div>
          </div>
        ),
        car: (
            <div className="parent">
            <div className="child">
              <div className='icon-holder'><IoCarSport color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Brand</h4>
                    <p>{`${data[0].property_features.make}`}</p>
              </div>
            </div>
            <div className="child --border">
              <div className='icon-holder'><GiSteeringWheel color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Model</h4>
                    <p>{`${data[0].property_features.model}`}</p>
              </div>
            </div>
             <div className="child">
              <div className='icon-holder'><CiCalendarDate color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Year</h4>
                    <p>{`${data[0].property_features.year}`}</p>
              </div>
            </div>
          </div>
        ),
        
        jet: (
            <div className="parent">
            <div className="child">
              <div className='icon-holder'><GiAirplaneDeparture color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Class</h4>
                    <p>{`${data[0].property_features.vessel}`}</p>
              </div>
            </div>
            <div className="child --border">
              <div className='icon-holder'><GiAirplaneDeparture color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Model</h4>
                    <p>{`${data[0].property_features.model}`}</p>
              </div>
            </div>
             <div className="child">
              <div className='icon-holder'><IoIosPeople color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Capacity</h4>
                    <p>{`${data[0].property_features.capacity}`}</p>
              </div>
            </div>
          </div>
        ),
        boat: (
            <div className="parent">
            <div className="child">
              <div className='icon-holder'><GiSpeedBoat color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Vessel</h4>
                    <p>{`${data[0].property_features.vessel}`}</p>
              </div>
            </div>
            <div className="child --border">
              <div className='icon-holder'><IoIosPeople color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Capacity</h4>
                    <p>{`${data[0].property_features.capacity}`}</p>
              </div>
            </div>
             <div className="child">
              <div className='icon-holder'><MdCabin color="#ffffff" size={iconSize}/></div>
              <div className='content-holder'>
                    <h4>Cabin</h4>
                    <p>{`${data[0].property_features.cabin}`}</p>
              </div>
            </div>
          </div>
        ),
        // Add more categories as needed
      };

    return(<div className='property-content'>
        <h1 className='property-content-child-1'>About</h1>
        <p className='property-content-child-2'>
            {isLoading? <Skeleton count={3}/>: data[0].description}
        </p>
        <div className='property-content-child-3'>
            <div className='property-content-child-3-subchild'>
                <div className='icon-holder'><FaLandmark color="#ffffff" size={iconSize}/></div>
                <div className='content-holder'>
                    <h4>Property</h4>
                    <p>{isLoading? <Skeleton count={1}/>: data[0].category}</p>
                </div>
            </div>
            <div className='property-content-child-3-subchild --border'>
                <div className='icon-holder'>
                  <GrStatusUnknown  color="#7a288a" size={iconSize}/>
                </div>
                <div className='content-holder'>
                    <h4>Status</h4>
                    <p>{isLoading? <Skeleton count={1}/>: data[0].status}</p>
                </div>
            </div>
            <div className='property-content-child-3-subchild'>
                <div className='icon-holder'><IoPricetagOutline color="#008000" size={iconSize}/></div>
                <div className='content-holder'>
                    <h4>Price</h4>
                    <p className='price'>
                        {
                        isLoading? <Skeleton count={1}/>
                        : `₦${parseFloat(data[0].price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        }
                    </p>
                </div>
            </div>
        </div>
        <div className='property-content-child-3'>
            <div className='property-content-child-3-subchild'>
                <div className='icon-holder'><MdLocationPin color="#ff0000" size={iconSize}/></div>
                <div className='content-holder'>
                    <h4>Location</h4>
                    <p>{isLoading? <Skeleton count={1}/>: data[0].state}</p>
                </div>
            </div>
            <div className='property-content-child-3-subchild --border'>
                <div className='icon-holder'><RiCustomerService2Line color="#ffffff" size={iconSize}/></div>
                <div className='content-holder'>
                    <h4>Service</h4>
                    <p>{isLoading? <Skeleton count={1}/>: data[0].available_for}</p>
                </div>
            </div>
            <div className='property-content-child-3-subchild'>
                <div className='icon-holder'><IoPricetagOutline color="#ffffff" size={iconSize}/></div>
                <div className='content-holder'>
                    <h4>Price</h4>
                    <p className='price'>
                        {
                        isLoading? <Skeleton count={1}/>
                        : `₦${parseFloat(data[0].price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        }
                    </p>
                </div>
            </div>
        </div>
        <div className='property-content-child-4'>{categoryDetails[data[0].category] || null}</div>
    </div>)
}

export default DetailsOfProperty