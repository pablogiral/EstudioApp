import React, { Component } from 'react'
import CreateStudio from './CreateStudio';
import Studio from './Studio';
import StudioService from './StudioService';
import './viewStudio.css'

export default class ViewStudios extends Component {
  constructor(props){
    super(props)
    this.state={
      studios: [],
    }
    this.service = new StudioService();
  }

  getStudio = studioObj => {
    let newArray = [...this.state.studios];
    newArray.push(studioObj);
    this.setState({
      ...this.state, studios: newArray
    });
  };

  componentDidMount() {
    this.getAllStudios();
  }

  async getAllStudios () {
    const getStudios = await this.service.allStudios()
    this.setState({...this.state, studios: getStudios.data})
  }

  render() {
    // console.log(this.state.studios)
    if (!this.state.studios.length) {
      return ( 
      <div>
        <CreateStudio getStudio={this.getStudio} />
      </div>
      )
    }
    else {
      return (
        <React.Fragment>
        <div className="studioView">
          {
            this.state.studios.map(studio => <Studio key={studio._id} studio={studio} />)
          }
        </div>
        <CreateStudio></CreateStudio>
        </React.Fragment>
      )
    }
  }
}
