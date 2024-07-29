import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import './UserList.css'
import Avatar from './Avatar'

export default function UserList() {
    const { doc } = useCollection("users")
    const { user } = useAuthContext()
    const [filteredData, setFilteredData] = useState()

    useEffect(()=>{
        if(doc) {
            setFilteredData(doc.filter((item) => {
                return item.id !== user.uid
            }))
            console.log(filteredData)
        }
    }, [doc])

  return (
    <div className='userList'>
      <h3>All Users</h3>
      { filteredData && filteredData.map((element) => (
        <div key={element.id} className='userData'>
            <Avatar img={element.photoURL} />
            <p>{element.displayName}</p>
            {element.online && <div className='online'></div>}
            {element.online || <div className='offnline'></div>}
        </div>
      ))}
    </div>
  )
}
