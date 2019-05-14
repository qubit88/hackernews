import React from "react";
import "./App.css";
import Search from "./Search";
import Table from "./Table";
import Button from "./Button";
import Loading from "./Loading";

const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = "100";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

function withLoading(Component) {
  return function({ isLoading, ...rest }) {
    return isLoading ? <Loading /> : <Component {...rest} />;
  };
}

const ButtonWithLoading = withLoading(Button);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      page: 0,
      isLoading: false,
      sortKey: "NONE",
      isSortReverse: false
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    this.setState(prevState => {
      const { searchKey, results } = prevState;
      const oldHits =
        results && results[searchKey] ? results[searchKey].hits : [];

      const updatedHits = [...oldHits, ...hits];
      return {
        results: { ...results, [searchKey]: { hits: updatedHits, page } },
        isLoading: false
      };
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
    console.log(this.state.result);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchKey, page = 0) {
    this.setState({ isLoading: true });
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchKey}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updatedHits = hits.filter(item => item.objectID !== id);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
      sortKey,
      isSortReverse
    } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
          {error ? (
            <div className="interactions">
              <p>Something went wrong</p>
            </div>
          ) : (
            <Table
              list={list}
              sortKey={sortKey}
              onSort={this.onSort}
              onDismiss={this.onDismiss}
            />
          )}

          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              isSortReverse={isSortReverse}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            >
              More
            </ButtonWithLoading>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
