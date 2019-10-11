import React, { Component } from "react";

export default class EditProfile extends Component {
  render() {
    return (
      <div>
        <h3>Edit your profile:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}
