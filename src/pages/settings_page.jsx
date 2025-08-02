import SettingsNav from "../components/settings_nav"
import { Outlet } from "react-router-dom"
const Settings = ()=>{
    return(
        <section className="settings-page-layout">
            <div className="child-1">
                <SettingsNav/>
            </div>
            <Outlet/>
        </section>
    )
}

export default Settings