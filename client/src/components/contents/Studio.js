import React, { Component } from "react";
// import './Studio.css'
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";

export default class Studio extends Component {
  render() {
    // console.log(this.props.studio.projects.length)
    return (
      <div>
        <Card inverse>
          <CardImg
            width="100%"
            src={this.props.studio.studioimage}
            alt="Card image cap"
          />
          <CardImgOverlay>
            <CardTitle>{this.props.studio.studioname}</CardTitle>
            <CardText>
            Studio description Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            </CardText>
            <CardText>
              <small className="text-muted">Open projects: {this.props.studio.projects.length}</small>
            </CardText>
          </CardImgOverlay>
        </Card>
      </div>

      // <div className="studioCard">
      //   <img src={this.props.studio.studioimage} alt={this.props.studio.studioname}/>
      //   <h2>{this.props.studio.studioname}</h2>
      //   <h6>Open projects: {this.props.studio.projects.length} </h6>
      // </div>
    );
  }
}
