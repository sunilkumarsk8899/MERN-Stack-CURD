import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  let auth = localStorage.getItem('token');
  let userData = localStorage.getItem('userData');
  userData = JSON.parse(userData);

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
                    <li className={(location.pathname === '/') ? 'white-color active' : 'white-color'}><Link to='/'> Home </Link></li>
                    <li className={ (location.pathname === '/add-product') ? 'white-color active' : 'white-color' }><Link to='/add-product' > Add Product </Link></li>
                    <li className={ (location.pathname === '/profile') ? 'white-color active' : 'white-color' }><Link to='/profile' > Profile </Link></li>
                    <li className={ (location.pathname === '/login') ? 'white-color active' : 'white-color' }><Link to='/login' onClick={logoutHandling} > Logout ( { userData.first_name+' '+userData.last_name } ) </Link></li>
                  </>
                 :
                 <>
                    <li className={ (location.pathname === '/sign-up') ? 'white-color active' : 'white-color' }><Link to='/sign-up' > Sign Up </Link></li>
                    <li className={ (location.pathname === '/login') ? 'white-color active' : 'white-color' }><Link to='/login' > Login </Link></li>
                 </>
          }
        </ul>
    </div>
  )
}
