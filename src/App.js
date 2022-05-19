import React from 'react';
import './App.css';
import Weather from './component/Weather/Weather.js'
import axios from 'axios';
import { Accordion, Image, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      error: false,
      long: '',
      lat: '',
      mapImage: false,
      weatherDetails: [],
      showWeather: false
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityDetails = await axios.get(url);
      let weatherURL = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`;
      let weather = await axios.get(weatherURL);
      // console.log(weather);
      this.setState({
        cityName: cityDetails.data[0].display_name,
        long: cityDetails.data[0].lon,
        lat: cityDetails.data[0].lat,
        mapImage: true,
        weatherDetails: weather.data,
        showWeather: true,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
        mapImage: false,
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
    // console.log(this.state.weatherDetails);
    let weatherDays = this.state.weatherDetails.map((forecast, idx) => <Weather weather={forecast} key={idx}/>)

    return (
      <div id='body'>
        <h1>City Explorer</h1>
        <p>Enter the name of a city beow to view the coordinates of the location on a map</p>
        <form onSubmit={this.handleCitySubmit}>
          <label htmlFor="cityName">Enter a City:</label>
          <input type='text' id="cityName" onChange={this.cityChange} />
          <Button type='submit' size='sm'>Lookup City Information</Button>
        </form>
        {this.state.error
          ?
          <p id='error'>{this.state.errorMessage}</p>
          :
          <div id='accordion'>
            <Accordion>
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
                  {this.state.mapImage &&
                    <Image
                      src={mapURL}
                      fluid
                    />
                  }
                </Accordion.Body>
                <Accordion.Body>
                <strong>3-day Forecast:</strong>
                  {this.state.showWeather && weatherDays}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        }
        <div>
        </div>
      </div>
    );
  }
}

export default App;
