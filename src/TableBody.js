import React, { Component } from 'react';
import moment from 'moment';

class TableBody extends Component {
  render() {
    const tableData = this.props.items.sort((a, b) => {
      const c = this.props.ascending ? -1 : 1;
      if (a[this.props.sortColumn].toString().toLowerCase() < b[this.props.sortColumn].toString().toLowerCase()) {
        return c;
      }
      else if (a[this.props.sortColumn].toString().toLowerCase() > b[this.props.sortColumn].toString().toLowerCase()) {
        return c * -1;
      }
      return 0;
    })
    .map((item, i) => {
      return(
          <tr key={i}>
            {
              this.props.columns.map((column, j) => {
                let cellData;
                if (column.headerClassName && column.headerClassName.includes("date")) {
                  cellData = moment(item.created_at).format("YYYY-MM-DD");
                }
                else if (column.headerClassName && column.headerClassName.includes("number")) {
                  //TODO: format number thousands
                  cellData = item[column.dataName];
                }
                else {
                  cellData = item[column.dataName];
                }

                if (column.dataHref) {
                  return(
                    <td key={`${i}-${j}`} className={column.rowCellClassName}>
                      <a href={column.dataHref}>
                        {cellData}
                        {column.iconClassName &&
                          <i className={column.iconClassName} aria-hidden="true"></i>
                        }
                      </a>
                    </td>
                  );
                }
                else {
                  return(
                    <td key={`${i}-${j}`} className={column.rowCellClassName}>
                      {cellData}
                      {column.iconClassName &&
                        <i className={column.iconClassName} aria-hidden="true"></i>
                      }
                    </td>
                  );
                }
              })
            }
          </tr>
      );
    });

    return(
      <tbody>
        {tableData}
      </tbody>
    );
  }
}

export default TableBody;
