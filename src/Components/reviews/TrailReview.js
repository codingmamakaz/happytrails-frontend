import React from 'react'

const TrailReview = ({ review }) => {

  const dateArr = review.created_at.match(/[^T]*/g)
  const dateCreated = dateArr[0]
  return (
    <>
      <div className="message">
        <div className="message-body has-background-white">
          {review.comment} - reviewed by {review.username} on {dateCreated}
        </div>

      </div>
    </>
  );
}

export default TrailReview

