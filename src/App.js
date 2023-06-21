import React from "react";
import logo from "./logo.png";
import "./App.css";
import ApiCall from "./Component/ApiCall";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ApiCall />
          <br />
        </header>
      </div>
    );
  }
}
