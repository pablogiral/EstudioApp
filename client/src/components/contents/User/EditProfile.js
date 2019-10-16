import React, { Component } from "react";
import UserService from "./UserService";
import PhotoService from "../PhotoService";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      newName: this.props.user.username,
      newEmail: this.props.user.email,
      imgPath: "",
      error: null,
      success: false,
      
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
        this.setState({
          newName: username,
          newEmail: email,
          imgPath: image,
          success: true
        });
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
          imgPath: response.secure_url,
          
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
    if (
      !this.state.newName ||
      !this.state.newEmail ||
      !this.state.imgPath
      
    ) {
      return true;
    } else {
      return false;
    }
  }


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
          <input
            className="file-input"
            type="file"
            name="imageUrl"
            onChange={e => this.handleFileUpload(e)}
          />
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
