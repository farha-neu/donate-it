import React, { Component } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateItem from "./components/CreateItem";
import ViewItem from "./components/ViewItem";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";



class App extends Component {
  state = {
    loaded: false,
    sessionUser:null
  };

  componentDidMount() {
    // check if user has already logged in successfully
    axios.get("/auth").then((res) => {
      console.log(res.data);
      this.setState({
        loaded: true,
        sessionUser:res.data
      });
    });
  }

  setLogin = (sessionUser) => {
    // login component triggered authentication = true
    this.setState({
      sessionUser:sessionUser
    });
  };

  setLogout=() => {
    this.setState({
      sessionUser:null
    });
  }
  render() {
    // prevent flickering of login component
    if (!this.state.loaded) {
      return null;
    }

    return (
      <Router>
      <div>
        <Navbar user={this.state.sessionUser} />
        <Switch>
         <Route exact path="/" render={(props) => <Home {...props} user={this.state.sessionUser} />} />
         <Route exact path="/login" render={(props) => <Login {...props} setLogin={this.setLogin} />} />
         <Route exact path="/signup" component={Signup} />
         {!this.state.sessionUser ? <Redirect to="/login" /> : null }
         <Route exact path="/create-item"  render={(props) => <CreateItem {...props} user={this.state.sessionUser} />} />
         <Route exact path="/view-item/:id" render={(props) => <ViewItem {...props} user={this.state.sessionUser} />} />
         <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.sessionUser} />} />
         <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.sessionUser} />} />
         <Route exact path="/logout" render={(props) => <Logout {...props} setLogout={this.setLogout} />} />
         <Redirect to="/" />
        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
