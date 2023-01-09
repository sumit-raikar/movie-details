import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f00dec5b8c5f8256bdda37836dc98e50",
  },
});

export default instance;
