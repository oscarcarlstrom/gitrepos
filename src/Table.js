import React, { Component } from 'react';
import TableBody from "./TableBody";
import './Table.min.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortColumnName: this.props.columns.slice(-1)[0].dataName,
      ascending: false,
    }
  }

  sortColumn(column) {
    this.setState({
      sortColumnName: column,
      ascending: !this.state.ascending
    });
  }

  render() {
    const tableHeaders = this.props.columns.map((column, index) => {
      return(
          <th
            key={index}
            className={column.headerClassName}
            onClick={ event => this.sortColumn(column.dataName) }>
              {column.name}
          </th>
      );
    });

    return(
      <table>
        <thead>
          <tr>
            { tableHeaders }
          </tr>
        </thead>
        <TableBody
          columns={this.props.columns}
          items={this.props.items}
          ascending={this.state.ascending}
          sortColumn={this.state.sortColumnName}
        />
      </table>
    );
  }
}

export default Table;
