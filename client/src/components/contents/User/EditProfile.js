import React, { Component } from "react";
import UserService from "./UserService";
import PhotoService from "../PhotoService";
import "./EditProfile.css";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      newName: this.props.user.username,
      newEmail: this.props.user.email,
      imgPath: "",
      error: null,
      success: false
    };
    this.service = new UserService();
    this.photoService = new PhotoService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.newName;
    const email = this.state.newEmail;
    const image = this.state.imgPath;

    this.service
      .editUser(username, email, image)
      .then(response => {
        this.setState(
          {
            newName: username,
            newEmail: email,
            imgPath: image,
            success: true
          },
          () => {
            this.props.fetchUser();
          }
        );
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.photoService
      .handleUpload(uploadData)
      .then(response => {
        this.setState({
          imgPath: response.image_url
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  checkToSend() {
    if (!this.state.newName || !this.state.newEmail || !this.state.imgPath) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="edit-profile">
        <h3>Edit your profile:</h3>

        <form className="edit-form" onSubmit={this.handleFormSubmit}>
          <div className="edit-profile-flex">
            <div className="edit-profile-flex-col">
              <label className="edit-label">Username:</label>
              <input
                type="text"
                name="newName"
                value={this.state.newName}
                onChange={e => this.handleChange(e)}
              />

              <label className="edit-label">Email:</label>
              <input
                type="text"
                name="newEmail"
                value={this.state.newEmail}
                onChange={e => this.handleChange(e)}
              />
              <label className="edit-label">New photo:</label>
              <label htmlFor="profile-uploader" className="fake-uploader">
                <img
                  src="https://res.cloudinary.com/dmzi2js9s/image/upload/v1571321408/upload_1_uwjkbg.png"
                  alt="arrow"
                ></img>
              </label>
              <input
                className="inputfile"
                type="file"
                id="profile-uploader"
                name="imageUrl"
                onChange={e => this.handleFileUpload(e)}
              />
            </div>
            <div>
              {this.state.imgPath && (
                <img
                  className="new-upload-img"
                  src={this.state.imgPath}
                  alt="New upload"
                ></img>
              )}
            </div>
          </div>
          <button type="submit" disabled={this.checkToSend()}>
            Save changes
          </button>
        </form>
        <h2>{this.state.error ? "Something went wrong" : ""}</h2>
        <h2>{this.state.success ? "Success!" : ""}</h2>
      </div>
    );
  }
}
