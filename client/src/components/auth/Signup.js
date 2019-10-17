// auth/Signup.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import "./Login-signup.css";


class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '' };
    this.service = new AuthService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    
    this.service.signup(username, password, email)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            email: "",
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
        this.props.getUser(response.user)
    })
    .catch(error => {
      this.setState({
        username: username,
        password: password,
        email: email,
        error: true
      });
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      

  render() {
    return(
      <div className="login-signup">
        <h3>Create your account:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <fieldset>
            {/* <label className="LSlabel">Username:</label> */}
            <input className="LSinput" placeholder="Username..." type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <fieldset >
            {/* <label className="LSlabel">Email:</label> */}
            <input className="LSinput" placeholder="Email..." type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <fieldset>
            {/* <label className="LSlabel">Password:</label> */}
            <input className="LSinput" placeholder="Password..." type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </fieldset>
          
          <input className="LSbutton" type="submit" value="Sign up" />
        </form>

        <h1>{this.state.error ? 'Error' : ''}</h1>

        <span className="LStext">Allready a  user? <Link className="LStextLink" to="/login">login</Link></span>
      </div>
    )
  }
}

export default Signup;