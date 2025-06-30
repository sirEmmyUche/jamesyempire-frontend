import RenderResourceData from "./render_resources_data"
import { getAllProperty} from "../APIs"
import Chat from "./chat"
const MyProperties = ()=>{
    return(
        <section>
            My properties
            <Chat/>
            {/* <RenderResourceData resourceAPIFn={getAllProperty}/> */}
        </section>
    )
} 

export default MyProperties