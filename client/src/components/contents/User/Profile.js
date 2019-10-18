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
      <div className="view-profile">
        <div className="profileCard">
          <div className="profile-image">
          <img src={this.state.user.image} alt="profile pic"></img>
          </div>
          <div className="profile-info">
            <h2>Hello {this.state.user.username}!</h2>
            <h4>Email: {this.state.user.email}</h4>
            <h4>User since: {Moment(this.state.user.created_at).format('dddd DD MMM YYYY')}</h4>
            <div>
              <Link to={'/editprofile'}><button props={this.state.user}>Edit your profile</button></Link>
              <button onClick={() => this.props.deleteUser()} className="danger">
                Delete your profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
