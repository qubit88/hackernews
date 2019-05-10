import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";
import Table from "./Table";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      name: "pikabu",
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const list = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange} />

        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
