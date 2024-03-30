import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const [productData,setProductData] = useState([]);
    const [msg ,setMsg] = useState('');
    const [isedit, setIsEdit] = useState(false);

    let userData = localStorage.getItem('userData');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subheading, setSubHeading] = useState('');

    useEffect(()=>{
        let is_login = localStorage.getItem('token');
        if(!is_login){
            navigate('/login');
        }
        getProduct();
        
    },[]);

    /**
     * get products
     */
    const getProduct = async () =>{
      let userID = JSON.parse(userData);
      let result = await fetch(`http://localhost:7000/get-product/${userID._id}`,{
        headers : {
          'Contact-Type' : 'application/json',
          authorization : JSON.parse(localStorage.getItem('token'))
        }
      });
      result = await result.json();
      if(result){
        setProductData(result.data);
      }else{
        setProductData([]);
      }
    }

    /**
     * delete product
     */
    const deleteProductHandle = async (e) =>{
      if(window.confirm('Are You Sure?')){
        let result = await fetch(`http://localhost:7000/delete-product/${e.target.value}`,{
          method : 'Delete',
          headers : {
            authorization : JSON.parse(localStorage.getItem('token'))
          }
        });
        result = await result.json();
        if(result){
          setMsg(result.result);
          getProduct();
          setTimeout(() => { setMsg(''); }, 3000);
        }
      }
    }

    /**
     * edit product
     */
    const editProductHandle = (e) =>{
      let id = e.target.value;
      setIsEdit(id);
    }

    /**
     * update product
     */
    const udpateProductHandle = async (itemId) =>{

      if(!title || !subheading || !description){
        const editedItem = productData && productData.find(item => item._id === itemId);
        const { title, subheading, description,status,user_id } = editedItem;
        console.log(title, subheading, description,status,user_id);
        setTitle(title);
        setSubHeading(subheading);
        setDescription(description);
        // setMsg('You Nothing edit in fields');
        // return;
      }
      console.log(title,subheading,description);

      let result = await fetch(`http://localhost:7000/update-product/${itemId}`,{
        method : 'Put',
        body : JSON.stringify({title,subheading,description}),
        headers : {
          "Content-Type": "application/json",
          authorization : JSON.parse(localStorage.getItem('token'))
        }
      });

      result = await result.json();
      if(result){
        setMsg(result.result);
      }
    }

    /**
     * cancel
     */
    const cancelHandle = () =>{
      setIsEdit(false);
      console.log('cancel');
    }

    /**
     * status change
     */
    const stautsChangeHandle = async (status,id) =>{
      console.log(status,id);
      let result = await fetch(`http://localhost:7000/update-product/${id}`,{
        method : 'Put',
        body : JSON.stringify({status}),
        headers : {
          "Content-Type": "application/json",
          authorization : JSON.parse(localStorage.getItem('token'))
        }
      });

      result = await result.json();
      if(result){
        setMsg('Status Update Successfully');
        getProduct();
      }
    }

  return (
    <div>
      <h1>Home</h1>
      <h3> { msg } </h3>

    <table style={{width:"90%",margin:'auto'}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Sub Heading</th>
          <th>Description</th>
          <th>Status</th>
          <th colSpan={'2'}>Action</th>
        </tr>
      </thead>

      <tbody>

        {
          productData && productData.map(item=>{
            return (
                <tr key={item._id}>
                  <td>{ item._id }</td>
                  <td className={ (isedit === item._id) ? 'hide-input' : ''}>{ item.title }</td>
                    
                    <td className={ (isedit === item._id) ? '' : 'hide-input'}><input type="text" defaultValue={item.title} onChange={ (e) => setTitle(e.target.value) } /></td>
                  
                  <td className={ (isedit === item._id) ? 'hide-input' : ''}>{ item.subheading }</td>
                    
                    <td className={ (isedit === item._id) ? '' : 'hide-input'}><input type="text" defaultValue={item.subheading} onChange={ (e) => setSubHeading(e.target.value) } /></td>
                  
                  <td className={ (isedit === item._id) ? 'hide-input' : ''}>{ item.description }</td>
                    
                    <td className={ (isedit === item._id) ? '' : 'hide-input'}><input type="text" defaultValue={item.description} onChange={(e) => setDescription(e.target.value) } /></td>
                  
                  <td onClick={(e) => stautsChangeHandle( (item.status === "1") ? 0 : 1,item._id )}>{ (item.status === "1") ? <span className="published_tag">Published</span> : <span className="draft_tag">Draft</span> }</td>
                  <td>
                    {
                      (isedit === item._id) ? 
                      
                      <button
                        className='btn-btn-success'
                        value={item._id}
                        onClick={ () => udpateProductHandle(item._id) }
                      >Update</button>

                      : 

                      <button
                        className='btn-btn-primary'
                        value={item._id}
                        onClick={editProductHandle}
                      >Edit</button>
                    }

                  </td>
                  <td>
                    {
                      (isedit === item._id) ?

                      <button
                        className='btn-btn-danger'
                        value={item._id}
                        onClick={cancelHandle}
                      >Cancel</button>
                      :
                      <button
                        className='btn-btn-danger'
                        value={item._id}
                        onClick={deleteProductHandle}
                      >Delete</button>
                    }
                  </td>
              </tr>
            )
          })
        }

      </tbody>
    </table>


    </div>
  )
}

export default Home