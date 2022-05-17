import React from 'react';
import './App.css';
import axios from 'axios';
import {Accordion} from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
    }
  }

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
    let cityDetails = await axios.get(url);
    this.setState({
      cityName: cityDetails.data[0].display_name,
      long: cityDetails.data[0].lon,
      lat: cityDetails.data[0].lat
    });
  }

  cityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  render() {


    return (
      <>
        <h1>hello!</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label htmlFor="cityName">Enter a City</label>
          <input type='text' id="cityName" onChange={this.cityChange} />
          <button type='submit'>Lookup City Information</button>
        </form>
        <Accordion flush>
          <Accordion.Item>
            <Accordion.Header>{this.state.cityName}</Accordion.Header>
              <Accordion.Body>
                {this.state.long}
            </Accordion.Body>
            <Accordion.Body>
                {this.state.lat}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }
}

export default App;
