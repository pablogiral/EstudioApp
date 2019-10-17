import React, { Component } from "react";
import ProjectService from "./ProjectService";
import { Link } from "react-router-dom";
import PhotoService from "../PhotoService";
import './EditProject.css'

export default class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: this.props.project.name,
      bandname: this.props.project.bandname,
      comments: this.props.project.comments,
      imgPath: "",
      error: null,
      success: false
    };
    this.service = new ProjectService();
    this.photoService = new PhotoService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const projectname = this.state.projectname;
    const bandname = this.state.bandname;
    const comments = this.state.comments;
    const image = this.state.imgPath;
    const projectID = this.props.project._id;

    this.service
      .editProject(projectID, projectname, bandname, comments, image)
      .then(response => {
        this.setState({
          projectname: projectname,
          bandname: bandname,
          comments: comments,
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

  checkToSend() {
    if (!this.state.projectname || !this.state.imgPath) {
      return true;
    } else {
      return false;
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="edit-studio">
        <h3>Edit project:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <div className="edit-studio-form">
            <div className="edit-studio-info">
              <label className="edit-label">Project name:</label>
              <input
                type="text"
                // placeholder={this.state.user.username}
                name="projectname"
                value={this.state.projectname}
                onChange={e => this.handleChange(e)}
              />

              <label className="edit-label">Band name:</label>
              <input
                type="text"
                // placeholder={this.state.user.email}
                name="bandname"
                value={this.state.bandname}
                onChange={e => this.handleChange(e)}
              />

              <label className="edit-label">Comments:</label>
              <div className="edit-project-textarea">
                <textarea
                  name="comments"
                  value={this.state.comments}
                  onChange={e => this.handleChange(e)}
                ></textarea>
              </div>

              <label className="edit-label">Project image:</label>
              <label htmlFor="uploader" className="fake-uploader">
                <img
                  src="https://res.cloudinary.com/dmzi2js9s/image/upload/v1571321408/upload_1_uwjkbg.png"
                  alt="arrow"
                ></img>
              </label>
              <input
                className="inputfile"
                type="file"
                id="uploader"
                name="imageUrl"
                onChange={e => this.handleFileUpload(e)}
              />
            </div>
            <div className="edit-studio-image">
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

        <div>
          <Link to={`/viewprojects/${this.props.selectedStudio}`}>
            <button className="button-back">Back to projects</button>
          </Link>
        </div>
      </div>
    );
  }
}
