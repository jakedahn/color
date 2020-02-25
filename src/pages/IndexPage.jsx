import React, { useEffect } from 'react';

import ColorGrid from 'Components/ColorGrid.jsx'
import Header from 'Components/Header.jsx'

export const IndexPage = () => {
  return (
    <div className="index-page">
      <Header />
      <ColorGrid />
    </div>
  )
}

export default IndexPage;
