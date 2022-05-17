import React from 'react';
import './App.css';
import axios from 'axios';
import { Accordion, Image } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      error: false,
      long: '',
      lat: '',
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityDetails = await axios.get(url);
      this.setState({
        cityName: cityDetails.data[0].display_name,
        long: cityDetails.data[0].lon,
        lat: cityDetails.data[0].lat
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
      })
    }
  }

  cityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  render() {
    let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.long}&zoom=13`

    return (
      <div id='body'>
        <h1>City Explorer</h1>
        <p>Enter the name of a city beow to view the coordinates of the location on a map</p>
        <form onSubmit={this.handleCitySubmit}>
          <label htmlFor="cityName">Enter a City:</label>
          <input type='text' id="cityName" onChange={this.cityChange} />
          <button type='submit'>Lookup City Information</button>
        </form>
        {this.state.error
          ?
          <p id='error'>{this.state.errorMessage}</p>
          :
          <div id='accordion'>
            <Accordion defaultActiveKey="0" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong>City:</strong> {this.state.cityName}
                </Accordion.Header>
                <Accordion.Body>
                  <strong>Latitude:</strong> {this.state.lat}
                </Accordion.Body>
                <Accordion.Body>
                  <strong>Longitude:</strong> {this.state.long}
                </Accordion.Body>
                <Accordion.Body>
                  <Image
                    src={mapURL}
                    fluid>
                  </Image>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        }
      </div>
    );
  }
}

export default App;
