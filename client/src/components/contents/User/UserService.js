import axios from "axios";

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/auth`,
      withCredentials: true
    });
  }

  deleteUser = () => {
    return this.service.post('/deleteUser')
    .then(response => response.data);
  }
}

export default UserService;