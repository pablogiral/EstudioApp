import React, { Component } from "react";
import ProjectService from './ProjectService'
import { Link } from "react-router-dom"

export default class EditProject extends Component {
  constructor(props){
    super(props)
    this.state={
      projectname: this.props.project.name,
      bandname: this.props.project.bandname,
      comments: this.props.project.comments,
      error: null,
      success: false
    }
    this.service = new ProjectService()
    
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const projectname = this.state.projectname;
    const bandname = this.state.bandname;
    const comments = this.state.comments;
    const projectID= this.props.project._id;
    
    this.service
      .editProject(projectID, projectname, bandname, comments)
      .then(response => {
        this.setState({
          projectname: projectname,
          bandname: bandname,
          comments: comments,
          success: true,
          error: false,
        });
      })
      .catch(error => {
        this.setState({
          error: true,
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    // console.log(this.props)
    return (
      <div>
        <h3>Edit project:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Project name:</label>
            <input
              type="text"
              // placeholder={this.state.user.username}
              name="projectname"
              value={this.state.projectname}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Band name:</label>
            <input
              type="text"
              // placeholder={this.state.user.email}
              name="bandname"
              value={this.state.bandname}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <fieldset>
            <label>Comments:</label>
            <textarea
              name="comments"
              value={this.state.comments}
              onChange={e => this.handleChange(e)}
            ></textarea>
            
          </fieldset>

          <input type="submit" value="Save" />
        </form>
        <h2>{this.state.error ? "Something went wrong" : ""}</h2>
        <h2>{this.state.success ? "Success!" : ""}</h2>

        
        <div>
          <Link to={`/viewprojects/${this.props.selectedStudio}`}>Back to projects</Link>
        </div>
      </div>
    );
  }
}
