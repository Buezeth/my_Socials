import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useSignIn = ( ) => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isPending, setIspending] = useState(false)
    const { dispatch } = useAuthContext()



    const signup = async (auth, email, pass, username, thumbnail) => {
        setIspending(true)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, pass, username)

            const uplaodRef = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const storageRef = ref(storage, uplaodRef)
            

            // Store img url 
            await uploadBytes(storageRef, thumbnail)
            .then((snapshot) => {
                // Image uploaded successfully, get the download URL
                getDownloadURL(snapshot.ref)
                .then( async (url) => {
                    // url contains the downloadable image URL
                    await setDoc(doc(db, "users", res.user.uid), {
                        online: true,
                        displayName: username,
                        photoURL: url
                    })

                    //update profile
                    await updateProfile( res.user , {
                        displayName: username,
                        photoURL: url
                    })
                        .then(()=>{console.log(res.user.displayName)})
                        .catch((err)=>{console.error(err)})
                    setIspending(false)
                    setError(false)
        
                    dispatch({type: "SIGNIN", payload: res.user})
                    navigate("/")
                    console.log("Image URL:", url);
                    // You can store the URL in state or use it for other purposes
                })
                .catch((error) => {
                    // Handle errors while getting the download URL
                    console.error("Error getting download URL:", error);
                });
            })
            .catch((error) => {
                // Handle errors during image upload
                console.error("Error uploading image:", error);
            });

            // add user document
            

            
            
            //Display name for user

            // navigate("/")
        }
        catch(err) {
            console.error(err)
            setError(err.message)
            setIspending(false)
        }
        
    }

    return { signup, error, isPending }
}