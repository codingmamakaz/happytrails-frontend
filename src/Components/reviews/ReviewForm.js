import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../../actions/reviews'
import { Sub } from '../../ui/Styles'
import MyTrailReview from './MyTrailReview'

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
    //last two props below were passed in by Redirect and this is how to access it with location
    this.props.addReview(this.state.comment, this.props.location.state.trail, this.props.location.state.currentUser)
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
    return <MyTrailReview reviewObj={this.props}/>
  }
}

//reviews is the name of the store.
// const mapStateToProps = state => ({ reviews: state.reviews })

const mapStateToProps = ({ reviews }) => {
  return {
    reviews
  }
}
export default connect(mapStateToProps, { addReview })(ReviewForm);