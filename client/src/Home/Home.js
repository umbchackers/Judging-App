import React, { Component } from 'react';

import { Card, CardDeck, Button } from 'react-bootstrap';
import ProjectCard from './ProjectCard/ProjectCard';

import api from 'api/api';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: [null, null, null],
      sentRankings: [],
      submitDisabled: true,
    };
  }

  // Can we do this with events? 
  // Currently rerenders all cards on rank choice
  handleChoice = (key, rank) => {
    const rankings = this.state.rankings;
    const existingIndex = rankings.indexOf(key);
    rankings[rank] = key;
    if (existingIndex > -1) rankings[existingIndex] = null;
    this.setState({ rankings, submitDisabled: rankings.some(rank => rank === null)});
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

  handleSubmit = e => {
    e.preventDefault();
    let newRanks = [];
      this.state.rankings.forEach((ranking, i) => {
        ranking && newRanks.push({ project: ranking, rank: i + 1 });
      });
    api.postRankings(newRanks);
    this.setState({ sentRankings: this.state.rankings });
  }

  renderCards = () => {
    const { submitDisabled, rankings } = this.state;
    const nullNum = rankings.reduce((acc, val) => acc + (val ? 0 : 1), 0);

    const cards = [(
      <Card className="top-three" key="done-card">
        <Card.Body>
          <Card.Title as='h3'>Your top three</Card.Title>
          <div>1. {this.getProject(0)}</div>
          <div>2. {this.getProject(1)}</div>
          <div>3. {this.getProject(2)}</div>
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