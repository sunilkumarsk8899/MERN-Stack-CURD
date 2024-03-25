import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    let is_login = localStorage.getItem('token');
    if(is_login){
      navigate('/');
    }
  });
  
  const loginHandling = async () =>{

    if(!email || !password){
      setMessage('Somthing went wrong...');
    }else{
      let result = await fetch('http://localhost:7000/login',{
        method  : 'POST',
        body    : JSON.stringify({ email, password }),
        headers : {
          'Content-Type'  : 'application/json'
        }
      });
      result = await result.json();
      console.log(result);
      if(result.status === 400){
        setMessage('Login Credentials Not Match...');
      }else if(result.status === 200){
        setMessage('Match');
        localStorage.setItem('userData',JSON.stringify(result.userData));
        localStorage.setItem('token',JSON.stringify(result.token));
        navigate('/');
      }
    }
  }

  return (
    <>
        
        <h3>Login</h3>

        <div className="container">

          { message } <br/>

            <label>Email</label>
            <input type="text" id="email" name="email" value={email} onChange={ (e) => setEmail(e.target.value) } placeholder="Your email.."/>

            <label>Password</label>
            <input type="text" id="password" name="password" value={password} onChange={ (e) => setPassword(e.target.value) } placeholder="Your password.."/>

            <input type="submit" value="Submit" onClick={loginHandling}/>

            <div>
                You don't have any account? <Link to='/sign-up'>Sign up</Link>
            </div>

        </div>


        
    </>
  )
}

export default Login;
