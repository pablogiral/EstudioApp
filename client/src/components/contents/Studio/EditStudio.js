import React, { Component } from "react";
import StudioService from "./StudioService";
import { Link } from "react-router-dom";
import PhotoService from "../PhotoService";
import "./EditStudio.css";

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
    if (!this.state.studioname || !this.state.imgPath) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="edit-studio">
        <h3>Edit studio:</h3>

        <form className="edit-form" onSubmit={this.handleFormSubmit}>
          <label className="edit-label">Studio name:</label>
          <input
            type="text"
            name="studioname"
            value={this.state.studioname}
            onChange={e => this.handleChange(e)}
          />

          <label className="edit-label">Studio image:</label>
          <label htmlFor="uploader" className="fake-uploader"><img src="https://res.cloudinary.com/dmzi2js9s/image/upload/v1571321408/upload_1_uwjkbg.png" alt="arrow"></img></label>
          <input
            className="inputfile"
            type="file"
            id="uploader"
            name="imageUrl"
            onChange={e => this.handleFileUpload(e)}
          />
          {this.state.imgPath && (
          <img className="new-upload-img" src={this.state.imgPath} alt="New upload"></img>
        )}
        
          <button type="submit" disabled={this.checkToSend()}>
            Save changes
          </button>
        </form>
        <h2>{this.state.error ? "Something went wrong" : ""}</h2>
        <h2>{this.state.success ? "Success!" : ""}</h2>

        
        <div>
          <Link to={`/viewstudios`}><button className="button-back">Back to projects</button></Link>
        </div>
      </div>
    );
  }
}
