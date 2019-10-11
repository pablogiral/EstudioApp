import React, { Component } from "react";
import ProjectService from "./ProjectService";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      bandname: ""
    };
    this.service = new ProjectService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const projectName = this.state.projectname;
    const bandName = this.state.bandname;
    this.service
      .create({
        projectname: projectName,
        bandname: bandName,
        belongsTo: this.props.urlId
      })
      .then(response => {
        this.setState({
          projectname: "",
          bandname: ""
        });
        this.props.getProject(response);
      })
      .catch(err => {
        this.setState({
          projectname: projectName,
          bandname: bandName,
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
      <div>
        <div>
          <h3>Create a new project:</h3>

          <form onSubmit={this.handleFormSubmit}>
            <fieldset>
              <label>Project name:</label>
              <input
                type="text"
                name="projectname"
                value={this.state.projectname}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>
            <fieldset>
              <label>Band name:</label>
              <input
                type="text"
                name="bandname"
                value={this.state.bandname}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>

            <input type="submit" value="create" />
          </form>

          <h1>{this.state.error ? "Error" : ""}</h1>
        </div>
      </div>
    );
  }
}
