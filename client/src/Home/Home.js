import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      isReady: false,
      assignments: [],
    };
  }

  render() {
    const { assignments } = this.props;

    return (
      <div className="home">
        {assignments}
      </div>
    );
  }
}

export default Home;