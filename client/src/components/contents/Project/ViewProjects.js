import React, { Component } from "react";
import ProjectService from "./ProjectService";
import StudioService from "./../Studio/StudioService";
import Project from "./Project";
import CreateProject from "./CreateProject";
import "./viewProjects.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom"

export default class viewProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectsClean: [],
      studio: {}
    };
    this.service = new ProjectService();
    this.serviceStudio = new StudioService();
  }

  getProject = project => {
    // console.log(project);
    let newArray = [...this.state.projects];
    newArray.push(project);
    this.setState({
      ...this.state,
      projects: newArray,
      projectsClean: newArray
    });
  };

  componentDidMount() {
    // this.getAllProjects();
    this.getStudio();
    // this.getProject()
  }

  // getAllProjects() {
  //   this.service.allProjects(this.props.match.params.id).then(allProjects => {
  //     this.setState({
  //       ...this.state,
  //       projects: allProjects
  //     });
  //   });
  // }

  async getStudio() {
    const studio = await this.serviceStudio.oneStudio(
      this.props.match.params.id
    );
    this.setState({
      ...this.state,
      studio: studio,
      projectsClean: studio.projects,
      projects: studio.projects
      // projects: allProjects
    });
  }

  updateSearch(e) {
    let search = e.target.value;
    let projectsSearch = [...this.state.projectsClean];
    // console.log()
    this.setState({
      ...this.state,
      projects: projectsSearch.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    });
  }

  render() {
    console.log(this.state.projects)
    if (!!this.state.studio) {
      if (!!this.state.projects) {
        return (
          <React.Fragment>
            <SearchBar updateSearchFormData={e => this.updateSearch(e)}></SearchBar>
            <div className="projectView">
              {this.state.projects.map(project => (
                <Project key={project._id} project={project}></Project>
              ))}
            </div>
            <div>
              <CreateProject
                getProject={response => this.getProject(response)}
                urlId={this.props.match.params.id}
              ></CreateProject>
            </div>
            <div>
              <Link to={"/viewstudios"}>Back to studios</Link>
            </div>
          </React.Fragment>
        );
      }
    }
  }
}
