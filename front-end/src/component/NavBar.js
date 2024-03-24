import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
        <ul className='navbar'>
            <li className='white-color active'><Link to='/'> Home </Link></li>
            <li className='white-color'><Link to='/add-product' > Add Product </Link></li>
            <li className='white-color'><Link to='/profile' > Profile </Link></li>
            <li className='white-color'><Link to='/sign-up' > Sign Up </Link></li>
            <li className='white-color'><Link to='/login' > Login </Link></li>
            <li className='white-color'><Link to='/logout' > Logout </Link></li>
        </ul>
    </div>
  )
}
