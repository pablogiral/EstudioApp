import React, { Component } from "react";
import "./Searchbar.css";
export default class SearchBar extends Component {
  render() {
    return (
      <form className="search-form" id="test">
        <input
          type="search"
          name="foodName"
          placeholder="Search here"
          onChange={e => this.props.updateSearchFormData(e)}
        ></input>
      </form>
    );
  }
}
