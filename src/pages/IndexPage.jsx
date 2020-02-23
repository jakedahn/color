import React, { useEffect } from 'react';
import ColorGrid from 'Components/ColorGrid.jsx'
import colors from './color-data.js'

import Header from 'Components/Header.jsx'
export const IndexPage = ({ data }) => {
  // const { ui, entity: taxes } = useSelector(state => state.taxes)
  // useEffect(() => { window.analytics.page('IndexPage') }, [data])


  return (
    <div className="index-page">
      <Header />
      <div className="container">
        <ColorGrid />
      </div>
    </div>
  )
}

export default IndexPage;
