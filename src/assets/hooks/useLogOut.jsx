// import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { auth } from "../firebase/config"
import { db } from "../firebase/config"
import { updateDoc, doc } from "firebase/firestore"

export const useLogOut = ()=> {
    const [error, setError] = useState(null)
    const [isPending, setIspending] = useState(false)
    const { dispatch, user } = useAuthContext()
    const navigate = useNavigate()
    
    const logOut = async ()=> {
        try {
            await updateDoc(doc(db, "users", user.uid), {
                online: false
            })
            setIspending(true)
            await signOut(auth)
            navigate("/Login")
            setIspending(false)
            setError(null)
            dispatch({type: "LOGOUT"})
        }
        catch(err) {
            console.error(err)
            setError(err)
            setIspending(false)
        }
    }

    return {logOut, isPending, error}
}
