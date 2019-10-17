import React, { Component } from "react";
import ProjectService from "./ProjectService";
import "./CreateProject.css";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      bandname: "",
      comments: ""
    };
    this.service = new ProjectService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const projectName = this.state.projectname;
    const bandName = this.state.bandname;
    const comments = this.state.comments;

    this.service
      .create({
        projectname: projectName,
        bandname: bandName,
        comments: comments,
        belongsTo: this.props.urlId
      })
      .then(response => {
        this.setState({
          ...this.state,
          projectname: "",
          bandname: "",
          comments: ""
        });
        this.props.getProject(response.saveProject);
      })
      .catch(err => {
        this.setState({
          projectname: projectName,
          bandname: bandName,
          comments: comments,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="createProject">
        <h3>Create a new project:</h3>

        <form className="create-project-form" onSubmit={this.handleFormSubmit}>
          <div className="horizontal-form">
            <input
              type="text"
              placeholder="Project name"
              name="projectname"
              value={this.state.projectname}
              onChange={e => this.handleChange(e)}
            />

            <input
              type="text"
              placeholder="Band name"
              name="bandname"
              value={this.state.bandname}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <textarea
            placeholder="Comments..."
            cols="50"
            rows="8"
            name="comments"
            value={this.state.comments}
            onChange={e => this.handleChange(e)}
          ></textarea>

          <input type="submit" value="create" />
        </form>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}
