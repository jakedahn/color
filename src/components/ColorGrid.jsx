import './ColorGrid.scss'
import React, { useEffect } from 'react';
import ColorCard from './ColorCard.jsx'

import colors from 'Pages/color-data.js'

export const ColorGrid = ({ data }) => {
  return (
    <div className="color-grid row">
      {colors.map((color, i) => {
        return <ColorCard key={i} id={color.id} code={color.code} date={color.date} likes={color.likes} />
      })}
    </div>
  )
}

export default ColorGrid;
