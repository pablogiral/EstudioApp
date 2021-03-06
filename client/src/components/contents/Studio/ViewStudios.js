import React, { Component } from "react";
import CreateStudio from "./CreateStudio";
import Studio from "./Studio";
import StudioService from "./StudioService";
import "./viewStudio.css";

export default class ViewStudios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studios: [],
      showform: false,
    };
    this.service = new StudioService();
  }

  getStudio = studioObj => {
    let newArray = [...this.state.studios];
    newArray.push(studioObj);
    this.setState({
      ...this.state,
      studios: newArray
    });
  };

  componentDidMount() {
    this.getAllStudios();
  }

  getAllStudios() {
    this.service.allStudios().then(allStudios => {
      this.setState({ ...this.state, studios: allStudios });
    });
  }

  deleteStudio(studioToDelete) {
    let studioDeletion = prompt("Type 'delete' to confirm");
    if (studioDeletion === "delete"){

      let studios = [...this.state.studios];
      let studioToDeleteFromState = studios.filter(
        studio => studio._id !== studioToDelete._id
      );
      this.setState({
        ...this.state,
        studios: studioToDeleteFromState
      });
      this.service.deleteStudio(studioToDelete)
    }
    else { return }
  }

  showForm() {
    this.setState({
      ...this.state, showform: !this.state.showform
    })
  }

  render() {
    
    if (!Array.isArray(this.state.studios)) {
      return (
        <div>
          <button className="button-back" onClick={()=>{this.showForm()}}>Create new studio</button>
          <CreateStudio getStudio={this.getStudio} show={this.state.showform}/>
        </div>
      );
    } else {
      return (
        <div className="viewStudio">
          <button className="button-back" onClick={()=>{this.showForm()}}>Create new studio</button>
          <div className="studioView">
            {this.state.studios.map(studio => (
              <Studio
                key={studio._id}
                editStudio={this.props.editStudio}
                selected={this.props.selected}
                studio={studio}
                deleteStudio={studioToDelete =>
                  this.deleteStudio(studioToDelete)
                }
              />
            ))}
          </div>

          <CreateStudio getStudio={this.getStudio} show={this.state.showform}></CreateStudio>
          
        </div>
      );
    }
  }
}
