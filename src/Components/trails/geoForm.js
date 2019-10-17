import React, { Component } from 'react'
import { connect } from 'react-redux'
import Geocode from "react-geocode"
import { setTrail } from '../../actions/trails'
import IndexTrail from './IndexTrail'

class GeoForm extends Component {
  state = {
    address: '',
    lat: null,
    lng: null,
    isSubmitted: false
  }


  handleOnChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    this.geoFunction()
    this.setState({ isSubmitted: true })
  }

  getTrails = (lat, lng) => {
    const key = "200594950-5f020033b054b3d9e23fb80d0d1d2fd8"

    fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxResults=12&key=${key}`)
      .then(response => response.json())
      .then(res => (this.props.setTrail(res)))
      .catch(console.log)
  }


  geoFunction = () => {
    Geocode.setApiKey(process.env.REACT_APP_GEOFORM_API_KEY)
    Geocode.enableDebug()
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        this.getTrails(lat, lng)
      },
      error => {
        console.error(error)
      }
    )
  }

  render() {
    if (!this.state.isSubmitted) {
      return (
        <div>
          <form onSubmit={(event) => this.handleOnSubmit(event)}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input type="text"
                  className="input"
                  placeholder="Type an address to find trails"
                  value={this.state.address}
                  onChange={event => this.handleOnChange(event)} />
              </div>
              <div className="control">
                <input className="button is-primary " type="submit" value="Find me trails!" />
              </div>
            </div>
          </form>
        </div >
      )
    }
    return <IndexTrail trailobj={this.props} />
  }
}
const mapStateToProps = state => ({ trails: state.trails })

export default connect(mapStateToProps, { setTrail })(GeoForm)

//* When submit button is clicked, render < TrailIndex />
// {this.state.isSubmitted && <IndexTrail />}