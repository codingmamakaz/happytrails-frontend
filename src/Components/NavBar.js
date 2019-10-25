import React from 'react';
import { Link } from 'react-router-dom'
import { Title } from '../ui/Styles'
import { NavLink } from 'react-router-dom'
import { Button } from "../ui/Styles"

export const NavBar = () => {
  return (
    < >
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Title className="title"><Link to="/"><span className="fas fa-hiking"></span></Link>  Happy Trails</Title>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Button><NavLink to="/" >Home</NavLink></Button>
            <Button><NavLink to="/logout" >Logout</NavLink></Button>
            <Button><NavLink to="/search">Find Trails</NavLink></Button>
            <Button><NavLink to="/my-reviews" >My Reviews</NavLink></Button>
            <Button><NavLink to="/my-trails" >My Saved Trails</NavLink></Button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar