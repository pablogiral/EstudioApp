import axios from "axios";


class PhotoService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/photoRoutes`,
      withCredentials: true
    });
  }

  handleUpload(theFile) {
    
    return this.service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

}

export default PhotoService;