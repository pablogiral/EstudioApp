import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthService from "./components/auth/AuthService";
import UserService from "./components/contents/User/UserService";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import ViewStudios from "./components/contents/Studio/ViewStudios";
import ViewCalendar from "./components/calendar/ViewCalendar";
import ViewProjects from "./components/contents/Project/ViewProjects";
import ViewTasks from './components/contents/Task/ViewTasks'
import Profile from "./components/contents/User/Profile";
import EditProfile from './components/contents/User/EditProfile';
import EditProject from './components/contents/Project/EditProject'
import EditStudio from "./components/contents/Studio/EditStudio";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null,
      projecttoedit: {},
      selectedStudio: "",
      studiotoedit: {},
    };
    this.service = new AuthService();
    this.serviceUser = new UserService();

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

  deleteUser() {
    let userDeletion = prompt("Type 'delete' to confirm");
    if (userDeletion === "delete"){
      this.serviceUser.deleteUser().then(() => {
      this.setState({ loggedInUser: null });
    });
    }
  }

  fetchUser=()=> {
     this.service
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

  editProject = (project) => {
    this.setState({...this.state, projecttoedit: project})
  }

  editStudio = (studio) => {
    
    this.setState({...this.state, studiotoedit: studio})
  }

  selectedStudio=(id)=>{
    this.setState({...this.state,selectedStudio:id})
  }

  render() {
    
    //aqui hacemos rendering condicional dependiendo de si tenemos un usuario logeado o no
    if (this.state.loggedInUser) {
      //en este caso mostramos los contenidos ya que hay usuario
      return (
        <React.Fragment>
          <Redirect to="/home" />
          <div className="App">
            <header>
              <Navbar
                userInSession={this.state.loggedInUser}
                logout={this.logout}
              />
            </header>

            <Switch>
              <Route
                exact
                path="/viewcalendar"
                render={() => <ViewCalendar />}
              />
              <Route exact path="/viewstudios" render={() => <ViewStudios selected={this.selectedStudio} editStudio={this.editStudio}/>} />
              <Route exact path="/home" render={() => <ViewStudios selected={this.selectedStudio} editStudio={this.editStudio}/>} />
              <Route exact path="/" render={() => <ViewStudios selected={this.selectedStudio} editStudio={this.editStudio}/>} />
              <Route
                exact
                path="/profile"
                render={() => <Profile user={this.state.loggedInUser} deleteUser={() => this.deleteUser()} />}
              />
              <Route exact path="/editprofile" render={() => <EditProfile user={this.state.loggedInUser} fetchUser={this.fetchUser}/>} />
              <Route
                path="/viewprojects/:id"
                render={props => <ViewProjects {...props} editProject={this.editProject}/>}
              />
              <Route
                path="/editproject/:id"
                render={(props) => <EditProject {...props} project={this.state.projecttoedit} selectedStudio={this.state.selectedStudio}/>}
              />
              <Route
                path="/editstudio/:id"
                render={(props) => <EditStudio {...props} studio={this.state.studiotoedit}/>}
              />
              <Route
                path="/viewtasks/:id"
                render={(props) => <ViewTasks {...props} selectedStudio={this.state.selectedStudio}/>}
              />
            </Switch>
          </div>
        </React.Fragment>
      );
    } else {
      //si no estás logeado, mostrar opcionalmente o login o signup
      return (
        <React.Fragment>
          <Redirect to="/login" />

          <div className="App">
            <header className="header">
              <Navbar
                userInSession={this.state.loggedInUser}
                logout={this.logout}
              />
            </header>
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
            </Switch>
          </div>
        </React.Fragment>
      );
    }
  }
}
