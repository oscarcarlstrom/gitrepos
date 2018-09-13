import React, { Component } from 'react';
import Table from "./Table/Table";
import './Pageination.min.css';

class Pageination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0
    }
  }

  getDisplayedItems(i) {
    const fromIndex = i * this.props.pageViewSize;
    const toIndex = fromIndex + this.props.pageViewSize;
    return this.props.items.slice(fromIndex, toIndex)
  }

  goToPage(i) {
    this.setState({currentPageIndex: i});
  }

  prevPage() {
    if (!this.isFirstPage()) {
      this.goToPage(this.state.currentPageIndex - 1);
    }
  }

  nextPage() {
    if (!this.isLastPage()) {
      this.goToPage(this.state.currentPageIndex + 1);
    }
  }

  isLastPage() {
    return this.state.currentPageIndex === (this.numberOfPages() - 1);
  }

  isFirstPage() {
    return this.state.currentPageIndex === 0;
  }

  numberOfPages() {
    return this.props.items.length / this.props.pageViewSize;
  }

  buttonIsActive(i) {
    return i === this.state.currentPageIndex;
  }

  render() {
    const pageInationButtons = [];
    for(let i = 0; i < this.numberOfPages(); i++) {
      pageInationButtons.push(
        <button
          key={i}
          className={this.buttonIsActive(i) ? "active" : null}
          onClick={e => this.goToPage(i)}>
          {i + 1}
        </button>
      );
    }

    return (
      <div className="pageination-container">

        <div className={this.props.isLoading ? "table-container loading" : "table-container"}>
          <Table columns={this.props.columns} items={this.getDisplayedItems(this.state.currentPageIndex)}/>
        </div>

        {pageInationButtons.length > 1 &&
          <div className="page-nav-container">
            <div className="button-container">
              <button className="arrow-button" disabled={this.isFirstPage()} onClick={e => this.prevPage()} aria-label="Previous">
                <i className="fas fa-chevron-left" aria-hidden="true"></i>
              </button>
              <div className="index-buttons">
                  {pageInationButtons}
              </div>
              <button className="arrow-button" disabled={this.isLastPage()} onClick={e => this.nextPage()} aria-label="Next">
                <i className="fas fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default Pageination;
