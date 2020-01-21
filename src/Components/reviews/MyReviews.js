import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyReview from './MyReview'
import { getMyReviews } from '../../actions/reviews'
import { Sub } from '../../ui/Styles'

const MyReviews = () => {
  //getting reviews from Redux store - replacement of the mapStateToProps
  const reviews = useSelector(state => state.reviews)
  const dispatch = useDispatch()
  //using useEffect hook to replace componentDidUpdate in function component
  useEffect(() => {
    dispatch(getMyReviews())
  })

  const reviewArr = reviews.currentUserReviews.map(review => {
    return (
      <MyReview
        key={review.id}
        review={review.attributes}
        review_id={review.id}
      />
    )
  })
  return (
    < >
      {reviews.currentUserReviews.length === 0 ? <Sub className="has-text-black">You haven't created any reviews</Sub> : null}
      {reviewArr.reverse()}
    </>
  )
}
export default MyReviews
