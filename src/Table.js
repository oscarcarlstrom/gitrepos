import React, { Component } from 'react';
import moment from 'moment';
import './Table.min.css';

class Table extends Component {

  render() {
    const tableHeaders = this.props.headers.map((header, index) => {
      return(
          <th key={index} className={header.className} onClick={ event => console.log("sort") }>{header.text}</th>
      );
    });

    const tableData = this.props.items.map((item, index) => {
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
