import CountUp from "./count_up"
import { TiKey } from "react-icons/ti";
import { MdPeopleOutline } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlineHouse } from "react-icons/md";

const PropCount = ()=>{
    return(
        <div className="count-1-prop">
            <div className="p-arent">
                <div className="icon-holder">
                    < MdPeopleOutline size={20}  color="#ffffff"/>
                    <span><TiKey size={15} color="#ffffff"/></span>
                </div>
                <div className="count-num"><CountUp targetNumber={50}/>k+<br/> renters</div>
                <p>believe in our service</p>
            </div>
            <div className="p-arent">
                <div className="icon-holder">
                    <MdOutlineHouse size={20}  color="#ffffff"/>
                    <span><MdOutlineSearch size={15} color="#ffffff"/></span>
                </div>
                <div className="count-num"><CountUp targetNumber={10}/>k+<br/> properties</div>
                <p>and house ready for occupancy</p>
            </div>
        </div>
    )
}

export default PropCount