import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyTrailCards from './MyTrailCards'
import { getSavedTrails } from '../../actions/trails'
import { Sub } from '../../ui/Styles'

class MyTrails extends Component {

  //this is to make sure whenever a user refreshes a screen, the Mytrails are here again.
  componentDidMount() {
    this.props.getSavedTrails()
  }

  render() {
    const noSavedTrail = this.props.myTrails.mySavedTrailsArr.length === 0

    if (noSavedTrail) {
      return (
        <Sub className="has-text-black">You don't have any trails saved</Sub>
      )
    }
    const trailList = this.props.myTrails.mySavedTrailsArr.map(trail => {
      return (
        <MyTrailCards
          key={trail.id}
          trail={trail.attributes}
        />
      )
    })
    return (
      < >
        {trailList.reverse()}
      </>
    )
  }
}

const mapStateToProps = state => ({ myTrails: state.myTrails })

export default connect(mapStateToProps, { getSavedTrails })(MyTrails)
