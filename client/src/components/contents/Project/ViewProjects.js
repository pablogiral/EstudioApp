import React, { Component } from "react";
import ProjectService from "./ProjectService";
import StudioService from "./../Studio/StudioService";
import Project from "./Project";
import CreateProject from "./CreateProject";
import "./viewProjects.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default class viewProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectsClean: [],
      studio: {},
      showform: false,
    };
    this.service = new ProjectService();
    this.serviceStudio = new StudioService();
  }

  getProject = project => {
    let newArray = [...this.state.projects];
    newArray.push(project);
    this.setState({
      ...this.state,
      projects: newArray,
      projectsClean: newArray
    });
  };

  componentDidMount() {
    this.getStudio();
    // this.updateSearch();
  }

  async getStudio() {
    const studio = await this.serviceStudio.oneStudio(
      this.props.match.params.id
    );
    // console.log(studio);
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

    this.setState({
      ...this.state,
      projects: projectsSearch.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
      )
    });
  }

  deleteProject(projectToDelete) {
    
    let projects = [...this.state.projects];
    let projectToDeleteFromState = projects.filter(
      project => project._id !== projectToDelete._id
    );
    this.setState({
      ...this.state,
      projects: projectToDeleteFromState
    });
    this.service.deleteProject(projectToDelete);
  }

  showForm() {
    
    this.setState({
      ...this.state, showform: !this.state.showform
    })
  }

  render() {
    
    if (!!this.state.studio) {
      if (!!this.state.projects) {
        return (
          <div className="viewProject">
            <SearchBar
              className="search"
              updateSearchFormData={e => this.updateSearch(e)}
            ></SearchBar>
            <button className="button-back" onClick={()=>{this.showForm()}}>Create new project</button>
            <div className="projectView">
              {this.state.projects.map(project => (
                <Project
                  key={project._id}
                  project={project}
                  selected={this.props.selectedStudio}
                  deleteProject={projectToDelete =>
                    this.deleteProject(projectToDelete)
                  }
                  editProject={this.props.editProject}
                ></Project>
              ))}
            </div>
            
             <CreateProject 
             show={this.state.showform}
              getProject={response => this.getProject(response)}
              urlId={this.props.match.params.id}
            ></CreateProject>
             
             

            <div>
              <Link to={"/viewstudios"}><button className="button-back">Back to studios</button></Link>
            </div>
          </div>
        );
      }
    }
  }
}
