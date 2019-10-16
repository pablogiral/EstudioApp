import axios from "axios";

class StudioService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/studioroutes`,
      withCredentials: true
    });
  }

  create = studioname => {
    return this.service
      .post("/studiocreate", { studioname })
      .then(response => response.data);
  };

  allStudios = () => {
    return this.service.get('/allStudios')
    .then(response => response.data);
  }

  oneStudio = (studioID) => {
    return this.service.get(`/getStudio/${studioID}`)
    .then(response => response.data);
  }

  deleteStudio = (studioToDelete) => {
    return this.service.post(`/deleteStudio/${studioToDelete._id}`)
    .then(response => response.data);
  }

  editStudio = (id, studioname) => {
    return this.service.post(`/editStudio/${id}`, {studioname})
    .then(response => response.data);
  }
}

export default StudioService;
