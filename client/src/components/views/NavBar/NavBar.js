import React from 'react';
import RightMenu from './sections/RightMenu';
import './sections/Navbar.css';

function NavBar() {
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          {/* <LeftMenu mode="horizontal" /> */}
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;