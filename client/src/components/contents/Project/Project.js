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
        {/* <p>{this.props.project.comments}</p> */}
        {/* <h4>Pending tasks: {this.props.project.tasks.filter(()=>{})}</h4> */}
        {/* <h6>Open tasks: {this.props.project.tasks.length} </h6> */}
        <Link to={`/viewtasks/${this.props.project._id}`}><button>See tasks</button></Link>
        <Link to={`/editproject/${this.props.project._id}`}><button props={this.props.project}>Edit project</button></Link>
      </div>
    )
  }
}
