import React, { Component } from "react";
import StudioService from "./StudioService";
import { Link } from "react-router-dom";

export default class EditStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studioname: this.props.studio.studioname,
      error: null,
      success: false,
    };
    this.service = new StudioService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const studioname = this.state.studioname;
    const id = this.props.studio._id;

    this.service
      .editStudio(id, studioname)
      .then(response => {
        this.setState({
          studioname: studioname,
          success: true,
          error: false,
        });
      })
      .catch(error => {
        this.setState({
          error: true,
        });
      });
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h3>Edit project:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Project name:</label>
            <input
              type="text"
              // placeholder={this.state.user.username}
              name="studioname"
              value={this.state.studioname}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input type="submit" value="Save" />
        </form>
        <h2>{this.state.error ? "Something went wrong" : ""}</h2>
        <h2>{this.state.success ? "Success!" : ""}</h2>

        <div>
          <Link to={`/viewprojects/${this.props.selectedStudio}`}>
            Back to projects
          </Link>
        </div>
      </div>
    );
  }
}
