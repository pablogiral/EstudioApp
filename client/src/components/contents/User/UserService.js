import axios from "axios";

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:3001/api/auth",
      withCredentials: true
    });
  }

  deleteUser = () => {
    return this.service.post('/deleteUser')
    .then(response => response.data);
  }
}

export default UserService;