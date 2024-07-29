import React, { useEffect } from 'react'
import { useNavigate, redirect } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Redirect() {
    const navigate = useNavigate()
    const { user, userLogged} = useAuthContext()
    useEffect(()=>{
        if(!user) {
            return navigate("/Login")
        }
        else {
            return navigate("/")
        }
    }, [])
  return (
    <div>
      
    </div>
  )
}
