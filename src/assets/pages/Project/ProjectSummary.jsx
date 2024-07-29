import React from 'react'
import './ProjectSummary.css'
import { useDoc } from '../../hooks/useDoc'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react'
import Avatar from '../../components/Avatar'

export default function ProjectSummary({data}) {
    

  return (
    <div className='projectSummary'>
        <h1>{data.projectName}</h1>
        <br /><br />
        <b>Project Detail :</b>
        <br /><br />
        <p>{data.details}</p>
        <br /><br />
        <p><b>Due Date:</b> {data.dueDate.toDate().toDateString()}</p>
        <br /><br />
        <b>Assigned User(s): </b>
        <div className="imgAvatar">
            {data.usersAssigend.map((user) => (
                <Fragment key={user.id}>
                    <Avatar img={user.photoURL} imgSize="50px" />
                </Fragment>
            ))}
        </div>
    </div>
  )
}
