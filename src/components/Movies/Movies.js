import React from 'react';
import './Movies.css';
import { Card } from 'react-bootstrap'

class Movies extends React.Component {



  render() {

    return (
      <div>
        <Card style={{ width: '38rem' }}>
          {this.props.movies.poster_path && <Card.Img
            variant="top"
            src={this.props.movies.poster_path}
            alt={this.props.movies.title}
          />}
          <Card.Body>
            <Card.Title>{this.props.movies.title}</Card.Title>
            <Card.Text>
              <strong>Summary: </strong>{this.props.movies.overview}
            </Card.Text>
            <Card.Text>
              <strong>Realse Date: </strong>{this.props.movies.release_date}
            </Card.Text>
            <Card.Text>
              <strong>Star Rating: </strong>{this.props.movies.vote_average}
            </Card.Text>
            <Card.Text>
              <strong>Votes: </strong>{this.props.movies.vote_count}
            </Card.Text>
            <Card.Text>
              <strong>Popularity: </strong>{this.props.movies.popularity}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}


export default Movies;