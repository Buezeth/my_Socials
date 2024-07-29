import React, { useState, useEffect } from 'react'
import style from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'
import { auth } from '../../firebase/config'

export default function Login() {

  const [email, setEmail] = useState()
  const [pass, setPass] = useState()
  const { login, isPending } = useLogin()
  const [canLogin, setCanLogin] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email + " and " + pass)
    if(canLogin) {
      login(auth, email, pass)
    }
  }

  useEffect(()=>{
    if(pass && email) {
      setCanLogin(true)
    }
    else {
      setCanLogin(false)
    }
  }, [pass, email])


  return (
    <div>
      <form className={style.form} onSubmit={(e)=>(handleSubmit(e))}>
      <h1 className={style.login}>Login</h1>
        <label>
          <span>Email</span>
          <input type="email" placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </label>
        <label>
          <span>Password</span>
          <input type="password" placeholder='Enter Password' onChange={(e)=>{setPass(e.target.value)}}/>
        </label>

        <button className={canLogin ? style.active : style.inactive} type='submit'>Login</button>
      </form>
    </div>
  )
}
