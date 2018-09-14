import React, { Component } from 'react';
import moment from 'moment';
import {compareByProperty} from '../util';
import TableDataCell from './TableDataCell';

class TableBody extends Component {
  render() {
    const tableData = this.props.items.sort(compareByProperty(this.props.sortColumn, this.props.ascending))
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
                let href = item[column.hrefProperty];
                let highlight = item.highlight ? item.highlight.find(x => x.dataName === column.dataName) : null;

                return(
                  <TableDataCell
                    key={`${i}-${j}`}
                    href={href}
                    className={column.rowCellClassName}
                    data={cellData}
                    iconClassName={column.iconClassName}
                    highlight={highlight}
                    highlightStart={highlight ? highlight.start : 0}
                    highlightEnd={highlight ? highlight.end : 0}
                  />
                );
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
