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

    //Defines the table columns
    const columns = [
      {
        name: "Name",
        dataName: "name",
        rowCellClassName: "nobreak",
        iconClassName: "fa fa-external-link-alt",
        dataHref: "html_url"
      },
      {
        name: "Description",
        dataName: "description",
      },
      {
        name: "Created",
        headerClassName: "date",
        dataName: "created_at",
        rowCellClassName: "nobreak"
      },
      {
        name: "Stars",
        headerClassName: "number",
        dataName: "stargazers_count",
        rowCellClassName: "number",
        iconClassName: "fas fa-star",
      },
    ]

    return (
      <div className="App container">
        <h1>Some of the most popular JavaScript repos on github</h1>
        <Pageination items={this.state.repos} isLoading={this.state.isLoading} columns={columns} pageViewSize={PAGE_VIEW_SIZE}/>
      </div>
    );
  }
}

export default App;
