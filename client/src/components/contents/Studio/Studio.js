import React, { Component } from "react";
import "./Studio.css";
import { Link } from "react-router-dom";

export default class Studio extends Component {
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
          <button>See projects</button>
        </Link>
        <button onClick={()=>this.props.deleteStudio(this.props.studio)}>Delete</button>
      </div>
    );
  }
}
