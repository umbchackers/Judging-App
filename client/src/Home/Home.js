import React from 'react';
import './Home.css';

const renderCards = assignments => {
  const cards = [];
  assignments.forEach(assignment => {
    cards.push(assignment);
  });
  return cards
};

const Home = ({ assignments }) => (
  <div className="home">
    {renderCards(assignments)}
  </div>
)

export default Home;