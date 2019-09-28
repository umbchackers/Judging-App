import React, { Component } from 'react';

import { Card, CardDeck } from 'react-bootstrap';

import './Home.css';

const cardStyle = {
  minWidth: '333px', 
  maxWidth: '333px',
  minHeight: 'calc(20vh - 20px)',
  maxHeight: 'calc(20vh - 20px)', 
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  border: 'none',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderCards = () => {
    const cards = [(
      <Card style={cardStyle} key="doneCard">
        <Card.Body>
          <Card.Title>Your top three</Card.Title>
          <Card.Text>
            1. {false || 'Undecided'} <br />
            2. {false || 'Undecided'} <br />
            3. {false || 'Undecided'}
          </Card.Text>
        </Card.Body>
      </Card>
    )];
    this.props.assignments.forEach(a => {
      cards.push(
        <Card style={cardStyle} key={a}>
          <Card.Body>
            <Card.Title>{a}</Card.Title>
          </Card.Body>
        </Card>
      );
    });
    return <CardDeck>{cards}</CardDeck>
  }

  render() {
    return (
      <div className="home">
        <div className="gallery">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export default Home;