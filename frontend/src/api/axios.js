import axios from "axios";

//This makes it easier to reuse your API base URL later.

const api = axios.create({
  baseURL: "http://localhost:4321",
})

export default api;