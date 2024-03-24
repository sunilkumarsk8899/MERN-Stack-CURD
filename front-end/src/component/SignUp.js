import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [conf_password, setConf_Password] = useState('');
  const [password_not_match, setPassword_Not_Match] = useState(false);
  const [subject, setSubject] = useState('');
  const [error, setError] = useState(false);
  const [success_msg,setSuccessMsg] = useState(false);
  const [not_success_msg,setNotSuccessMsg] = useState(false);

  const onRegisterSubmit = async () =>{

    if(first_name === '' || last_name === '' || email === '' || country === '' || password === '' || conf_password === '' || subject === ''){
      setError(true);
    }else if(password !== conf_password){
      setPassword_Not_Match(true);
      console.log('not match');
    }else{
      setPassword_Not_Match(false);
      console.log(first_name,last_name,email,country,password,conf_password,subject);
      let result = await fetch('http://localhost:7000/register-user',{
        method  : 'POST',
        body    : JSON.stringify({ first_name, last_name, email, country, password, conf_password, subject }),
        headers : {
          'Content-Type' : "application/json"
        }
      });
      result = await result.json();
      if(result.status === 200){
        setSuccessMsg(true);
      }else{
        setNotSuccessMsg(true);
      }
    }

  }

  return (
    <>
        
        <h3>Sign Up</h3>

        <div>
          <div> { success_msg && `Register Successfully` } { not_success_msg && `Somting went wrong` } </div>
        </div>

        <div className="container">
            <label>First Name</label>
            <input type="text" id="first_name" name="first_name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="Your first name.."/>
            <small style={{color:"red"}}>{ error && !first_name && 'First Name is required' }</small><br/><br/>

            <label>Last Name</label>
            <input type="text" id="last_name" name="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="Your last name.."/>
            <small style={{color:"red"}}>{ error && !last_name && 'Last Name is required' }</small><br/><br/>

            <label>Email</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email.."/>
            <small style={{color:"red"}}>{ error && !email && 'Email is required' }</small><br/><br/>

            <label>Password</label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password.."/>
            <small style={{color:"red"}}>{ error && !password && 'Password is required' }</small><br/><br/>

            <label>Confirm Password</label>
            <input type="text" id="conf_password" name="conf_password" onChange={(e)=> setConf_Password(e.target.value)} placeholder="Your confirm password.."/>
            <small style={{color:"red"}}>{ error && !conf_password && 'Confirm Password is required' }</small><br/><br/>
            <small style={{color:"red"}}>{ password_not_match ? 'Confirm Password & Password Not Match' : '' }</small><br/><br/>

            <label>Select Country</label>
            <select id="country" name="country" onChange={(e)=> setCountry(e.target.value)}>
            <option value="">Select Your Country</option>
            <option value="india">India</option>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
            </select>
            <small style={{color:"red"}}>{ error && !country && 'Country is required' }</small><br/><br/>

            <label>Subject</label>
            <textarea id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Write something.." style={{height:'200px'}}></textarea>
            <small style={{color:"red"}}>{ error && !subject && 'Subject is required' }</small><br/><br/>

            <input type="submit" value="Submit" onClick={onRegisterSubmit}/>

            <div>
                You have already account? <Link to='/login'>Login</Link>
            </div>


        </div>
        
    </>
  )
}

export default SignUp;
