import React, { Component } from "react";
import './Studio.css'
// import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";

export default class Studio extends Component {
  render() {
    // console.log(this.props.studio.projects.length)
    return (
     
      <div className="studioCard">
        <img src={this.props.studio.studioimage} alt={this.props.studio.studioname}/>
        <h2>{this.props.studio.studioname}</h2>
        <h6>Open projects: {this.props.studio.projects.length} </h6>
        <button>See projects</button>
      </div>
    );
  }
}
