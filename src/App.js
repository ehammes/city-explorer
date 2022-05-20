import React from 'react';
import './App.css';
import Weather from './components/Weather/Weather.js'
import Movies from './components/Movies/Movies.js'
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
      showWeather: false.value,
      showMovieTimes: false,
      movieDetails: []
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityDetails = await axios.get(url);

      let weatherURL = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}&lat=${cityDetails.data[0].lat}&lon=${cityDetails.data[0].lon}`;
      let weather = await axios.get(weatherURL);

      let movieURL = `${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`;
      let movie = await axios.get(movieURL);

      this.setState({
        cityName: cityDetails.data[0].display_name,
        lat: cityDetails.data[0].lat,
        long: cityDetails.data[0].lon,
        mapImage: true,
        weatherDetails: weather.data,
        showWeather: true,
        error: false,
        showMovieTimes: true,
        movieDetails: movie.data
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
        mapImage: false,
        showMovieTimes: false,
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
    let weatherDays = this.state.weatherDetails.map((forecast, idx) => <Weather weather={forecast} key={idx} />)
    let movieInfo = this.state.movieDetails.map((movieInfo, idx) => <Movies movies={movieInfo} key={idx} />)

    return (
      <div id='body'>
        <h1>City Explorer</h1>
        <p>Enter the name of a city beow to view the coordinates of the location on a map</p>
        <form onSubmit={this.handleCitySubmit}>
          <label htmlFor="cityName">Enter a City:</label>
          <input type='text' id="cityName" onChange={this.cityChange} />
          <Button
            type='submit'
            size='sm'>
            Explore!
          </Button>
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
                  <strong>7-day Forecast:</strong>
                  {this.state.showWeather && weatherDays}
                </Accordion.Body>
                <Accordion.Body>
                  <strong>Movies with the Location Name:</strong>
                  {this.state.showMovieTimes && movieInfo}
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
