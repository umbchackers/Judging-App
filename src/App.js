import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <div className="app">
        <form className="form-file" onSubmit={this.handleSubmit}>
          <input type="file" accept=".csv,.xlsx" ref={this.fileInput} />
          <input type="Submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;