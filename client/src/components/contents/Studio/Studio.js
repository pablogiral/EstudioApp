import React, { Component } from "react";
import "./Studio.css";
import { Link } from "react-router-dom";

export default class Studio extends Component {

  handleClic = e => {
    this.props.selected(this.props.studio._id);
  };

  editHandler(e){
    this.props.editStudio(this.props.studio)
  }

  render() {
    return (
      <div className="studioCard">
        <img
          src={this.props.studio.studioimage}
          alt={this.props.studio.studioname}
        />
        <h2>{this.props.studio.studioname}</h2>
        <h4>Open projects: {this.props.studio.projects.length} </h4>
        <Link to={`/viewprojects/${this.props.studio._id}`}>
          <button
            onClick={e => {
              this.handleClic(e);
            }}
          >
            See projects
          </button>
        </Link>
        <Link to={`/editstudio/${this.props.studio._id}`}>
          <button onClick={e => this.editHandler(e)}>Edit</button>
        </Link>
        <button onClick={() => this.props.deleteStudio(this.props.studio)}>
          Delete
        </button>
      </div>
    );
  }
}
