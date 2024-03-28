import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const [productData,setProductData] = useState([]);
    useEffect(()=>{
        let is_login = localStorage.getItem('token');
        if(!is_login){
            navigate('/login');
        }
        getProduct();
    },[]);

    const getProduct = async () =>{
      let result = await fetch('http://localhost:7000/get-product',{
        headers : {
          // 'Contact-Type' : 'application/json',
          authorization : JSON.parse(localStorage.getItem('token'))
        }
      });
      result = await result.json();
      setProductData(result.data);
    }

    let displayRecords = productData.map(item=>{
                                              return (
                                                  <tr key={item._id}>
                                                  <td>{ item._id }</td>
                                                  <td>{ item.title }</td>
                                                  <td>{ item.subheading }</td>
                                                  <td>{ item.description }</td>
                                                  <td>{ (item.status === "1") ? 'Published' : 'Draft' }</td>
                                                  <td>
                                                    <button>Edit</button>
                                                  </td>
                                                  <td>
                                                    <button>Delete</button>
                                                  </td>
                                                </tr>
                                              )
                                            })

  return (
    <div>
      <h1>Home</h1>

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

        { displayRecords }

      </tbody>
    </table>


    </div>
  )
}

export default Home