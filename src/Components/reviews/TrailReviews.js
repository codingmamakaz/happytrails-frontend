import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TrailReview from './TrailReview'
import { getMyReviews } from '../../actions/reviews'

const TrailReviews = () => {
  const reviews = useSelector(state => state.reviews)
  const dispatch = useDispatch()

  //this is to make sure whenever a user refreshes a screen, the reviews are here again.
  useEffect(() => {
    dispatch(getMyReviews())
  })

  let newlyCreatedReviewObj
  let trailName
  let trailUrl

  newlyCreatedReviewObj = reviews.currentUserReviews[reviews.currentUserReviews.length - 1]
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
        {reviewArr.reverse()}
      </div >
    </div>
  )
}
export default TrailReviews
