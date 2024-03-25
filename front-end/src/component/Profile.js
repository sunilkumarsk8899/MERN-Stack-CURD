import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [country,setCountry] = useState('');
    const [subject,setSubject] = useState('');
    const [oldpassword,setOldPassword] = useState('');
    const [password,setConfPassword] = useState('');
    const [profile_id,setProfileID] = useState('');

    let is_login = localStorage.getItem('token');
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);

    useEffect(()=>{
        if(!is_login){
            navigate('/login');
        }
        getUserInfo();
    },[]);

    /**
     * get user info
     */
    const getUserInfo = async () =>{
        let data = await fetch(`http://localhost:7000/profile-update/${userData._id}`,{
            headers :   {
                authorization : JSON.parse(localStorage.getItem('token'))
            }
        });
        data = await data.json();
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setCountry(data.country);
        setSubject(data.subject);
        setOldPassword(data.password);
        setConfPassword('');
        setProfileID(data._id)
    }

    /**
     * udpate user info
     */
    const updateHandling = async () =>{
        console.log(first_name,last_name,email,country,oldpassword,password,subject,profile_id);
        let result = await fetch(`http://localhost:7000/profile-update/${profile_id}`,{
            method  : 'Put',
            body    : JSON.stringify({first_name,last_name,email,oldpassword,password,country,subject}),
            headers : {
                "Content-Type": "application/json",
                authorization : JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        console.log(result);
        if(result === 200){
            alert('Profile Udpate Successfully');
        }else{
            alert('Somthing went wrong...');
        }
    }

  return (
    <div>
           <div className="container">
            <label>First Name</label>
            <input type="text" id="first_name" name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name.."/>

            <label>Last Name</label>
            <input type="text" id="last_name" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Your last name.."/>

            <label>Email</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email.."/>

            <label>Old Password</label>
            <input type="text" id="password" name="password" value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Your Old password.."/>

            <label>New Password</label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => setConfPassword(e.target.value)} placeholder="Your New password.."/>

            <label>Select Country</label>
            <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select Your Country</option>
                <option value="india">India</option>
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
            </select>


            <label>Subject</label>
            <textarea id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Write something.." style={{height:'200px'}}></textarea>

            <input type="submit" value="Submit" onClick={updateHandling}/>


        </div>
    </div>
  )
}

export default Profile
