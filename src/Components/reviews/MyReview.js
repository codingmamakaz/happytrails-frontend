import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteReview } from '../../actions/reviews'
import { createBrowserHistory } from "history";

class MyReview extends Component {

  render() {
    const history = createBrowserHistory()

    const { review } = this.props
    return (
      <>
        <article className="message">
          <div className="message-header has-background-white">
            <div className="has-text-primary"><a href={review.api_trail_url} target="_blank" rel="noopener noreferrer"><span className="icon is-small"><i className="fas fa-link"></i></span> {review.api_trail_name}</a></div>
            <div className="message-right">
              <button onClick={() => { this.props.deleteReview(this.props.review_id, history) }} className="fas fa-trash-alt"></button>
            </div>
          </div>
          <div className="message-body has-background-white">
            {review.comment}
          </div>
        </article>
      </>
    )
  }
}
const mapStateToProps = state => ({ reviews: state.reviews })

export default connect(mapStateToProps, { deleteReview })(MyReview)