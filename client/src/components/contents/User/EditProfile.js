import React, { Component } from "react";

export default class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      user: this.props.user,
      newName: "",
      newEmail: "",
    }
    // console.log(this.state)
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
    console.log(this.state.newEmail)
    return (
      <div>
        <h3>Edit your profile:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input
              type="text"
              placeholder={this.state.user.username}
              name="newName"
              value={this.state.newName}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Email:</label>
            <input
              type="text"
              placeholder={this.state.user.email}
              name="newEmail"
              value={this.state.newEmail}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          {/* <fieldset>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.user.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset> */}

          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}
