import React, { Component } from 'react'
import CreateStudio from './CreateStudio';

export default class ViewStudios extends Component {
  constructor(){
    super()
    this.state={
      studios: [],
    }
  }

  getStudio = studioObj => {
    this.setState({
      studios: [studioObj]
    });
  };

  render() {
    if (this.state.studios) {
      return ( 
      <div>
        <CreateStudio></CreateStudio>
        <p>estudio A</p>
        <p>estudio B</p>
      </div> )
    }
    else {
      return (
        <div>
          <a>else</a>
        </div>
      )
    }
  }
}
