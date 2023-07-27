import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      //baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
      baseURL: process.env.REACT_APP_SERVER_URL || "https://petapp.fly.dev",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    //return this.api.post("/auth/login", requestBody);
    // same as
     return axios.post("https://petapp.fly.dev/auth/login", requestBody);
  };

  signup = (requestBody) => {
    //return this.api.post("/auth/signup", requestBody);
    // same as
    return axios.post("https://petapp.fly.dev/auth/signup", requestBody);
  };

  ownersignup = (requestBody) => {
    //return this.api.post("/auth/ownersignup", requestBody);
    return axios.post("https://petapp.fly.dev/auth/ownersignup", requestBody);
  };

  ownerlogin = (requestBody) => {
    //return this.api.post("/auth/ownerlogin", requestBody);
    return axios.post("https://petapp.fly.dev/auth/ownerlogin", requestBody);
  };

  verify = () => {
    //return this.api.get("/auth/verify");
    // same as
     return axios.get("https://petapp.fly.dev/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
