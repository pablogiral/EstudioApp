import React, { Component } from "react";
import StudioService from "./StudioService";

export default class CreateStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studioname: ""
    };
    this.service = new StudioService();
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const studioname = this.state.studioname;
    this.service
      .create(studioname)
      .then(response => {
        this.setState({
          studioname: ""
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
        this.props.getStudio(response);
      })
      .catch(error => {
        this.setState({
          studioname: studioname,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          <h3>Create your studio:</h3>

          <form onSubmit={this.handleFormSubmit}>
            <fieldset>
              <label>Studio name:</label>
              <input
                type="text"
                name="studioname"
                value={this.state.studioname}
                onChange={e => this.handleChange(e)}
              />
            </fieldset>

            <input type="submit" value="create" />
          </form>

          <h1>{this.state.error ? "Error" : ""}</h1>
        </div>
      </div>
    );
  }
}
