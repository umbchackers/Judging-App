import React from 'react';

import { Card, ButtonGroup, Button } from 'react-bootstrap';

import './ProjectCard.css';

const ProjectCard = ({ 
  handleChoice,
  rankings,
  project,
  table,
}) => {
  const getOutline = i => {
    return `${rankings[i] === project + table ? '' : 'outline-'}primary`;
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{project}</Card.Title>
        <Card.Subtitle>Table {table}</Card.Subtitle>
        <ButtonGroup aria-label="rankings">
          <Button variant={getOutline(0)} onClick={() => handleChoice(project + table, 0)}>1</Button>
          <Button variant={getOutline(1)} onClick={() => handleChoice(project + table, 1)}>2</Button>
          <Button variant={getOutline(2)} onClick={() => handleChoice(project + table, 2)}>3</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
};

export default ProjectCard;