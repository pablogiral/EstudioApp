// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: {} };
    this.service = new AuthService();
  }

  static getDerivedStateFromProps(props, state) {
    // console.log(props);
    return (state.loggedInUser = props.userInSession);
    // this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    // console.log(this.state.loggedInUser);
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <div className="navbar-block-left">
            <div className="navbar-element">
              <Link to={"/viewcalendar"}>Calendar</Link>
            </div>
            <div className="navbar-element">
              <Link to={"/viewstudios"}>Home</Link>
            </div>
          </div>
          <div className="navbar-block-right">
            <div className="navbar-element">
              <Link to={"/profile"}>
                {this.state.loggedInUser.username}'s profile
              </Link>
            </div>
            <div className="navbar-element">
              <Link to={"/login"} onClick={this.handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
