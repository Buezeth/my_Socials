import style from './Create.module.css'

import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useCollection } from '../../hooks/useCollection'
import { Timestamp } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFireStore } from '../../hooks/useFireStore'
import { useNavigate } from 'react-router-dom'
export default function Create() {

  const { user } = useAuthContext()
  const { addDocument, response} = useFireStore("projects")
  const [fieldError, setFieldError] = useState(null)
  const navigate = useNavigate()

  //Fields
  const { doc } = useCollection('users')
  const [projectName, setProjectName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState(null)
  const [assignedUserList, setAssignedUserList] = useState([])
  const [assignedUser, setAssignedUser] = useState(null)

  const categoryList = [
    {value: 'development', label: 'Development'},
    {value: 'design', label: 'Design'},
    {value: 'marketing', label: 'Marketing'},
    {value: 'sales', label: 'Sales'},
  ]
  const animateComponent = makeAnimated()

  useEffect(()=>{
    if(doc) {
      const users = doc.map((user) => {
        return {value: user, label: user.displayName }
      })
      setAssignedUserList(users)
    }
  }, [doc])


  //Save Project to firestore
  const handleSubmit = (e) => {
    e.preventDefault()

    //Check for Errors
    if(!category) {
      setFieldError("Most Enter a category")
      return
    }
    if(!assignedUser) {
      setFieldError("Most Assigne a user")
      return
    }

    setFieldError(null)
    //Project Document
    const usersAssigend = assignedUser.map((u) => {
        return {
          displayName : u.value.displayName,
          id : u.value.id,
          photoURL: u.value.photoURL
        }
      })

      const createdBy = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid
      }
    
    const project = {
      projectName,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comment: [],
      createdBy,
      usersAssigend
    }
    console.log(project)

    //Send project to firestore
    addDocument(project)
    navigate('/Dashboard')
  }
  return (
    <div>
      <h3>Create New Project</h3>
      <br />

      <form onSubmit={(e)=>{handleSubmit(e)}} className={style.form}>

        <label>
          <span>Project Name</span>
          <input type="text" 
            onChange={(e)=>{setProjectName(e.target.value)}}
            value={projectName}
            required
          />
        </label>

        <label>
          <span>Due date</span>
          <input type="date"
            onChange={(e)=>{setDueDate(e.target.value)}}
            value={dueDate}
            required
           />
        </label>

        <label>
          <span>Project Details</span>
          <textarea 
            onChange={(e)=>{setDetails(e.target.value)}}
            value={details}
            required
          />
        </label>

        <div>
          <span>Category</span>
        <Select
          onChange={(option)=>{setCategory(option)}}
          components={animateComponent}
          options={categoryList}
         />

        </div>

        <div>
          <span>Assign To</span>
        <Select
          onChange={(option)=>{setAssignedUser(option)}}
          components={animateComponent}
          closeMenuOnSelect = {false}
          options={assignedUserList}
          isMulti
         />
        </div>

        {fieldError && <div className={style.fieldError}>{fieldError}</div>}

        <button className='btn' type='submit'>Create Project</button>

      </form>
    </div>
  )
}
