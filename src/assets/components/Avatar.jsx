import React, { Fragment } from 'react'
import './Avatar.css'

export default function Avatar({img, imgSize}) {
  const myStyle = {
    width : imgSize,
    height: imgSize
  }
  return (
    <Fragment>
      <div className='userPhoto' style={myStyle}><img src={img} alt="" width={imgSize} /></div>
    </Fragment>
  )
}
