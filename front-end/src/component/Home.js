import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        let is_login = localStorage.getItem('token');
        if(!is_login){
            navigate('/login');
        }
    });

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home