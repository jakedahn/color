import './ColorCard.scss'
import React, { useEffect } from 'react'
import moment from 'moment'

import ColorBar from 'Components/ColorBar.jsx'

export const ColorCard = ({ code, colors, likes, created_at, updated_at }) => {
  created_at = moment(created_at, 'YYYY-MM-DDTHH:mm:ssZ')
  const color1 = colors.filter(color => color.position == 1)[0]
  const color2 = colors.filter(color => color.position == 2)[0]
  const color3 = colors.filter(color => color.position == 3)[0]
  const color4 = colors.filter(color => color.position == 4)[0]

  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
      <div className="color-card">
        <div className="palette">
          <ColorBar color={color1.hex} position="primary" />
          <ColorBar color={color2.hex} position="secondary" />
          <ColorBar color={color3.hex} position="third" />
          <ColorBar color={color4.hex} position="fourth" />
        </div>
        <div className="row meta">
          <div className="col-6">
            <a className="like-btn btn-default btn-sm" href="#">❤️ {likes}</a>
          </div>
          <div className="col-6 date">
            <time>{created_at.format("MM/DD/YY")}</time>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorCard;

