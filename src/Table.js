import React, { Component } from 'react';
import moment from 'moment';
import './Table.min.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDataName: this.props.headers.slice(-1)[0].dataName,
      ascending: false,
    }
  }

  sortColumn(column) {
    console.log(`sort column ${column} current is ${this.state.columnDataName}`);
    this.setState({
      columnDataName: column,
      ascending: !this.state.ascending
    });
  }

  render() {
    const tableHeaders = this.props.headers.map((header, index) => {
      return(
          <th key={index} className={header.className} onClick={ event => this.sortColumn(header.dataName) }>{header.text}</th>
      );
    });

    //TODO
    /*const tableData = this.props.items.sort((a, b) => {
      const c = this.state.ascending ? -1 : 1;
      if (a[this.state.columnDataName].toString().toLowerCase() < b[this.state.columnDataName].toString().toLowerCase()) {
        return c;
      }
      else if (a[this.state.columnDataName].toString().toLowerCase() > b[this.state.columnDataName].toString().toLowerCase()) {
        return c * -1;
      }
      return 0;
    })
    .map((item, index) => {
      return(
          <tr key={index}>
          {
            this.props.headers.map((header, index) => {
              return(
                <td>
                  {item[this.props.headers.dataName]}
                </td>
            );
          }
        </tr>
      );
    });*/


    const tableData = this.props.items.sort((a, b) => {
      const c = this.state.ascending ? -1 : 1;
      if (a[this.state.columnDataName].toString().toLowerCase() < b[this.state.columnDataName].toString().toLowerCase()) {
        return c;
      }
      else if (a[this.state.columnDataName].toString().toLowerCase() > b[this.state.columnDataName].toString().toLowerCase()) {
        return c * -1;
      }
      return 0;
    })
    .map((item, index) => {
      return (
        <tr key={index}>
          <td className="nobreak">
            <a href={item.html_url} target="_blank">
              {item.name} <i className="fa fa-external-link-alt" aria-hidden="true"></i>
            </a>
          </td>
          <td>
            { item.description }
          </td>
          <td className="nobreak">
            { moment(item.created_at).format("YYYY-MM-DD") }
          </td>
          <td className="number">
            { item.stargazers_count } <i className="fas fa-star" aria-hidden="true"></i>
          </td>
        </tr>
      );
    });

    return(
      <table>
        <thead>
          <tr>
            { tableHeaders }
          </tr>
        </thead>
        <tbody>
          { tableData }
        </tbody>
      </table>
    );
  }
}

export default Table;
