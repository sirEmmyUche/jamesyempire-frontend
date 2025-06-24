import AccountForm from "../components/account_form";

import { Link } from "react-router-dom";

function SignUp() {
    return (
      <div id='signup-page'>
        {/* <h1>Login</h1> */}
        <div className='account-form-wrapper'>
             <AccountForm mode='signup'/>
        </div>
        <div className='wrapper'>
            <p>
              <Link to={'/'}>Forgot password?</Link>
            </p>
            <p><Link to={'/login'}>Login</Link></p>
        </div>
      </div>
    );
  }
  
  export default SignUp;

// function SignUp() {
//     return (
//       <div>
//         <AccountForm mode="signup"/>
//       </div>
//     );
//   }
  
//   export default SignUp;