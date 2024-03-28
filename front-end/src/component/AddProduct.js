import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
    const navigate = useNavigate();
    useEffect(()=>{
        let is_login = localStorage.getItem('token');
        if(!is_login){
            navigate('/login');
        }
    });

    const [title, setTitle] = useState('');
    const [subheading, setSubheading] = useState('');
    const [description, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const [user_id, setUserID] = useState(userData._id);
    const [msg, setMsg] = useState('');

    const addProductHandle = async () =>{
      console.log('add product working');
      console.log(title,subheading,description,status,user_id);
      if(title !== '' && subheading !== '' && description !== ''){
        let result = await fetch('http://localhost:7000/add-product',{
          method : 'POST',
          body   : JSON.stringify({ title,subheading,description,status,user_id }),
          headers : {
            "Content-Type" : "application/json",
            authorization : JSON.parse(localStorage.getItem('token'))
          }
        });
        result = await result.json();
        if(result){
          setMsg(result.result);
        }else{
          setMsg('somthing went wrong');
        }
      }else{
        setMsg('All Field is required');
      }
    }

  return (
    <div>
      <h1>Add Product</h1>

      <div>
        <h4>
          { msg }
        </h4>
      </div>

      <div className="container">
            <label>Title</label>
            <input type="text" id="title" name="title" value={title} onChange={ (e) => setTitle(e.target.value) } placeholder="Enter title.."/>

            <label>Sub Heading</label>
            <input type="text" id="subheading" name="subheading" value={subheading} onChange={ (e) => setSubheading(e.target.value) } placeholder="Your last name.."/>

            <label>Description</label>
            <input type="text" id="description" name="description" value={description} onChange={ (e) => setDesc(e.target.value) } placeholder="Your description.."/>

            <label>Check Published Product</label>
            <input type="checkbox" id="status" name="status" value={1} onChange={ (e) => setStatus(e.target.value) }/> <br/><br/>

            <input type="submit" value="Submit" onClick={addProductHandle}/>

        </div>

    </div>
  )
}

export default AddProduct