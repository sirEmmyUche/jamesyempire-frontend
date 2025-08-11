import { Link } from "react-router-dom"
const Logo = ({linkTo='/'})=>{
    return(
        <div className="main-logo-container">
             <Link to={linkTo}>
                    <div className="img-holder">
                        <img src="/images/logo.jpg" alt="logo"/>
                    </div>
             </Link>
        </div>
    )
}

export default Logo