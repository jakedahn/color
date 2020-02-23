import './ColorBar.scss'
import React, { useEffect } from 'react'


export const ColorBar = ({ color, position }) => {
  return (
    <div className={`color-bar ${position}`} style={{background: `${color}`}}>
      <span className="color-label">{`${color}`}</span>
    </div>
  )
}

export default ColorBar;

