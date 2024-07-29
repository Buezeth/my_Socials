import { createContext, useContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    const {type, payload} = action
    switch(type) {
        case "LOGIN" :
            console.log("Login")
            return {...state, user: payload}
        case "SIGNIN" :
            console.log("Signin")
            return {...state, user: payload}
        case "LOGOUT" :
            console.log("logout")
            return {...state, user: null, userLogged: false}
        case "CHANGE_LOG" :
            console.log("Chaned Log")
            return {...state, user: payload, userLogged: true}
        default:
            throw new Error(`No case of type ${type} registered`)
    }
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, userLogged: false})
    
    console.log("Auth User: " + state.user)

    useEffect(()=> {
        const unsub = onAuthStateChanged( auth, (user)=>{
            
            if(user) {
                console.log("Logged In")
                dispatch({type: "CHANGE_LOG", payload: user})
                // unsub()
            }
            else {
                console.log("Not Looged In")
                // dispatch({type: "CHANGE_LOG", payload: user})
            }
        })

        return () => unsub()
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
    
}