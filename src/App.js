import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let helloWorld = "Welcome to the Road to Learn React";
  let user = {
    firstName: "Qubit",
    lastName: "88"
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
