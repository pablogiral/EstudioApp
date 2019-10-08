import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthService from "./components/auth/AuthService";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
// import Calendar from "./components/calendar/Calendar";
import ViewStudios from "./components/contents/ViewStudios";
import ViewCalendar from "./components/calendar/ViewCalendar";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();

    this.fetchUser();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  //este método vuelca la información del usuario y lo guarda en el state de app que siempre puedes revisitar
  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  }

  render() {
    // console.log(this.state)
    //aqui hacemos rendering condicional dependiendo de si tenemos un usuario logeado o no
    if (this.state.loggedInUser) {
      //en este caso mostramos los contenidos ya que hay usuario
      return (
        <React.Fragment>
          <Redirect to="/viewstudios" />
          <div className="App">
            <header className="App-header">
              <Navbar
                userInSession={this.state.loggedInUser}
                logout={this.logout}
              />
              <Switch>
                <Route
                  exact
                  path="/viewcalendar"
                  render={() => <ViewCalendar />}
                />
                <Route
                  exact
                  path="/viewstudios"
                  render={() => <ViewStudios />}
                />
              </Switch>
            </header>
          </div>
        </React.Fragment>
      );
    } else {
      //si no estás logeado, mostrar opcionalmente o login o signup
      return (
        <React.Fragment>
          <Redirect to="/login" />

          <div className="App">
            <header className="App-header">
              <Navbar
                userInSession={this.state.loggedInUser}
                logout={this.logout}
              />
              <Switch>
                <Route
                  exact
                  path="/signup"
                  render={() => <Signup getUser={this.getUser} />}
                />
                <Route
                  exact
                  path="/login"
                  render={() => <Login getUser={this.getUser} />}
                />
                <Route
                  exact
                  path="/viewcalendar"
                  render={() => <ViewCalendar />}
                />
              </Switch>
            </header>
          </div>
        </React.Fragment>
      );
    }
  }
}
