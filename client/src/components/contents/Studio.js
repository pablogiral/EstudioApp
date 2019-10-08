import React, { Component } from 'react'

export default class Studio extends Component {
  render() {
    return (
      <div>
        Soy un estudio <span>{this.props.studio.studioname}</span>
      </div>
    )
  }
}
