import DashboardList from '../../components/DashboardList'
import ProjectFilter from '../../components/ProjectFilter'
import style from './Dashboard.module.css'
import { useCollection } from '../../hooks/useCollection' 
import { useAuthContext } from '../../hooks/useAuthContext'

import React, { useState } from 'react'

export default function Dashboard() {
    const { doc } = useCollection('projects')
    const [currentFilter, setCurrentFilter] = useState('all')
    const { user } = useAuthContext()
    // const [project, setProject] = useState()
    // let project = {}

    const handleClick = (filter) => {
        setCurrentFilter(filter)
    }



    const project = doc ? doc.filter((filt) => {
        switch (currentFilter) {
            case "all" :
                return true
            case "mine" :
                let assigedTOMe = false
                filt.usersAssigend.forEach((u) => {
                    if(u.id === user.uid){
                        assigedTOMe = true
                    }
                })
                return assigedTOMe
            case "design":
            case "marketing":
            case "sales":
            case "development":
                return filt.category === currentFilter
            default: true
        }
    }): null

  return (
    <div>
        <h2>Projects</h2>
        <br /><br />
        <ProjectFilter handleClick={handleClick} currentFilter={currentFilter}/>
      {project && <DashboardList doc={project} />}
    </div>
  )
}
