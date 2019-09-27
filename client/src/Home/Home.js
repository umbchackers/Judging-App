import React, { Component } from 'react';
import './Home.css';

import api from 'api/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      isReady: false,
      assignments: [],
    };
  }

  componentDidMount() {
    api.getAssignments().then(assignments => {
      this.setState({ assignments });
    });
  }

  render() {
    const { assignments } = this.state;

    return (
      <div className="home">
        {assignments}
      </div>
    );
  }
}

export default Home;