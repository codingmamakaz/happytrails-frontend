export const addTrailtoReview = reviewtrail => {
  return {
    type: 'ADD_TRAIL_TO_REVIEW',
    reviewtrail
  }
}

export const clearMyReviews = () => {
  return {
    type: "CLEAR_MY_REVIEWS"
  }
}

const apiURL = 'http://localhost:3000/api/v1'

//When a user clicks "Submit Review" on ReviewForm, this sends
//Post request to create a new review
export const addReview = (comment, trail, currentUser) => {
  return dispatch => {
    let reviewData
    //associating trail reviewed with review using api_trail_id
    if (!trail.api_trail_id) {
      reviewData = {
        review: { comment, api_trail_id: trail.id, api_trail_name: trail.name, api_trail_url: trail.url, user_id: currentUser.id, username: currentUser.username }
      }
    } else {
      reviewData = {
        review: { comment, api_trail_id: trail.api_trail_id, api_trail_name: trail.name, api_trail_url: trail.url, user_id: currentUser.id, username: currentUser.username }
      }
    }
    console.log("reviewData in reviews", reviewData)
    return fetch(`${apiURL}/reviews`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: 'application/json', "Content-Type":
          'application/json'
      },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("data in review", data)
        if (data.error) {
          alert(data.error)
        } else {
          console.log("ADD_SAVE_REVIEW", {
            type: 'ADD_SAVE_REVIEW',
            review: data
          })
          dispatch({
            type: 'ADD_SAVE_REVIEW',
            data
          })
        }
      })
      .catch(console.logs)
  }
}


//This gets all the reviews currentUser created
export const getMyReviews = () => {
  return dispatch => {
    return fetch(`${apiURL}/reviews`, {
      credentials: "include",
      method: "GET",
      hearders: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(reviewsObj => {
        if (reviewsObj.error) {
          alert(reviewsObj.error)
        } else {
          console.log("reviewsObj in reviews", reviewsObj)

          dispatch({
            type: 'GET_MY_REVIEWS',
            reviewsObj
          })
        }
      })
      .catch(console.logs)
  }
}

//deletes a review from my reviews
export const deleteReview = (review_id, history) => {
  return dispatch => {
    return fetch(`${apiURL}/reviews/${review_id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(review => {
        if (review.error) {
          alert(review.error)
        } else {
          dispatch({
            type: 'DELETE_REVIEW',
            review,
            reviewId: review_id
          })
          history.push(`/my-reviews`)
        }
      })
      .catch(console.logs)
  }
}
