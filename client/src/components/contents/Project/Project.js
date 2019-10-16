import React, { Component } from 'react'
import './Project.css'
import { Link } from "react-router-dom"

export default class Project extends Component {
  
  render() {
    
    return (
      <div className="projectCard">
        <img src={this.props.project.projectimage} alt={this.props.project.name}/>
        <h2>{this.props.project.name}</h2>
        <h3>{this.props.project.bandname}</h3>
        <h4>{this.props.project._id}</h4>
        <Link to={`/viewtasks/${this.props.project._id}`}><button>See tasks</button></Link>
        <div className="horizontal-buttons">
        <Link to={`/editproject/${this.props.project._id}`}><button props={this.props.project}>Edit</button></Link>
        <button onClick={()=>this.props.deleteProject(this.props.project)}>Delete</button>
        </div>
      </div>
    )
  }
}
