import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Title } from '../ui/Styles'
import Logout from './users/Logout'
import { NavLink } from 'react-router-dom'
import { Button } from "../ui/Styles"

//? can i conditionally render buttons and keep DRY?

export const NavBar = ({ currentUser }) => {
  if (currentUser) {
    return (
      < >
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Title className="title"><Link to="/"><span className="fas fa-hiking"></span></Link>  Happy Trails</Title>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {/* <Logout /> */}
              <Button><NavLink to="/logout" >Logout</NavLink></Button>

              <Button><NavLink to="/my-trails" >My Trails</NavLink></Button>
              <Button><NavLink to="/my-reviews" >My Reviews</NavLink></Button>
              <Button><NavLink to="/">Find more trails</NavLink></Button>
              {/* how do i put if geoComponent is present? */}
            </div>
          </div>
        </nav>
      </>
    )
  }
  return null
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}
export default connect(mapStateToProps)(NavBar)