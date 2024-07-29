import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore"

export const useDoc = (coll, id) => {

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    const docRef = doc(collection(db, coll), id)

    useEffect(() => {

        const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
            try {
                setIsPending(true)
                const database = querySnapshot.data()
                setData(database)
                setIsPending(false)
            } catch(err) {
                console.error(err)
                setIsPending(false)
                setError("Couldn't fetch data")
            }
    
        })
     
        return ()=> unsubscribe()
      }, []);

    return { data, error, isPending}
}