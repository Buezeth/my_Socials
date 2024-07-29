import React, { useState, useEffect } from 'react'
import style from './Signup.module.css'
import { useSignIn } from '../../hooks/useSignIn'
import { auth } from '../../firebase/config'

export default function Signup() {
  const [email, setEmail] = useState()
  const [pass, setPass] = useState()
  const [displayName, setDisplayName] = useState()
  const { signup, isPending } = useSignIn()
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const [canSignUp, setCanSignUp] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!error && canSignUp) {
      // console.log("email: " + email + " pass: " + pass)
      signup(auth, email, pass, displayName, thumbnail)
    }
  }

  useEffect(()=>{
    if(email && displayName && pass) {
      setCanSignUp(true)
    }
    else {
      setCanSignUp(false)
    }
  }, [email, pass, displayName])

  const handleFileChange = (e) => {
    let selected = e.target.files[0]
    
    if(!selected) {
      setThumbnailError("Please select a file")
      return
    }
    if(!selected.type.includes("image")) {
      setThumbnailError('Selected file must be an Image')
      return
    }
    if(selected.size > 200000) {
      setThumbnailError('Image size must be less than 100kb')
      return
    }
    
    setThumbnailError(null)
    setThumbnail(selected)
    console.log(thumbnail)
  }

  return (
    <div>
      <form onSubmit={(e)=>(handleSubmit(e))} className={style.signIn}>
      <h1>Signup</h1>
        <label>
          <span>Email</span>
          <input type="email" placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </label>
        <label>
          <span>Display Name</span>
          <input type="text" placeholder='Enter Display name' onChange={(e)=>{setDisplayName(e.target.value)}}/>
        </label>
        <label>
          <span>Password</span>
          <input type="password" placeholder='Enter Password' onChange={(e)=>{setPass(e.target.value)}}/>
        </label>
        <label>
          <span>Thumbnail</span>
          <input type="file" onChange={(e)=>{handleFileChange(e)}}/>
          {thumbnailError && <div>{thumbnailError}</div>}
        </label>

        <button type='submit' className={canSignUp ? style.active: style.inactive}>Signin</button>
      </form>
    </div>
  )
}
