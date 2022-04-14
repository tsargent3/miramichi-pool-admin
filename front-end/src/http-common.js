import axios from "axios";
export default axios.create({
  baseURL: "https://admin.miramichipool.com:4000/api",
  headers: {
    "Content-type": "application/json"
  }
});
