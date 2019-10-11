import React, { Component } from 'react'
import './Project.css'


export default class Project extends Component {
  render() {
    return (
      <div className="projectCard">
        <img src={this.props.project.projectimage} alt={this.props.project.name}/>
        <h2>{this.props.project.name}</h2>
        <h3>{this.props.project.bandname}</h3>
        {/* <h6>Open tasks: {this.props.project.tasks.length} </h6> */}
        <button>See details</button>
      </div>
    )
  }
}
