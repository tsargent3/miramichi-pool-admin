import axios from "axios";
export default axios.create({
	baseURL: "https://api.miramichipool.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
