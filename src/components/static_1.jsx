import { TiKey } from "react-icons/ti";
import { MdPeopleOutline } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { FcInspection } from "react-icons/fc";
import { Link } from "react-router-dom";

const Static_1 = ()=>{
    return(
        <div className="static-1">
            <div className="static-1-first-child">
                <h2>The new way to find your home</h2>
                <p>Find your dream place to live and live there with ease</p>
                <div className="static-1-first-child-btn-holder">
                    {/* <Button type="button" text={'Browse Properties'}/> */}
                    <p>
                        <Link to={'/listing'}>Search Properties</Link>
                    </p>
                </div>
                <div className="static-1-first-child-img-holder">
                    <img src="/images/home-design-2-modified.png" alt="image-vector"/>
                </div>
            </div>
            <div className="static-1-second-child">
                <div className="p-arent">
                    <div className="icon-holder">
                        <TiKey size={20}  color="#ffffff"/>
                        <span><TiKey size={15} color="#ffffff"/></span>
                    </div>
                    <h3>Property Insurance</h3>
                    <p>We offer our customer property protection of liability 
                        coverage and insurance for their better life
                    </p>
                </div>
                <div className="p-arent">
                    <div className="icon-holder">
                        < MdAttachMoney size={20}  color="#ffffff"/>
                        <span><MdAttachMoney size={15} color="#ffffff"/></span>
                    </div>
                    <h3>Best Price</h3>
                    <p>Not sure what you should be charging for your property? No need to worry, 
                        let us do the number for you.
                    </p>
                </div>
                <div className="p-arent">
                    <div className="icon-holder">
                        < MdPeopleOutline size={20}  color="#ffffff"/>
                        <span><TiKey size={15} color="#ffffff"/></span>
                    </div>
                    <h3>Low Commission</h3>
                    <p>You no longer need to negotiate commissions and haggle with other agents.</p>
                </div>
                <div className="p-arent">
                    <div className="icon-holder">
                        < FcInspection size={20}  color="#ffffff"/>
                        <span><FcInspection size={15} color="#ffffff"/></span>
                    </div>
                    <h3>Overall Control</h3>
                    <p>Get a virtual tour and schedule visits before you rent or book any properties.</p>
                </div>
            </div>
        </div>
    )
}


export default Static_1;