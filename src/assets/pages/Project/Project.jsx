import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDoc } from '../../hooks/useDoc'
import ProjectSummary from './ProjectSummary'
import CommentForm from './CommentForm'
import style from './Project.module.css'
import { useFireStore } from '../../hooks/useFireStore'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Project() {
    const { id } = useParams()
    const { data, error} = useDoc("projects", id)
    const { deleteDocuments } = useFireStore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [isOwner, setIsOwner] = useState(false)

    // console.log(data.createdBy.id)
    useEffect(()=>{
        const check = () => {
            if(data) {
                console.log(data.createdBy.id)
                if(data.createdBy.id === user.uid) {
                    setIsOwner(true)
                }
            }
        }
        check()
    }, [data])

    const handleDelete = () => {
        deleteDocuments(id);
        navigate('/Dashboard')
    }



    if(!data) {
        return (
            <div>
                <p className='no-such-doc'>No such Doc Found</p>
            </div>
        )
    }
  return (
    <div className={style.project}>
        <div className={style.summary}>
            {data && <ProjectSummary data={data} />}
            {isOwner && <button onClick={()=>{handleDelete()}}>Complete Project</button>}
        </div>
        {data && <CommentForm id={id} data={data} />}
        {/* delete btn */}
    </div>
  )
}
