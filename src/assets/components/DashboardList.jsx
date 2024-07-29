import "./DashboardList.css"
import React, { Fragment } from 'react'
import Avatar from "./Avatar"
import { Link } from "react-router-dom"


export default function DashboardList({doc}) {
    
  return (
    <div className="projectList">
      {doc && doc.map((data) => (
        <Link key={data.id} to={`/project/${data.id}`} className="project">
            <h2>{data.projectName}</h2>
            <p>{data.details.substring(0, 40)} {data.details.length > 40? '...': ""}</p>
            <p>Due Date: {data.dueDate.toDate().toDateString()}</p>
            <div className="imgAvatar">
                {data.usersAssigend.map((user) => (
                    <Fragment key={user.id}>
                        <Avatar img={user.photoURL} imgSize='50px'/>
                    </Fragment>
                ))}
            </div>
        </Link>
      ))}
    </div>
  )
}
