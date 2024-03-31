import axios from "axios";
import CryptoJS from "crypto-js";

// Encrypt the server secret
const encryptedSecret = CryptoJS.AES.encrypt(process.env.VUE_APP_SERVER_SECRET, process.env.VUE_APP_SERVER_ENCRYPTION_KEY).toString();

export default axios.create({
  baseURL: `${process.env.VUE_APP_SERVERIP}:${process.env.VUE_APP_SERVERPORT}/api`,
  headers: {
    "Content-type": "application/json",
    "cust-server-secret": `${encryptedSecret}`
  }
});
