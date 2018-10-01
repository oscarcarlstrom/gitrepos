import React, {Component} from 'react';

class TableDataCell extends Component {
  render() {
    const {className, iconClassName} = this.props;
    const icon = <i className={iconClassName} aria-hidden="true"></i>;

    const data = this.props.data.toString();
    let content = data;
    if(this.props.highlight) {
      content = <span>
                  {data.substring(0, this.props.highlightStart)}
                  <mark>
                    {data.substring(this.props.highlightStart, this.props.highlightEnd)}
                  </mark>
                  {data.substring(this.props.highlightEnd)}
                </span>;
    }

    if (this.props.href) {
      return(
        <td className={className}>
          <a href={this.props.href} target="_blank">
            {content}
            {iconClassName &&
              icon
            }
          </a>
        </td>
      );
    }
    else {
      return(
        <td className={className}>
          {content}
          {iconClassName &&
            icon
          }
        </td>
      );
    }
  }
}

export default TableDataCell;
