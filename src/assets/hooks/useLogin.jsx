import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"
import { db } from "../firebase/config"
import { updateDoc, doc } from "firebase/firestore"

export const useLogin = () => {
    const [isPending, setIspending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
    
    const navigate = useNavigate()

    const login = async (auth, email, pass) => {
        try {
          //Login User
          setIspending(true)
          const res = await signInWithEmailAndPassword(auth, email, pass)
          //Update online status
            await updateDoc(doc(db, "users", res.user.uid), {
              online: true
            })
            setIspending(false)
            setError(null)
            dispatch({type: "LOGIN", payload: res.user})
            navigate("/")
        }
        catch(err) {
          console.error(err)
          setError(err)
          setIspending(false)
        }
      }

      return {login, isPending, error}
}