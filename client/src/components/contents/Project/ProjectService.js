import axios from "axios";

class ProjectService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/projectRoutes",
      withCredentials: true
    });
  }

  create = projectName => {
    return this.service
      .post("/newProject", { projectName })
      .then(response => response.data);
  };

  allProjects = (id) => {
    return this.service.get(`/allProjects/${id}`)
    .then(response => response.data);
  }
}

export default ProjectService;
