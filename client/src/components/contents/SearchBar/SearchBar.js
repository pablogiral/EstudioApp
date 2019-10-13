import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <form className="search-form" id="test">
        {/* {this.state.foodSearch && (
          <h1>
            {this.state.foodSearch}
          </h1>
        )} */}

        <input
          type="search"
          name="foodName"
          placeholder="Search here"
          // value={this.state.foodSearch}
          onChange={e => this.props.updateSearchFormData(e)}
        ></input>
        

        {/* <button onClick={e => this.sendSearchStateFromApp(e)}>Search</button> */}

        
      </form>
      </div>
    )
  }
}
