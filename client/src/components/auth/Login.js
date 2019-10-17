// auth/Signup.js
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from "./AuthService";
import "./Login-signup.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login-signup">
        <h3>Login to your account:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            {/* <label className="LSlabel">Username:</label> */}
            <input className="LSinput"
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            {/* <label className="LSlabel">Password:</label> */}
            <input className="LSinput"
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input className="LSbutton" type="submit" value="Login" />
        </form>

        <h1>{this.state.error ? "Error" : ""}</h1>
      
        <span className="LStext">Not a  user? <Link className="LStextLink" to="/signup">Signup</Link></span>
      
      </div>
    );
  }
}

export default Login;
