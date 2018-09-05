import React, { Component } from 'react';
import Pageination from "./Pageination";
import './App.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      isLoading: true
    }
  }

  componentDidMount() {
      const GET_REPOS_URL = "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100";
      fetch(GET_REPOS_URL)
        .then(response => response.json())
        .then(json => this.setState({
          repos: json.items,
          isLoading: false
        }));
  }

  render() {
    const PAGE_VIEW_SIZE = 20; //Defines how many repos to display per page
    const columns = [
      {
        text: "Name",
        className: ""
      },
      {
        text: "Description",
        className: ""
      },
      {
        text: "Created",
        className: "date"
      },
      {
        text: "Stars",
        className: "number"
      },
    ] //Defines the table columns

    return (
      <div className="App container">
        <h1>Some of the most popular JavaScript repos on github</h1>
        <Pageination items={this.state.repos} isLoading={this.state.isLoading} columns={columns} pageViewSize={PAGE_VIEW_SIZE}/>
      </div>
    );
  }
}

export default App;
