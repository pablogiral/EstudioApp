import React, { Component } from "react";
import UserService from "./UserService";

export default class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      user: this.props.user,
      newName: this.props.user.username,
      newEmail: this.props.user.email,
      error: null,
      success: false
    }
    this.service = new UserService()
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.newName;
    const email = this.state.newEmail;

    this.service
      .editUser(username, email)
      .then(response => {
        this.setState({
          newName: username,
          newEmail: email,
          success: true,
        });
      })
      .catch(error => {
        this.setState({
          error: true,
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    
    return (
      <div>
        <h3>Edit your profile:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input
              type="text"
              // placeholder={this.state.user.username}
              name="newName"
              value={this.state.newName}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Email:</label>
            <input
              type="text"
              // placeholder={this.state.user.email}
              name="newEmail"
              value={this.state.newEmail}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input type="submit" value="Save" />
        </form>
        <h2>{this.state.error? "Something went wrong": ""}</h2>
        <h2>{this.state.success? "Success!": ""}</h2>
      </div>

    );
  }
}
