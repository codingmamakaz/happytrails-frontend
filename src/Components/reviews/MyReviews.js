import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyReview from './MyReview'
import { getMyReviews } from '../../actions/reviews'
import { Sub } from '../../ui/Styles'

class MyReviews extends Component {

  //this is to make sure whenever a user refreshes a screen, the reviews are here again.
  componentDidMount() {
    this.props.getMyReviews()
  }

  state = {
    clicked: false
  }

  handleClick = event => {
    event.preventDefault()
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    const reviewArr = this.props.reviews.currentUserReviews.sort(function (a, b) {
      let nameA = a.attributes.api_trail_name.toLowerCase(), nameB = b.attributes.api_trail_name.toLowerCase()
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else {
        return 0
      }
    })
    const newArr = reviewArr.map(review => {
      return (
        <MyReview
          key={review.id}
          review={review.attributes}
          review_id={review.id}
        />
      )
    })

    const regArr = this.props.reviews.currentUserReviews.filter(review => {
      return review.attributes.api_trail_name === "Muir Beach Loop"
    })
    const fuk = regArr.map(review => {
      return (
        <MyReview
          key={review.id}
          review={review.attributes}
          review_id={review.id}
        />
      )
    })

    if (!this.state.clicked) {
      return (
        < >
          <button onClick={this.handleClick}>click me</button>
          {this.props.reviews.currentUserReviews.length === 0 ? <Sub className="has-text-black">You haven't created any reviews</Sub> : null}
          {newArr}
        </>
      )
    } else {
      return (
        < >
          <button onClick={this.handleClick}>click me</button>
          {/* {this.props.reviews.currentUserReviews.length === 0 ? <Sub className="has-text-black">You haven't created any reviews</Sub> : null} */}
          {/* {regArr} */}
          {fuk}
          <p>hey</p>
        </>
      )
    }

  }
}
const mapStateToProps = state => ({ reviews: state.reviews })
export default connect(mapStateToProps, { getMyReviews })(MyReviews)



// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import MyReview from './MyReview'
// import { getMyReviews } from '../../actions/reviews'
// import { Sub } from '../../ui/Styles'

// class MyReviews extends Component {

//   //this is to make sure whenever a user refreshes a screen, the reviews are here again.
//   componentDidMount() {
//     this.props.getMyReviews()
//   }

//   render() {
//     const reviewArr = this.props.reviews.currentUserReviews.map(review => {
//       return (
//         <MyReview
//           key={review.id}
//           review={review.attributes}
//           review_id={review.id}
//         />
//       )
//     })
//     return (
//       < >
//         {this.props.reviews.currentUserReviews.length === 0 ? <Sub className="has-text-black">You haven't created any reviews</Sub> : null}
//         {reviewArr.reverse()}
//       </>
//     )
//   }
// }
// const mapStateToProps = state => ({ reviews: state.reviews })
// export default connect(mapStateToProps, { getMyReviews })(MyReviews)