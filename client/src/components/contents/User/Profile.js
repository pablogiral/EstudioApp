import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment"
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render() {
    return (
      <div className="center">
        <div className="profileCard">
          <img src={this.state.user.image} alt="profile pic"></img>
          <div>
            <h1>Hello {this.state.user.username}!</h1>
            <h3>email: {this.state.user.email}</h3>
            <h3>User since: {Moment(this.state.user.created_at).format('dddd DD MMM YYYY')}</h3>
            <div>
              <Link to={'/editprofile'}><button props={this.state.user}>Edit your profile</button></Link>
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
