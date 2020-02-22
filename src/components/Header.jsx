import './Header.scss'
import React, {useState, useEffect} from 'react';

import HamburgerMenu from "Assets/images/icons/HamburgerMenu.svg";
 
export const Header = () => {
  const [show, setShow] = useState(false)

  const handleCollapseClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <div className="app-navbar mb-4 mt-4">
      <div className="container px-4 px-sm-0">
        <nav className="navbar navbar-expand-md navbar-light">      
          <a href='https://color.lol/' className="brand">
            <h1>color.lol</h1>
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" onClick={handleCollapseClick}>
            <HamburgerMenu />
          </button>

          <div className={`collapse navbar-collapse ${show ? 'show' : ''}`} id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* rel="canonical"*/}
                <a className="nav-link" href="#" disabled>/* About */</a>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header

