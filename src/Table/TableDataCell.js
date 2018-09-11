import React, {Component} from 'react';

class TableDataCell extends Component {
  render() {
    const icon = <i className={this.props.iconClassName} aria-hidden="true"></i>;

    console.log(this.props.data.html_url);
    if (this.props.href) {
      return(
        <td className={this.props.className}>
          <a href={this.props.href} target="_blank">
            {this.props.data}
            {this.props.iconClassName &&
              icon
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
            icon
          }
        </td>
      );
    }
  }
}

export default TableDataCell;
