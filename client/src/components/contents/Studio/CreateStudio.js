import React, { Component } from "react";
import StudioService from "./StudioService";
import "./CreateStudio.css";
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
    return (
      <div className="createStudio">
        <h3>Create your studio:</h3>

        <form className="create-form" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <input
              type="text"
              name="studioname"
              placeholder="Your studio's name..."
              value={this.state.studioname}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>

          <input type="submit" value="create" />
        </form>

        <h1>{this.state.error ? "You need a name!" : ""}</h1>
      </div>
    );
  }
}
