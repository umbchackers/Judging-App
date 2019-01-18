import React, { Component } from 'react';
import './App.css';

import Table from './Table/Table';

const mockCSV = '11,12,13,14\n21,22,23,24\n31,32,33,34';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      error: '',
      isReady: true,
      tableData: mockCSV,
    };
  }

  // Read contents from uploaded file
  handleUpload = (event) => {
    event.preventDefault();
    let tableData = '';
    let file = event.target.files[0];


    this.setState({
      tableData,
    });
  }

  // Acts as a buffer between file upload and table generation
  handleSubmit = (event) => {
    event.preventDefault();
    let error = '';
    
    if (this.state.tableData === '') {
      error = 'Please choose a non-empty file to upload!';
    }

    this.setState({
      error, 
      isReady: error === '',
    });
  }

  render() {
    return (
      <div className="app">
        <form className="form-file" onSubmit={this.handleSubmit}>
          <input type="file" accept=".csv" onChange={this.handleUpload}/>
          <input type="submit" value="Submit" />
        </form>
        {this.state.isReady ? <Table data={this.state.tableData} /> : null}
      </div>
    );
  }
}

export default App;