import React, { Component } from 'react';
import './App.css';

import Table from './Table/Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      error: '',
      isReady: false,
      tableData: '',
    };
  }

  // Read contents from uploaded file
  handleUpload = (event) => {
    event.preventDefault();
    let tableData = '';
    let error = '';
    let file = event.target.files[0];
    let reader = new FileReader();

    // Force .csv extension
    reader.onloadstart = event => {
      if (file.name.split('.').pop() !== 'csv') {
        error = 'Please upload a CSV file!';
        reader.abort(); 
      }
    };

    reader.onload = event => {
      tableData = reader.result;
    };

    reader.onerror = event => {
      error = reader.error.message;
      reader.abort();
    };

    reader.onloadend = event => {
      this.setState({
        tableData,
        error,
      });
    };

    reader.readAsText(file);
  };

  // Acts as a buffer between file upload and table generation
  handleSubmit = (event) => {
    event.preventDefault();
    let error = '';
    
    if (this.state.tableData === '') {
      error = 'Please upload a non-empty file!';
    }

    this.setState({
      error, 
      isReady: error === '',
    });
  };

  render() {
    return (
      <div className="app">
        <form className="form-file" onSubmit={this.handleSubmit}>
          <input type="file" accept=".csv" onChange={this.handleUpload}/>
          <input type="submit" value="Submit"/>
        </form>
        <p>{this.state.error}</p>
        {this.state.isReady ? <Table data={this.state.tableData}/> : null}
      </div>
    );
  }
}

export default App;