import React, {Component} from 'react';

class TableDataCell extends Component {
  render() {
    if (this.props.dataHref) {
      return(
        <td className={this.props.className}>
          <a href={this.props.dataHref}>
            {this.props.data}
            {this.props.iconClassName &&
              <i className={this.props.iconClassName} aria-hidden="true"></i>
            }
          </a>
        </td>
      );
    }
    else {
      return(
        <td className={this.props.className}>
          {this.props.data}
          {this.props.iconClassName &&
            <i className={this.props.iconClassName} aria-hidden="true"></i>
          }
        </td>
      );
    }
  }
}

export default TableDataCell;
