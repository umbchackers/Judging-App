import React from 'react';
import './Table.css';

function renderTable(data) {
  let table = [];
  let rows = data.split('\n');
  for (let i = 0; i < rows.length; i++) {
    let children = [];
    let columns = rows[i].split(',');
    for (let j = 0; j < columns.length; j++) {
      children.push(<td key={`${i}-${j}`}>{columns[j]}</td>);
    }
    table.push(<tr key={i}>{children}</tr>);
  }
  return table;
}

function Table(props) {
  return (
    <table className="table">
      <tbody>
        {renderTable(props.data)}
      </tbody>
    </table>
  );
}

export default Table;