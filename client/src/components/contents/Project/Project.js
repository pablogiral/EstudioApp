import React, { Component } from "react";
import "./Project.css";
import { Link } from "react-router-dom";

export default class Project extends Component {

  editHandler(e){
    this.props.editProject(this.props.project)
  }
  
  render() {
    return (
      <div className="projectCard">
        <img
          src={this.props.project.projectimage}
          alt={this.props.project.name}
        />
        <h3>{this.props.project.name}</h3>
        <h3>{this.props.project.bandname}</h3>

        <Link to={`/viewtasks/${this.props.project._id}`}>
          <button>Project details</button>
        </Link>

        <div className="horizontal-buttons">

          <Link to={`/editproject/${this.props.project._id}`}>
            <button onClick={(e)=>this.editHandler(e)}>Edit</button>
          </Link>

          <button className="danger" onClick={() => this.props.deleteProject(this.props.project)}>
            Delete
          </button>

        </div>
      </div>
    );
  }
}
