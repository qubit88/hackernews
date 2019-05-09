import React from "react";
import logo from "./logo.svg";
import "./App.css";

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

function App() {
  let helloWorld = "Welcome to the Road to Learn React";
  let user = {
    firstName: "Qubit",
    lastName: "Stark"
  };
  return (
    <div className="App">
      <h1>{helloWorld}</h1>
      <p>
        My name is {user.firstName} {user.lastName}.
      </p>
    </div>
  );
}

export default App;
