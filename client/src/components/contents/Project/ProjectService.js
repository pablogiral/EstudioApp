import axios from "axios";

class ProjectService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/projectRoutes`,
      withCredentials: true
    });
  }

  create = projectName => {
    return this.service
      .post("/newProject", { projectName })
      .then(response => response.data);
  };

  allProjects = id => {
    return this.service
      .get(`/allProjects/${id}`)
      .then(response => response.data);
  };

  editProject = (projectID, projectname, bandname, comments, image) => {
    return this.service.post(`/editProject/${projectID}`, {projectname, bandname, comments, image})
    .then(response => response.data);
  }

  deleteProject = (projectToDelete) => {
    return this.service.post(`/deleteProject/${projectToDelete._id}`)
    .then(response => response.data);
  }
}

export default ProjectService;
