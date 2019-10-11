import React, { Component } from "react";
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    // console.log(this.state.user);
    return (
      <div className="center">
        <div className="profileCard">
          <img src={this.state.user.image} alt="profile pic"></img>
          <div>
            <h1>Hello {this.state.user.username}!</h1>
            <h3>email: {this.state.user.email}</h3>
            <h3>User since: {this.state.user.created_at}</h3>
            <div>
              <button>Edit your profile</button>
              <button onClick={() => this.props.deleteUser()}>
                Delete your profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
