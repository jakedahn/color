import './Header.scss'
import React from 'react';

export const Header = () => {
  return (
    <nav className="header">
      <h1><a href='https://color.lol/' className="brand">color.lol</a></h1>
      <ul className="header-nav-links">
        <li><a className="nav-link" href="#" disabled>/* About */</a></li>
      </ul>
    </nav>
  )
}

export default Header

