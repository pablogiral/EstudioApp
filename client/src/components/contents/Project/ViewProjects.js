import React, { Component } from "react";
import ProjectService from "./ProjectService";
import StudioService from "./../Studio/StudioService";
import Project from "./Project";
import CreateProject from "./CreateProject";
import "./viewProjects.css";

export default class viewProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
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
      projects: newArray
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
      projects: studio.projects
      // projects: allProjects
    });
  }

  render() {
    // console.log(this.props.match.params.id)
    if (!!this.state.studio) {
      if (!!this.state.projects) {
        return (
          <React.Fragment>
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
          </React.Fragment>
        );
      }
    }
  }
}
