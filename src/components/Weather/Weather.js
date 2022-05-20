import React from 'react';
import './Weather.css';
import { Table } from 'react-bootstrap'

class Weather extends React.Component {



  render() {

    return (
      <>
        <Table striped size="sm" hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <td>{this.props.weather.datetime}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Forecast</th>
              <td>{this.props.weather.description}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}


export default Weather;