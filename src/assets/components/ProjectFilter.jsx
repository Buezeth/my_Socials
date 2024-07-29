import React from 'react'
import './ProjectFilter.css'
const filterList = ['all', 'mine', 'design', 'development', 'marketing', 'sales']

export default function ProjectFilter({handleClick, currentFilter}) {
    
  return (
    <div className='filterList'>
        <p>Filter: </p>
      {filterList.map((f) =>(
        <button key={f} onClick={() => handleClick(f)} className={currentFilter === f ? 'active': ''}>{f}</button>
      ))}
    </div>
  )
}
