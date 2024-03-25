import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  let auth = localStorage.getItem('token');

  const logoutHandling = () =>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>
        <ul className='navbar'>
          {
            auth ? 
                  <>
                    <li className='white-color active'><Link to='/'> Home </Link></li>
                    <li className='white-color'><Link to='/add-product' > Add Product </Link></li>
                    <li className='white-color'><Link to='/profile' > Profile </Link></li>
                    <li className='white-color'><Link to='/login' onClick={logoutHandling} > Logout </Link></li>
                  </>
                 :
                 <>
                    <li className='white-color'><Link to='/sign-up' > Sign Up </Link></li>
                    <li className='white-color'><Link to='/login' > Login </Link></li>
                 </>
          }
        </ul>
    </div>
  )
}
