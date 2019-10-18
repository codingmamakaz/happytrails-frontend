import React, { Component } from 'react';
import { connect } from 'react-redux'
import TrailReview from './TrailReview'
import { getMyReviews } from '../../actions/reviews'

class TrailReviews extends Component {

  //this is to make sure whenever a user refreshes a screen, the reviews are here again.
  componentDidMount() {
    this.props.getMyReviews()
  }

  render() {

    let newlyCreatedReviewObj
    let trailName
    let trailUrl

    newlyCreatedReviewObj = this.props.reviews.currentUserReviews[this.props.reviews.currentUserReviews.length - 1]
    trailName = newlyCreatedReviewObj && newlyCreatedReviewObj.attributes.api_trail_name
    trailUrl = newlyCreatedReviewObj && newlyCreatedReviewObj.attributes.api_trail_url

    const reviewArr = newlyCreatedReviewObj && newlyCreatedReviewObj.attributes.api_reviews.map(review => {

      return (

        <TrailReview
          key={review.id}
          review={review}
        />

      )
    })
    return (
      <div className="has-background-white">
        <div className="is-size-4 has-text-weight-bold"><a href={trailUrl} target="_blank" rel="noopener noreferrer"><span className="icon is-small"><i className="fas fa-link"></i></span> {trailName}</a>
          {reviewArr}
        </div >
      </div>
    )
  }
}

const mapStateToProps = state => ({ reviews: state.reviews })

export default connect(mapStateToProps, { getMyReviews })(TrailReviews)