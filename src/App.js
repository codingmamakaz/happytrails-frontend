import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/users/Login'
import Logout from './components/users/Logout'
import Signup from './components/users/Signup'
import MyTrails from './components/trails/MyTrails'
import ReviewForm from './components/reviews/ReviewForm'
import MyReviews from './components/reviews/MyReviews'
import TrailReviews from './components/reviews/TrailReviews'
import { getCurrentUser } from './actions/currentUser'

class App extends Component {

  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const { loggedIn } = this.props

    return (
      <div className="App">
        <section className="hero is-fullheight has-background is-transparent">
          {loggedIn ? <NavBar location={this.props.location} /> : null}
          <div className="hero-body">
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <Route path='/my-trails' render={(props) => <MyTrails {...props} myTrails={this.props.myTrails} />} />
                <Route exact path='/reviews/new' component={ReviewForm} />
                <Route path='/my-reviews' render={(props) => <MyReviews {...props} reviews={this.props.reviews} />} />
                <Route exact path='/trails/:trail_id/reviews' component={TrailReviews} />
              </Switch>
            </div>
          </div>
        </section>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.currentUser,
    reviews: state.reviews,
    trails: state.trails
  }
}

export default connect(mapStateToProps, { getCurrentUser })(App)