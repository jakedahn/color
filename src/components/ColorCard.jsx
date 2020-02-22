import './ColorCard.scss'
import React, { useEffect } from 'react'

import ColorBar from 'Components/ColorBar.jsx'


export const ColorCard = ({ id, date, likes, code }) => {
  const color1 = code.substring(0, 6)
  const color2 = code.substring(6, 12)
  const color3 = code.substring(12, 18)
  const color4 = code.substring(18, 24)

  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div className="color-card">
        <div className="palette">
          <ColorBar color={color1} position="primary" />
          <ColorBar color={color2} position="secondary" />
          <ColorBar color={color3} position="third" />
          <ColorBar color={color4} position="fourth" />
        </div>
        <div className="row meta">
          <div className="col-6">
            <a className="like-btn btn-default btn-sm" href="#">❤️ {likes}</a>
          </div>
          <div className="col-6 date">
            <time>{date}</time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorCard;

