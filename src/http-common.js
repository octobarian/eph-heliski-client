import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_SERVERIP+":"+process.env.VUE_APP_SERVERPORT+"/api",
  headers: {
    "Content-type": "application/json"
  }
});
