import React, { Component } from "react";
import StudioService from "./StudioService";
import { Link } from "react-router-dom";
import PhotoService from "../PhotoService";

export default class EditStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studioname: this.props.studio.studioname,
      error: null,
      success: false,
      imgPath: ""
    };
    this.service = new StudioService();
    this.photoService = new PhotoService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const studioname = this.state.studioname;
    const image = this.state.imgPath;
    const id = this.props.studio._id;

    this.service
      .editStudio(id, studioname, image)
      .then(response => {
        this.setState({
          studioname: studioname,
          imgPath: image,
          success: true,
          error: false
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
          imgPath: response.secure_url
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
    if (!this.state.studioname || !this.state.imgPath) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <h3>Edit project:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Project name:</label>
            <input
              type="text"
              // placeholder={this.state.user.username}
              name="studioname"
              value={this.state.studioname}
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

        <div>
          <Link to={`/viewprojects/${this.props.selectedStudio}`}>
            Back to projects
          </Link>
        </div>
      </div>
    );
  }
}
