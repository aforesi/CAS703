import React, { Component } from "react";
import { Route } from "react-router-dom";
import './App.css';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Blackboard from "./Components/Blackboard/Blackboard";


class App extends Component {
  
  render() {

    return (
      <div className="App">
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/blackboard" component={Blackboard} />
      </div>
    )

  }
}

export default App;
