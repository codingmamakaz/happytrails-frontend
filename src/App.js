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
import EditReview from './components/reviews/EditReview'
//Not sure why, but it stopped compiling with trails/GeoForm and having lowercase geoForm works
import GeoForm from './components/trails/geoForm'
import { getCurrentUser } from './actions/currentUser'

class App extends Component {

  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const { currentUser } = this.props

    return (
      <div className="App">
        <section className="hero is-fullheight has-background is-transparent">
          {currentUser ? <NavBar location={this.props.location} /> : null}
          <div className="hero-body">
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/search' component={GeoForm} />
                <Route path='/my-trails' render={(props) => <MyTrails {...props} myTrails={this.props.myTrails} />} />
                <Route exact path='/reviews/new' component={ReviewForm} />
                <Route path='/my-reviews' render={(props) => <MyReviews {...props} reviews={this.props.reviews} />} />
                <Route exact path='/trails/:trail_id/reviews' component={TrailReviews} />
                <Route exact path='/reviews/:review_id/edit' component={EditReview} />
              </Switch>
            </div>
          </div>
          {currentUser ? <div className="hero-foot has-text-white	"><h2>Logged in as {currentUser.username}</h2></div> : null}
        </section>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    reviews: state.reviews,
    trails: state.trails
  }
}

export default connect(mapStateToProps, { getCurrentUser })(App)

