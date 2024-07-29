import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { NavLink } from 'react-router-dom'
import dashboard from '../icons/dashboard_icon.svg'
import add from '../icons/add_icon.svg'
import { getDoc, doc } from 'firebase/firestore'
import { useAuthContext } from '../hooks/useAuthContext'
import { db } from '../firebase/config'
import defaultUser from '../icons/defaultUser.png'

export default function sidebar() {
  const { user } = useAuthContext()
  const [userDoc, setUserDoc] = useState(null)
  const [userName, setUserName] = useState(null)

  useEffect(()=> {
    const getUserDoc = async () => {
      const docRef = await getDoc(doc(db, "users", user.uid))
      setUserDoc(docRef.data().photoURL)
      setUserName(docRef.data().displayName)
      console.log(userDoc)
    }

    setTimeout(()=>{
      getUserDoc()
    }, 5000)

  }, [userDoc])

  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='user-pic'>
          {/* user name and picture here */}
          {userDoc && <img src={userDoc} alt="UserPic" />}
          {!userDoc && <img src={defaultUser} alt="UserPic" />}
          {/* <h2>{user.uid}</h2> */}
        </div>
        <div className='hello'>
          {userName && <h2>Hello, {userName}</h2>}
        </div>
        <ul className='list-nav'>
            <li>
                <NavLink to='/Dashboard'> <img src={dashboard} alt="dashboard icon" /> <span>Dashboard</span> </NavLink>
            </li>
            <li>
                <NavLink to='/Create'> <img src={add} alt="add icon" /> <span>Create New Project</span></NavLink>
            </li>
        </ul>
      </div>
    </div>
  )
}
