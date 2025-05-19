import { PiVideoLight } from "react-icons/pi";
import { BsHouseDoor } from "react-icons/bs";
import { PiNoteDuotone } from "react-icons/pi";
import CountUp from "./count_up";

const Static_2 = ()=>{
    return(<div className="static-2-main-container">
        <div className="static-2-child-1">
            <div className="sub-child">
                <h2>We make it easy for
                    <span> tenants</span> and 
                    <span> landlords.</span>
                </h2>
            </div>
            <div className="sub-child">
                <p>
                    Whether it's selling your current home or getting a new home, we make it easy
                    and efficient. The best part? 
                    You will save a bunch of money and time with our services.
                </p>
            </div>
        </div>
        <div className="static-2-child-2">
            <div className="static-2-child-2-sub-child-1">
                <div className="icon-holder">
                    <PiVideoLight color="#ffffff" size={20}/>
                </div>
                <div>
                    <h2>Home tour</h2>
                    <p>
                        You can communicate directly with landlords and we provide you with tour
                        before you can buy or rent a property.
                    </p>
                </div>
            </div>
            <div className="static-2-child-2-sub-child-2">
                <div className="icon-holder">
                    <BsHouseDoor color="#7065f0" size={20}/>
                </div>
                <div>
                    <h2>Find the best deal</h2>
                    <p>
                        Get updates on latest property and explore more about the property.
                    </p>
                </div>
            </div>
            <div className="static-2-child-2-sub-child-3">
                <div className="icon-holder">
                    <PiNoteDuotone color="#7065f0" size={20} />
                </div>
                <div>
                    <h2>Little Effort</h2>
                    <p>
                        With little effort, you can get your dream home and move in within seconds.
                    </p>
                </div>
            </div>
        </div>
        <div className="static-2-child-3">
            <div className="static-2-child-3-sub-child-1">
                <div className="count-holder">
                    <CountUp targetNumber={7.4}/>
                    <p>Property return rate</p>
                </div>
                <div className="count-holder --2-border">
                    <div className="border-top"></div>
                    <CountUp targetNumber={3000}/>
                    <p>Property in sell and rent</p>
                </div>
                <div className="count-holder">
                    <CountUp targetNumber={1540}/>
                    <p>Daily completed transaction</p>
                </div>
            </div>
        </div>
    </div>)
}

export default Static_2;