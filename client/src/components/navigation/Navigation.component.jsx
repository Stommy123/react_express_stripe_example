import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = _ => (
  <header className='main-header'>
    <nav className='nav main-nav'>
      <NavLink exact to='/'>
        HOME
      </NavLink>
      <NavLink to='/store'>STORE</NavLink>
      <NavLink to='/about'>ABOUT</NavLink>
      <NavLink to='/contact'>CONTACT</NavLink>
    </nav>
    <h1>E-Commerce Clone</h1>
  </header>
);

export default Navigation;
