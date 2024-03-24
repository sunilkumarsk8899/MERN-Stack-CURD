import React from 'react'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
        
        <h3>Sign Up</h3>

        <div className="container">

            <label>Email</label>
            <input type="text" id="email" name="email" placeholder="Your email.."/>

            <label>Password</label>
            <input type="text" id="password" name="password" placeholder="Your password.."/>

            <input type="submit" value="Submit"/>

            <div>
                You don't have any account? <Link to='/sign-up'>Sign up</Link>
            </div>

        </div>


        
    </>
  )
}

export default Login;
