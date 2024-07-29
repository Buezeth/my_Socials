import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './assets/pages/Home/Home'
import Login from './assets/pages/Login/Login'
import Create from './assets/pages/Create/Create'
import Signup from './assets/pages/Signup/Signup'
import Navbar from './assets/components/Navbar'
import Sidebar from './assets/components/Sidebar'
import UserList from './assets/components/UserList'
import { auth } from './assets/firebase/config'
import { useAuthContext } from './assets/hooks/useAuthContext'
import Dashboard from './assets/pages/Dashboard/Dashboard'
import Project from './assets/pages/Project/Project'
import Redirect from './assets/pages/Redirect'

function App() {
  const [count, setCount] = useState(0)
  const { user, userLogged } = useAuthContext()
  let style = ''
  user ? style = "main-page side-padding": style = "main-page"

  return (
    <div className='App'>
    <div className='nav-side-bar'>
      {user && <Sidebar />}
      <Navbar />
    </div>
    <div className={style}>
        <Routes>
    
          <Route element={!user ? <Login />:<Redirect />}  path='/Login' />
          <Route element={!user? <Signup />: <Redirect />} path='/Signup' />
          <Route element={user? <Home />: <Redirect />} path='/' />
          {userLogged && <Route element={<Create />} path='/Create' />}
          {userLogged && <Route element={<Dashboard />} path='/Dashboard' />}
          {userLogged && <Route element={<Project />} path='/project/:id' />}
          {/* Catch-all route for non-existent paths */}
          {<Route path="*" element={<Navigate to="/" replace />} />}

        </Routes>
    </div>
    { user && <div className='right-SideBar'>
      <UserList />
    </div>}
    </div>
  )
}

export default App

