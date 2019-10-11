import React, { Component } from 'react';

import { Card, CardDeck, Button } from 'react-bootstrap';
import ProjectCard from './ProjectCard/ProjectCard';

import api from 'api/api';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    const { rankings = [] } = props.data;
    this.state = {
      rankings: rankings || [null, null, null],
      submitDisabled: !(rankings[0] && rankings[1] && rankings[2]),
    };
  }

  getProject = i => {
    const ranking = this.state.rankings[i];
    if (ranking) {
      const project = ranking.substring(0, ranking.lastIndexOf('#'));
      const table = ranking.substring(ranking.lastIndexOf('#'), ranking.length);
      return `Table ${table}: ${project}`;
    } else {
      return 'Undecided';
    }
  }

  formatRankingsBackend = rankings => {
    let newRankings = [];
    rankings.forEach((ranking, i) => {
      ranking && newRankings.push({ project: ranking, rank: i + 1 });
    });
    return newRankings;
  }

  // Can we do this with events? 
  // Currently rerenders all cards on rank choice
  handleChoice = (key, rank) => {
    const rankings = this.state.rankings;
    const existingIndex = rankings.indexOf(key);
    rankings[rank] = key;
    if (existingIndex > -1) rankings[existingIndex] = null;
    api.postUserInfo({ rankings });
    this.setState({ 
      rankings, 
      submitDisabled: rankings.some(rank => rank === null),
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const rankings = this.formatRankingsBackend(this.state.rankings);
    api.postRankings(rankings).then(data => {
      if (data) alert('Thank you for submitting!');
      else alert('Submit failed. Please see an organizer.');
    });
    this.setState({ sentRankings: this.state.rankings });
  }

  renderCards = () => {
    const { submitDisabled } = this.state;

    const cards = [(
      <Card className="top-three" key="done-card">
        <Card.Body>
          <Card.Title as='h3'>Your top three</Card.Title>
          <ol>
            <li>{this.getProject(0)}</li>
            <li>{this.getProject(1)}</li>
            <li>{this.getProject(2)}</li>
          </ol>
          <div className="btn-container">
            <Button 
              variant={submitDisabled ? 'secondary' : 'primary'} 
              disabled={submitDisabled}
              onClick={this.handleSubmit}
            >
              {submitDisabled ? 'Rank 3 projects' : 'Submit'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    )];
    this.props.assignments.forEach(a => {
      const project = a.substring(0, a.lastIndexOf('#'));
      const table = a.substring(a.lastIndexOf('#'), a.length);
      cards.push(
        <ProjectCard 
          handleChoice={this.handleChoice}
          rankings={this.state.rankings}
          project={project} 
          table={table} 
          key={a}
        />
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