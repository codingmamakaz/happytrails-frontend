import React, { Component } from 'react';

import Geocode from "react-geocode";

class App extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/trails")
      .then(res => res.json())
      .then(console.log)
  }

  state = {
    address: ''
  }

  handleOnChange(event) {
    this.setState({
      address: event.target.value
    })
  }

  handleOnSubmit(event) {
    event.preventDefault()
    this.geoFunction()

  }


  geoFunction = () => {
    Geocode.setApiKey("");
    //* Make sure to get the API key from my kazumikarbowski account. Happytrails then
    //* figure out a way to hide the key and not publish it on github
    Geocode.enableDebug();
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>App</p>
          <form onSubmit={(event) => this.handleOnSubmit(event)}>
            <input
              type="text"
              value={this.state.address}
              onChange={event => this.handleOnChange(event)} />
            <input type="submit" value="Submit Address" />
          </form>
        </header>
      </div>
    );
  }

}

export default App;
