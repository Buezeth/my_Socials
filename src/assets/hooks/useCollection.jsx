import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore"



export const useCollection = (coll, queryArg) => {
    const [doc, setDoc] = useState()
    const [error, setError] = useState(null)

    
    useEffect(()=>{
        let q = collection(db, coll);
        if(queryArg) {
            q = query(collection(db, coll), where(...queryArg))
            // q = query(collection(db, coll), where(...queryArg), orderBy("createdAt"))
        }
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                const database = []
                querySnapshot.forEach((element) => {
                    // console.log(element.data())
                    database.push({...element.data(), id: element.id})
                });
                setDoc(database)
            } catch(err) {
                console.error(err)
                setError("Couldn't fetch data")
            }
    
        })
        return ()=> unsubscribe()

    }, [])
    
    return { doc, error }
}