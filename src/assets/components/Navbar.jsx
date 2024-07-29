import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogOut } from '../hooks/useLogOut'

export default function Navbar() {
    const { user } = useAuthContext()
    const { logOut } = useLogOut()
    let style = ''
    user ? style = "navBar side-paddinging": style = "navBar"
  return (
    <nav className={style}>
        <ul className='home-logo'>
            <li>
                <Link to='/'>mySocial</Link>
            </li>
        </ul>
        {!user && <ul className='signup-login'>
            <li>
                <Link to='/Login'>Login</Link>
            </li>
            <li>
                <Link to='/Signup'>Signup</Link>
            </li>
        </ul>}

        {user && <ul className='logged-in'>
            <button onClick={()=>{logOut()}}>LogOut</button>
        </ul>}
      
    </nav>
  )
}
