import React, { Component } from 'react';
import Pageination from "./Pageination";
import './App.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      filter: "",
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

  setFilter(f) {
    this.setState({
      filter: f.toLowerCase()
    });
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
        hrefProperty: "html_url"
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

    const filteredRepos = this.state.filter.length === 0
                          ? this.state.repos.map((repo, index) => {
                              delete repo.highlight;
                              return repo;
                            })
                          : this.state.repos.map((repo, index) => {
                            repo.highlight = [];
                            const filter = this.state.filter;
                            for(let [key, value] of Object.entries(repo)) {
                              if (columns.filter(c => c.dataName === key).length > 0) {
                                const val = value ? value.toString().toLowerCase() : "";
                                if (val.length > 0 && val.includes(filter)) {
                                  repo.highlight.push({
                                    dataName : key,
                                    start : val.indexOf(filter),
                                    end : val.indexOf(filter) + filter.length
                                  });
                                }
                              }
                            }
                            return repo.highlight.length > 0 ? repo : null;
                          })
                          .filter(r => r != null);

    return (
      <div className="App container">
        <div className="top-container">
          <h1>Some of the most popular JavaScript repos on github</h1>
          <div className="input-container">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Filter ..." onInput={event => this.setFilter(event.target.value)}/>
          </div>
        </div>
        <Pageination items={filteredRepos} isLoading={this.state.isLoading} columns={columns} pageViewSize={PAGE_VIEW_SIZE}/>
      </div>
    );
  }
}

export default App;
