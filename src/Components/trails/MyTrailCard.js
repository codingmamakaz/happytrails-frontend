import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBrowserHistory } from "history";
import { saveTrail, deleteSavedTrail } from '../../actions/trails'
import { addTrailtoReview } from '../../actions/reviews'
import { Redirect } from 'react-router';

class MyTrailCard extends Component {

  state = {
    reviewClicked: false,
  }

  handleReviewClick = event => {
    event.preventDefault()
    this.props.addTrailtoReview(this.props.trail)
    this.setState({ reviewClicked: true, redirect: true })
  }

  render() {
    const history = createBrowserHistory()
    const { trail } = this.props
    if (!this.state.reviewClicked) {
      return (
        <div className="box card column is-3" >
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={trail.imgSmallMed ? (trail.imgSmallMed) : ("http://appalachiantrail.org/images/default-source/default-album/trailfocus.jpg?sfvrsn=2")} alt={trail.name} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <a className="title is-4" href={trail.url} target="_blank" rel="noopener noreferrer">{trail.name}</a>
              </div>
            </div>

            <div className="content">
              {trail.summary}
            </div>

            <footer className="card-footer">
              <a href="/reviews/new" className="card-footer-item has-text-black"
                onClick={event => this.handleReviewClick(event)}> <i className="fas fa-comments"></i>  Review</a>
              <button className="card-footer-item has-text-black"
                onClick={() => { this.props.deleteSavedTrail(trail.api_trail_id, history) }} ><i className="fas fa-trash-alt"></i>Delete</button>
            </footer >
          </div>
        </div>
      )
    }
    //redirecting to ReviewForm and passing props
    return <Redirect to={{
      pathname: '/reviews/new',
      state: { trail: trail, currentUser: this.props.currentUser }
    }
    }
    />
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  }
}
export default connect(mapStateToProps, { saveTrail, addTrailtoReview, deleteSavedTrail })(MyTrailCard)


