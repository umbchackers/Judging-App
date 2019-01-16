import React, { Component } from 'react';
import './App.css';

import Table from './Table/Table';

const mockCSV = '11,12,13\n21,22,23\n31,32,33';
const mockXLSX = '';

class App extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      tableData: mockCSV,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    reader.onload(file => {
    });
  }

  render() {
    return (
      <div className="app">
        <form className="form-file" onSubmit={this.handleSubmit}>
          <input type="file" accept=".csv,.tsv,.xlsx" ref={this.fileInput} />
          <input type="submit" value="Submit" />
        </form>
        <Table data={this.state.tableData} />
      </div>
    );
  }
}

export default App;