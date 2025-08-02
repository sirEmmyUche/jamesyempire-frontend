import { NavLink } from "react-router-dom"

const SettingsNav = ()=>{
    return(
        <section className="settings-nav">
            <h1>Settings</h1>
            <ul>
                 <li>
                    <NavLink to={'/dashboard/settings'}
                     end
                    className={({ isActive, isPending }) =>
                        isPending ? "pending-link" : isActive ? "active-link" : ""}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/dashboard/settings/security'}className={({ isActive, isPending }) =>
                        isPending ? "pending-link" : isActive ? "active-link" : ""}>
                        Password
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}

export default SettingsNav