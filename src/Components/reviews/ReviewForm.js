import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../../actions/reviews'
import { Sub } from '../../ui/Styles'

class ReviewForm extends Component {

  state = {
    comment: '',
    isSubmitted: false
  }

  handleOnChange = event => {
    this.setState({
      comment: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.setState({ isSubmitted: true })
    //last two props below were passed in by Redirect when a user hits a review button and this is how to access it with location
    this.props.addReview(this.state.comment, this.props.location.state.trail, this.props.location.state.currentUser)
      //this makes sure the last review is added before rendering /reviews
      .then(() =>
        this.props.history.push(`/trails/${this.props.location.state.trail.id}/reviews`)
      )
  }

  render() {
    if (!this.state.isSubmitted) {
      return (
        < >
          <Sub>{this.props.location.state.trail.name}</Sub>
          <article className="media">
            <form className="media-content" onSubmit={(event) => this.handleOnSubmit(event)}>
              <div className="field">
                <div className="control">
                  <textarea type="text"
                    className="textarea"
                    placeholder="write review of trail here"
                    value={this.state.comment}
                    onChange={event => this.handleOnChange(event)}
                  />
                </div>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <input className="button is-primary " type="submit" value="Submit Review" />
                  </div>
                </div>
              </nav>
            </form>
          </article>
        </>
      )
    }
    return null
  }
}

const mapStateToProps = ({ reviews }) => {
  return {
    reviews
  }
}
export default connect(mapStateToProps, { addReview })(ReviewForm)