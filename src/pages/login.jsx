import {useMutation,} from '@tanstack/react-query'
import AccountForm from '../components/account_form';
import { Link } from "react-router-dom";

function Login() {
    return (
      <div id='login-page'>
        {/* <h1>Login</h1> */}
        <div className='account-form-wrapper'>
             <AccountForm mode='login'/>
        </div>
        <div className='wrapper'>
            <p>
              <Link to={'/'}>Forgot password?</Link>
            </p>
            <p><Link to={'/signup'}>Create account</Link></p>
        </div>
      </div>
    );
  }
  
  export default Login;