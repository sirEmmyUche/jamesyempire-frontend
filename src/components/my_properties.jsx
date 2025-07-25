import RenderResourceData from "./render_resources_data"
import { getMyProperty} from "../APIs"
import { user } from "../store/user"


const MyProperties = ()=>{
    const isUser = user((state)=>state.user)
    const token = isUser?.token;
    const account_id = isUser?.account_id
     

    return(
        <section className="my-properties">
            <h1 className="header">My properties</h1>
            <p className="sub-header">Properties uploaded by you will appear here</p>
            <div className="resorce-wrapper">
            <RenderResourceData 
                resourceAPIFn={getMyProperty}
                mode={'property'}
                uniqueKey={'my-properties'}
                params={{
                    token,
                    id: account_id
            }}/>
            </div>
        </section>
    )
} 

export default MyProperties