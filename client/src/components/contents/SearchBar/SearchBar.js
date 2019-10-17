import React, { Component } from "react";
import "./Searchbar.css";
export default class SearchBar extends Component {
  render() {
    return (
      // <form className="search-form" id="test">
      <div className="search-form">
        <input
          type="search"
          name="projectSearch"
          placeholder="Search projects..."
          onChange={e => this.props.updateSearchFormData(e)}
        ></input>
      </div>
      // </form>
    );
  }
}
